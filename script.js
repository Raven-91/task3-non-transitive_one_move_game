import {CheckInputParameters} from "./classes/check-input-parameters.js";
import {GameProcess} from "./classes/game-process.js";

const parameters = (process.argv.slice(2)).map(item => {
    if (typeof item === 'string') {
        let firstChar = item.charAt(0);
        let upperFirstChar = firstChar.toUpperCase();
        let restOfString = item.slice(1);
        return upperFirstChar + restOfString;
    } else {
        throw Error("Error: Unknown type of parameter. " +
            "Solution: You must indicate the parameter type as a number or string.");
    }
})

if (parameters && parameters.length > 0) {
    CheckInputParameters.checkParameters(parameters);
    GameProcess.startGame(parameters);
} else {
    throw Error("Game parameters not specified. Solution: You should indicate parameters for the game");
}