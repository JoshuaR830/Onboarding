#!/usr/bin/env node

import * as readline from 'readline';
import { FileImporter } from './file-importer';
import { PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { queryDynamoDb } from './dynamo-client';
import { QueryCommandOutput } from '@aws-sdk/lib-dynamodb';


let fileNameReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fileNameReader.question('Enter the filename >>> ', async (fileName) => {
    let fileImporter = new FileImporter();
    let parsedCsv = fileImporter.importCsvFileAsJson(fileName);

    parsedCsv.forEach(async item => {
        await fileImporter.putProvidedItemInDynamoDb(new PutItemCommand({
            TableName: "OnboardingTest",
            Item: {
                Id: { S: item.id },
                Title: { S: item.title },
                Description: { S: item.description },
                DueDay: { N: item.dueDay.toString() },
                Owner: { S: item.owner },
                Team: { S: item.team },
                IsAutomated: { BOOL: item.isAutomated },
                Resources: { S: item.resources },
                ParentId: { S: item.parentId }
            }
        }));
    });

    fileNameReader.close();

    var team: string = "biscuit_procurement";

    var query = new QueryCommand({
        TableName: 'OnboardingTest',
        IndexName: 'Team-index',
        Select: 'SPECIFIC_ATTRIBUTES',
        ProjectionExpression: 'Id,Title,Description,DueDay,Team,IsAutomated,Resources,ParentId',
        KeyConditionExpression: '#team = :team',
        ExpressionAttributeValues: {':team': {'S': team}},
        ExpressionAttributeNames: { '#team': 'Team'}
    });

    console.log(JSON.stringify(query));

    var thing: QueryCommandOutput = await queryDynamoDb(query);
    if(thing.Items != null && thing.Items.length != 0) {
        console.log(thing.Items);
    }
});
