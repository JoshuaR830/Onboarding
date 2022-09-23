import { describe, expect, test } from '@jest/globals';
import { FileImporter } from '../src/file-importer';
import { ExportToCsv } from 'export-to-csv';
import * as fs from "fs";

const fileImporter = new FileImporter();
const csvExporter = new ExportToCsv({fieldSeparator: ',', useKeysAsHeaders: true});
const dir = `${__dirname}/test`;

const csvData = [
    {
        description: "Find the biscuit rota in the kitchen and sign up",
        dueDay: "1",
        id: "58e43f87-6fec-46a3-b901-98119d020e07",
        isAutomated: "false",
        owner: "McVities",
        parentId: "00000000-0000-0000-0000-0000000000000",
        resources: "null",
        team: "biscuit_procurement",
        title: "Biscuit Rota"
    },
    {
        description: "Order the finest selection of biscuits",
        dueDay: "2",
        id: "8f312256-6665-47d0-8217-5c74fb82e44a",
        isAutomated: "false",
        owner: "McVities",
        parentId: "58e43f87-6fec-46a3-b901-98119d020e07",
        resources: "null",
        team: "biscuit_procurement",
        title: "Buy Biscuits"
    },
    {
        description: "Ensure that one biscuit of each type are safe for consumption",
        id: "052add79-fca7-494c-966f-a47160e354f3",
        dueDay: "3",
        owner: "cookie_monster",
        isAutomated: "false",
        resources: "null",
        parentId: "00000000-0000-0000-0000-0000000000000",
        team: "biscuit_tester",
        title: "Test Biscuits"
    },
    {
        description: "Ensure that all the biscuits are of the same quality by eating them all",
        dueDay: "3",
        id: "0080bef0-a1c7-4da6-8fc9-4e7787d4132a",
        isAutomated: "false",
        owner: "cookie_monster",
        parentId: "052add79-fca7-494c-966f-a47160e354f3",
        resources: "null",
        team: "biscuit_tester",
        title: "Eat All Biscuits"
    },
    {
        description: "Now that all biscuits have been consumed ensure that the evidence is hidden",
        dueDay: "3",
        isAutomated: "false",
        id: "abb84ab6-db80-4145-bf3e-e80ceab6c5aa",
        owner: "cookie_police",
        parentId: "00000000-0000-0000-0000-0000000000000",
        resources: "null",
        team: "biscuit_tender",
        title: "Clear All Evidence"
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
        let fileName = "/example-data.csv";
        const csvFileContent = csvExporter.generateCsv(csvData, true);
        fs.writeFileSync(fileName, csvFileContent);
        var json = fileImporter.importCsvFileAsJson(fileName);
        expect(json).toStrictEqual(csvData)
    });

    test('When named file does not exist', () => {
        var nonExistentFileName = "/test/notexists.csv";
        var json = fileImporter.importCsvFileAsJson(nonExistentFileName);
        expect(json).toBe("");
    })
}) 
