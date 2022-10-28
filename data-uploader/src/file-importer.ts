import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';
import { resolvePlugin } from "@babel/core";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { dynamoClient, readFromDynamoDb, writeCsvToDynamoDb } from "./dynamo-client";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

const params : PutItemCommandInput = {
    TableName: '',
    Item: {
        'id': {S: '1'},
        'title': {S: '1'},
        'description': {S: '1'},
        'dueDay': {N: '1'},
        'owner': {S: '1'},
        'team': {S: '1'},
        // 'isAutomated': {B: },
        // 'resources': {SS: {S: '1'}},
        'parentId': {S: '1'},
    }
}

const command = new PutItemCommand(params);

export class FileImporter {
    public importCsvFileAsJson(fileName: string): Item[] {
        const csvPath = path.resolve(__dirname, fileName);
        const headers = ['id', 'title', 'description', 'dueDay', 'owner', 'team', 'isAutomated', 'resources', 'parentId'];
        let csvContent :string = "";
        try {
            csvContent = fs.readFileSync(csvPath, { encoding: 'utf-8'});
        } catch (error) {
            console.error(error);
            return [];
        }

        var parsedCsv: Item[] = parse(csvContent, {
            delimiter: ',',
            bom: true,
            columns: true,
            skip_empty_lines: true
        });

        console.log(parsedCsv);
        return parsedCsv;
    }

    public getItemFromDynamoDbByTeam(teamName: string) {
        const thing = readFromDynamoDb(teamName);
    }

    public async putProvidedItemInDynamoDb(command: PutItemCommand) {
        await writeCsvToDynamoDb(command);
    }
}

interface Item {
    id: string;
    title: string;
    description: string;
    dueDay: number;
    owner: string;
    team: string;
    isAutomated: boolean;
    resources: string;
    parentId: string;
}