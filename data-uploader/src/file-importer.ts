import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { resolvePlugin } from "@babel/core";

export class FileImporter {
    public importCsvFileAsJson(fileName: string): string {
        const csvPath = path.resolve(__dirname, fileName);
        const headers = ['a', 'b', 'c']
        const csvContent = fs.readFileSync(csvPath, { encoding: 'utf-8'});

        var parsedCsv = parse(csvContent, {
            delimiter: ',',
            columns: headers
        }, (error, result: []) => {
            if (error) {
                console.log(error);
            }
            console.log(result);
            return result;
        });

        console.log(parsedCsv);

        return "";
    }
}