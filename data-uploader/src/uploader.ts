#!/usr/bin/env node

import * as readline from 'readline';
import { FileImporter } from './file-importer';
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

let fileNameReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

fileNameReader.question('Enter the filename', (fileName) => {
    let fileImporter = new FileImporter();
    let parsedCsv = fileImporter.importCsvFileAsJson(fileName);

    console.log('-----');
    console.log(parsedCsv[0]);
    
    parsedCsv.forEach(item => {
        console.log(item);
        item.id

        var command: PutItemCommand = new PutItemCommand({
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
        });

        fileImporter.doOtherThing(command);
    });
    console.log('-----');
});


