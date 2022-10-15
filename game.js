/*
 ********************ROCK PAPER SCISSORS*********************
 ************************************************************
 *****************Developped by Elisa Amaral*****************
 ************************************************************
 **************https://github.com/elisa-amaral***************
 ************************************************************
 */

function computerPlay()
{   
    const options = ["rock", "paper", "scissors"];
    const computerSelection = options[Math.floor(Math.random() * 3)];
    
    /* 
    // testing the tied score case, computer always selects 
    "rock" and player input must always be "rock"
    const computerSelection = "rock" 
    */

    return computerSelection;
}

function playerPlay(roundName)
{   
    let playerSelection = (prompt(`Type in your selection of ROUND ${roundName}`));
    playerSelection = playerSelection.toLowerCase();
    return playerSelection;
}

function validatePlayerSelection(playerSelection, roundName)
{
    let validationResults = []; // empty array
    validationResults['inputIsInvalid'] = false;
    
    // player doesn't type in anything
    if (playerSelection.length == 0)
    {
        validationResults['inputIsInvalid'] = true;
        validationResults['errorMessage'] = `Your answer didn't contain your selection of ROUND ${roundName}. Please try again.`;
    }
    else if (!playerSelection.match("^[a-zA-Z ]+$"))
    {
        // player inputs special characters, spaces or digits in the selection answer 
        validationResults['inputIsInvalid'] = true;
        validationResults['errorMessage'] = `You typed in one or more numbers, special characters or symbols in your selection answer of ROUND ${roundName}. That is not allowed. Here is what you typed in: "${playerSelection}". Please try again.`;
    }
    else if (playerSelection.split(" ").length == 1)
    {
        if (playerSelection != "rock"
            && 
            playerSelection != "paper"
            &&
            playerSelection != "scissors") {

            validationResults['inputIsInvalid'] = true
            validationResults['errorMessage'] =  `Your input must contain the exact word indicating your selection for ROUND ${roundName}. Either "ROCK" or "PAPER" or "SCISSORS". Here's what you typed in: "${playerSelection}". Please try again.`;
        }
    }
    else if (playerSelection.split(" ").length > 1)  // input has more than one word
    {        
        // does it have more than one selection option?
        const optionRock = ["rock"];
        const optionPaper = ["paper"];
        const optionScissors = ["scissors"];
        const hasOptionRock = optionRock.some(option => playerSelection.includes(option));
        const hasOptionPaper = optionPaper.some(option => playerSelection.includes(option));
        const hasOptionScissors = optionScissors.some(option => playerSelection.includes(option));
        
        // input has two or three of the options at whichever order
        if((hasOptionRock && hasOptionPaper) 
           || 
           (hasOptionRock && hasOptionScissors)
           ||
           (hasOptionPaper && hasOptionScissors)
           ||
           (hasOptionRock && hasOptionPaper && hasOptionScissors)) {
            
            validationResults['inputIsInvalid'] = true;
            validationResults['errorMessage'] = `You typed in more than one of the possible selection options for ROUND ${roundName}. Your answer must contain only ONE selection: "ROCK" or "PAPER" or "SCISSORS" Here's what you typed in: "${playerSelection}". Please try again.`;
        } 
        else if (hasOptionRock || hasOptionPaper || hasOptionScissors)
        {
            // input has multiple words and has one of the three options
            validationResults['inputIsInvalid'] = true;
            validationResults['errorMessage'] =  `You must type in only ONE word indicating your selection for ROUND ${roundName}: either "ROCK" or "PAPER" or "SCISSORS". Here's what you typed in: "${playerSelection}". Please try again.`;
        }
        else 
        {
            // input has multiple words and none of the three possible options 
            validationResults['inputIsInvalid'] = true;
            validationResults['errorMessage'] =  `Your input doesn't have any of the three selection options for ROUND ${roundName}. You must type in ONE word indicating your selection: "ROCK" or "PAPER" or "SCISSORS". Here's what you typed in: "${playerSelection}". Please try again.`;
        }
    }

    return validationResults
}

// this function depends on validatePlayerSelection(), there must be no input errors
function playRound(playerSelection, computerSelection) 
{
    let roundResults = []; // empty array
    roundResults['playerWon'] = false;
    roundResults['scoreIsTied'] = false;

    if (playerSelection != computerSelection)
    {
        if (playerSelection == "rock")
        {
            if (computerSelection == "scissors")
            {
                roundResults['playerWon'] = true;
            }
            /*
            'else' is implicit:
             computerSelection == "paper" that beats "rock"
             roundResults['playerWon'] continues to be false
            */
        }
        else if (playerSelection == "paper")
        {
            if (computerSelection == "rock")
            {
                roundResults['playerWon'] = true;
            }
            /*
            'else' is implicit:
             computerSelection == "scissors" that beats "paper"
             roundResults['playerWon'] continues to be false
            */
        }
        else if (playerSelection == "scissors")
        {
            if (computerSelection == "paper")
            {
                roundResults['playerWon'] = true;
            }

            /*
            'else' is implicit:
             computerSelection == "rock" that beats "scissors"
             roundResults['playerWon'] continues to be false
            */
        }
    }
    else 
    {
        roundResults['scoreIsTied'] = true;
    }
    
    return roundResults;
}


/* 
this function calls playRound() and returns its result to game(), plus it gives 
visual feedback to the player in the Console showing the results from playRound() */
function setRoundResults(playerSelection, computerSelection, roundName)
{
    const roundResults = playRound(playerSelection, computerSelection)

    console.log(`|| ROUND ${roundName} ||`)
    console.log(`YOU chose: ${playerSelection.toUpperCase()}`)
    console.log(`COMPUTER chose: ${computerSelection.toUpperCase()}`)

    if (!roundResults['scoreIsTied'])
    {   
        // player won round
        if (roundResults['playerWon']) 
        {
            console.log(`You WON this round! ${playerSelection.toLocaleUpperCase()} beats ${computerSelection.toLocaleUpperCase()}.`);
            console.log('You get +1 point.');
        }
        else // computer won round 
        {
            console.log(`You LOST this round. ${computerSelection.toLocaleUpperCase()} beats ${playerSelection.toLocaleUpperCase()}.`);
            console.log('Computer gets +1 point');
        }
    }
    else // score is tied in this round
    {
        console.log(`This round is TIED. Both selections were ${playerSelection.toUpperCase()}.`);
    }

    return roundResults;
}

/* 
this function is called if all the round result in a tied score, it is a recursive function 
that calls itself infinitely in the unique possibility of counteless sequential tied scores,
when there is a winner, this function shows the result int the Console and runs wannaPlayAgain() */
function winnerTakesAll(roundIteraction)
{
    let roundName = `WINNER-TAKES-ALL #${roundIteraction}`;
    let playerSelection;
    let computerSelection;
    let milliseconds = 0;
    
    // line division to separate this and previous round in console
    console.log ("===================================================");

    computerSelection = computerPlay()
    setTimeout( () => {
        
        milliseconds++;
        
        while (true)
        {   
            playerSelection = playerPlay(roundName);
            validationResults = validatePlayerSelection(playerSelection, roundName);

            if (validationResults['inputIsInvalid'])
            {
                alert(validationResults['errorMessage']);
            }
            else 
            {
                break;
            }
        }
    }, milliseconds);

    
    setTimeout( () => {

        const roundResults = setRoundResults(playerSelection, computerSelection, roundName);

        if (roundResults['scoreIsTied'])
        {
            alert(`Can you BELIEVE it? The score is TIED again! Let's run another WINNER-TAKES-ALL ROUND`);
            roundIteraction++;
            winnerTakesAll(roundIteraction);
        }
        else
        {
            if(roundResults['playerWon'])
            {
                // division line
                console.log("===================================================");

                console.log(`You TOOK THEM ALL!`);
                console.log(`${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}!`);
                console.log(`Congratulations!`);
                
                wannaPlayAgain();
                
            }
            else 
            {
                // division line
                console.log("===================================================");

                console.log(`Oh oh, the computer TOOK THEM ALL.`);
                console.log(`${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}.`);
                console.log(`Better luck NEXT TIME!`);

                wannaPlayAgain();
            }
        }
    }, milliseconds)
}

/*  
this function runs 5 rounds and displays the final results, it calls winnerTakesAll()
if needed and it calls wannaPlayAgain() if there is a winner without a tied score  */
function game()
{    
    /* 
    declaring variables in function scope otherwise they would only be accessible in each setTimeout scope, using let because variables values will change in every iteraction 
    */
    let computerSelection;
    let playerSelection; 
    let computerScore = 0;
    let playerScore = 0;
    let milliseconds = 0;

    alert(`Welcome to the ROCK PAPER SCISSORS game! You'll be playing against the computer. Use this pop-up window to type in your selection in each round. Any necessary instructions will be display in this pop-up window! 
    
    Remember to always click on OK to continue.`);

    alert(`The results of each round will be displayed in the browser Console in real time! So, before anything else, open the browser Console: press Ctrl + Shift + I (Windows/Linux) or Option + Command + I (MacOS) and click on the Console tab.`);

    alert(`Great! Let's START the game.
          Good Luck!`);
    
    for (let i = 0; i < 5; i++)
    {  
        setTimeout( () => {
            
            milliseconds++;

            computerSelection = computerPlay();
            while (true)
            {   
                playerSelection = playerPlay(i + 1);
                const validationResults = validatePlayerSelection(playerSelection, i + 1);

                if (validationResults['inputIsInvalid'])
                {
                    alert(validationResults['errorMessage']);
                }
                else 
                {
                    break;
                }
            }
        }, milliseconds);
       
        setTimeout( () => {
            
            milliseconds++;

            const roundResults = setRoundResults(playerSelection, computerSelection, i + 1);

            if (!roundResults['scoreIsTied'])
            {
                if(roundResults['playerWon']) 
                {
                    playerScore++;
                }
                else 
                {
                    computerScore++;
                }
            }

            console.log(`Score: YOU |${playerScore}| x |${computerScore}| COMPUTER`);
            console.log("===================================================");

        }, milliseconds);

    } // end of for loop

    setTimeout( () => {

        milliseconds++;

        if (playerScore > computerScore) // player won
            {
                console.log(`Score: YOU |${playerScore}| x |${computerScore}| COMPUTER`);
                console.log('You WON the game! Congratulations!');
                wannaPlayAgain();
            }
            else if (playerScore < computerScore) // player lost
            {
                console.log(`Final Score: YOU |${playerScore}| x |${computerScore}| COMPUTER`);
                console.log('Oh oh, you lost the game. Better luck NEXT TIME!');
                wannaPlayAgain();
            }
            else // game is tied, run winnerTakesAll until there's a winner
            {
                console.log('The game is TIED!');
                console.log(`Final Score: YOU |${playerScore}| x |${computerScore}| COMPUTER`);
                
                alert(`Welcome to the WINNER-TAKES-ALL ROUND. Now you get ONE chance against the computer and the winner takes ALL the rounds and WINS THE GAME. If the score is tied again, no worries, there will be infinite WINNER-TAKES-ALL rounds UNTIL THERE IS A WINNER! 
                Good luck!`);

                setTimeout( () => {
                    
                    milliseconds++;
                    
                    const firstRound = 1; // starts at one, increments in function itself if needed
                    winnerTakesAll(firstRound);
                }, milliseconds);
            }
    }, milliseconds);
} // end of game function


function restartGame(playerAnswer)
{
    let validationResults = [] // empty array
    validationResults['inputIsInvalid'] = false;
    validationResults['mustRestartGame'] = false;

    playerAnswer = playerAnswer.toUpperCase();
    if(playerAnswer == "YES")
    {
        validationResults['mustRestartGame'] = true;
    }
    else if (playerAnswer != "NO")
    {
        // player typed in something different from "YES" or "NO"
        validationResults['inputIsInvalid'] = true;
        validationResults['errorMessage'] = `You didn't type in "YES" or "NO". Please try again.
        Do you wanna play again? Type in "YES" or "NO".`;
    }
    
    return validationResults;
}

function wannaPlayAgain()
{
    let mustPlayAgain = false;

    // division line
    console.log("===================================================");
    
    while (true)
    {   
        const restartResults = restartGame(prompt(`Do you wanna play again? (Type in YES or NO)`))
        if (restartResults['inputIsInvalid'])
        {
            alert(restartResults['errorMessage']);
        }
        else 
        {
            if (restartResults['mustRestartGame'])
            {
                mustPlayAgain = true;
            }
            
            break;
        }
    }

    if (mustPlayAgain)
    {
        alert(`Let's play again! Click on OK to start.`);
        console.clear();
        game(); // restarts 
    }
    else 
    {
        console.log("===================================================");
        console.log("GAME OVER");
        console.log("===================================================");
        console.log("===================================================");
        console.log(`Built with love by Elisa Amaral`);
        console.log("===================================================");
        console.log("===================================================");
        alert(`Bye! :D`);
        // bye :P 
    }
}

game(); // call that starts the domino effect
