export class CheckInputParameters {

    static checkParameters(parameters) {
        if (parameters.length < 3) {
            throw Error("Inappropriate number of parameters. " +
                "Solution: The number of parameters for the game must be greater than or equal to 3");
        }

        if (parameters.length % 2 === 0) {
            throw Error("Inappropriate number of parameters. " +
                "Solution: The number of parameters for the game must be an odd number.");
        }

        const sameElementsInParameters = this.checkOnSameElementsInParameters(parameters);
        if (sameElementsInParameters
            && sameElementsInParameters.result
            && sameElementsInParameters.duplicates
            && sameElementsInParameters.duplicates.length > 0) {
            let sameElements = '';
            sameElementsInParameters.duplicates.forEach((item, index) => {
                if (index === (sameElementsInParameters.duplicates.length - 1)) {
                    sameElements += ` ${item}`;
                } else {
                    sameElements += `${item}, `;
                }
            });
            throw Error(`Some parameters have the same value: ${sameElements}. 
            Solution: Each game parameter must be unique and not repeated`);
        }
    }

    static checkOnSameElementsInParameters(parameters) {
        const duplicates = parameters.filter((item, index, arr) => {
            return arr.indexOf(item) !== index;
        });
        if (duplicates && duplicates.length > 0) {
            return {
                result: true,
                duplicates: duplicates
            };
        } else {
            return false;
        }
    }
}