import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import { resolvePlugin } from "@babel/core";
import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "./dynamoClient";

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
    public importCsvFileAsJson(fileName: string): string {
        const csvPath = path.resolve(__dirname, fileName);
        const headers = ['id', 'title', 'description', 'dueDay', 'owner', 'team', 'isAutomated', 'resources', 'parentId'];
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

    public writeCsvToDynamoDb(fileName: string): string {
        dynamoClient
        return "";
    }
}