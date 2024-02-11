import {Calculation} from "./calculation.js";
import {Hmac} from "./hmac.js";
import {Table} from "./table.js";
import * as readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export class GameProcess {

    static startGame(parameters) {
        const computerMove = parameters[Calculation.randomGenerator(0, parameters.length)];
        if (computerMove) {
            const secretKey = Hmac.generateSecretKey();
            if (secretKey) {
                console.log(`HMAC: ${Hmac.createHmac(computerMove, secretKey)}`);
                this.showGameMenu(parameters, computerMove, secretKey);
            } else {
                throw Error("Error generating key.");
            }
        } else {
            throw Error("Error in game parameters.");
        }
    }

    static showGameMenu(parameters, computerMove, secretKey) {
        const gameMovesForPlayer = parameters.map((item, index) => {
            return `${index + 1} - ${item}`;
        });
        if (gameMovesForPlayer && gameMovesForPlayer.length > 0) {
            gameMovesForPlayer.push("0 - exit", "? - help");

            console.log('Available moves:');
            gameMovesForPlayer.forEach((item => console.log(item)));

            rl.question("Enter your move: ",
                (userMove) => {
                    let playerChoiceMove = userMove;
                    if (playerChoiceMove) {

                        if (+playerChoiceMove > 0 && +playerChoiceMove <= parameters.length) {
                            const playerMoveIndex = +playerChoiceMove - 1;
                            const playerMove = parameters[playerMoveIndex];
                            console.log("Your move: " + playerMove);
                            console.log("Computer move: " + computerMove);
                            const dataForCalculation = Calculation.getDataCalculation(parameters);
                            const computerMoveIndex = parameters.findIndex(item => item === computerMove);
                            const result = Calculation.calculate(dataForCalculation, computerMoveIndex, playerMoveIndex);
                            const resultMessage = Calculation.determineGameResult(result);
                            console.log(resultMessage.message);
                            console.log(`HMAC key: ${secretKey}`);
                            setTimeout(() => {
                                console.log("New game round");
                                this.startGame(parameters);
                            }, 1000)
                        } else if (playerChoiceMove === '0') {
                            let target = 'exit';
                            this.leaveGamePoint(target, parameters, computerMove);
                        } else if (playerChoiceMove === '?') {
                            Table.showTable(Table.createTable(parameters));
                            let target = 'return';
                            this.leaveGamePoint(target, parameters, computerMove);
                        } else {
                            console.log("The number entered is incorrect. " +
                                "The number must be within the range specified in the menu.");
                            this.showGameMenu(parameters, computerMove);
                        }
                    } else {
                        throw Error("No data on the Player's turn.");
                    }
                });
        } else {
            throw Error("Error creating menu");
        }
    }

    static leaveGamePoint(target, parameters, computerMove) {
        let actions;
        switch (target) {
            case "exit":
                actions = {
                    question: "Do you want to exit? Please print y or n. Your answer: ",
                    actionOnYes: {
                        message: "Ok, bye. See next time.",
                        action: function () {
                            process.exit()
                        }
                    },
                    actionOnNo: {
                        action: function (parameters, computerMove) {
                            GameProcess.showGameMenu(parameters, computerMove);
                        }
                    },
                    actionOnUnknownValue: {
                        message: "Unknown value. Please try it again.",
                        action: function (parameters, computerMove) {
                            GameProcess.showGameMenu(parameters, computerMove);
                        }
                    }
                };
                break;
            case "return":
                actions = {
                    question: "Do you want to return in menu? Please print y or n. Your answer: ",
                    actionOnYes: {
                        action: function (parameters, computerMove) {
                            GameProcess.showGameMenu(parameters, computerMove);
                        }
                    },
                    actionOnNo: {
                        action: function (target, parameters, computerMove) {
                            GameProcess.leaveGamePoint(target, parameters, computerMove)
                        }
                    },
                    actionOnUnknownValue: {
                        message: "Unknown value. Please try it again.",
                        action: function (parameters, computerMove) {
                            GameProcess.showGameMenu(parameters, computerMove);
                        }
                    }
                };
                break;
            default:
                break;
        }

        rl.question(actions.question, (answer) => {
            if (answer === 'y') {
                ((actions.actionOnYes).message) ? console.log((actions.actionOnYes).message) : false;
                if (target === "exit") {
                    (actions.actionOnYes)?.action();
                } else {
                    (actions.actionOnYes)?.action(parameters, computerMove);
                }
            } else if (answer === 'n') {
                ((actions.actionOnNo).message) ? console.log(((actions.actionOnNo).message)) : false;
                if (target === "return") {
                    (actions.actionOnNo)?.action(target, parameters, computerMove);
                } else {
                    (actions.actionOnNo)?.action(parameters, computerMove);
                }
            } else {
                ((actions.actionOnUnknownValue).message) ? console.log(((actions.actionOnUnknownValue).message)) : false;
                (actions.actionOnUnknownValue)?.action(parameters, computerMove);
            }
        });
    }
}