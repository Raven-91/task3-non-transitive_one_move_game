export class Calculation {

    constructor() {
    }

    static getDataCalculation(parameters) {
        if (!parameters && parameters.length < 1) {
            throw Error("Invalid parameters for calculating");
        }
        const moves = parameters.length;
        const x = Math.floor(moves / 2);
        return {
            moves: moves,
            x: x,
        }
    }

    static calculate(dataForCalculation, computerMove, userMove) {
        return Math.sign((computerMove - userMove + dataForCalculation.x + dataForCalculation.moves)
            % dataForCalculation.moves - dataForCalculation.x);
    }

    static randomGenerator(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static determineGameResult(number) {
        if (!number && number !== 0) {
            throw Error("Invalid parameters for determining game result");
        }
        let result = '';
        let message = '';
        switch (number) {
            case 1:
                result = 'Win';
                message = 'Congratulations! You win!';
                break;
            case 0:
                result = 'Draw';
                message = 'It is draw.';
                break;
            case -1:
                result = 'Lose';
                message = 'Unfortunately. You lost. Try it again.';
                break;
            default:
                break;
        }
        return {result: result, message: message}
    }
}