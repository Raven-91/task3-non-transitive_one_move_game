import {AlignmentEnum, AsciiTable3} from "ascii-table3";
import {Calculation} from "./calculation.js";

export class Table {

    constructor() {
    }

    static createTable(parameters) {
        if (!parameters || parameters.length < 1) {
            throw Error ("Invalid parameters for create table");
        }
        let headings = ['v PC/User'];
        let rows = [];
        for (let i = 0; i < parameters.length; i++) {
            let row = [];
            headings.push(parameters[i]);
            row.push(parameters[i]);
            let dataForCalculation = Calculation.getDataCalculation(parameters, [i]);
            let computerMoveNumber = [i];
            for (let j = 0; j < parameters.length; j++) {
                let calculatedResult = Calculation.calculate(dataForCalculation, computerMoveNumber, [j]);
                let result = Calculation.determineGameResult(calculatedResult);
                row.push(result.result);
            }
            rows.push(row);
        }
        return {headings: headings, rows: rows};
    }

    static showTable(tableData) {
        if (!tableData) {
            throw Error ("Invalid parameters for show table");
        }
        let dataForAligns = [];
        for (let i = 0; i < (tableData.rows.length + 1); i++) {
            dataForAligns.push(AlignmentEnum.CENTER);
        }
        const table = new AsciiTable3('Game rules')
            .addRowMatrix([
                tableData.headings
            ])
            .addRowMatrix(tableData.rows)
            .setAligns(dataForAligns)
            .setJustify();
        console.log(table.toString());
    }
}