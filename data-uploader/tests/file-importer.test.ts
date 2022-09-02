import { describe, expect, test } from '@jest/globals';
import { FileImporter } from '../src/file-importer';
import { ExportToCsv } from 'export-to-csv';
import * as fs from "fs";

const fileImporter = new FileImporter();
const csvExporter = new ExportToCsv({fieldSeparator: ',', useKeysAsHeaders: true});
const dir = `${__dirname}/test`;

const csvData = [
    {
        a: "A",
        b: "B",
        c: "c"
    }
]

describe('File module', () => {
    beforeEach(() => {
        fs.mkdirSync(dir);
    });

    afterEach(() => {
        fs.rmSync(dir, { recursive: true, force: true });
    });

    test('Import named csv file', () => {
        let fileName = "/test/test.csv";
        const csvFileContent = csvExporter.generateCsv(csvData, true);
        fs.writeFileSync(fileName, csvFileContent);
        var json = fileImporter.importCsvFileAsJson(fileName);
        expect(json).toBe("{}")
    });

    test('When named file does not exist', () => {
        var nonExistentFileName = "/test/notexists.csv";
        var json = fileImporter.importCsvFileAsJson(nonExistentFileName)
        expect(json).toBe("");
    })
}) 
