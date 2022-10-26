import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { readFromDynamoDb, writeCsvToDynamoDb } from "../src/dynamo-client"

const mockedDb = mockClient(DynamoDBDocumentClient);

// https://aws.amazon.com/blogs/developer/mocking-modular-aws-sdk-for-javascript-v3-in-unit-tests/
describe('Dynamo tests', () => {
    beforeEach(() => {
        mockedDb.reset();
    });

    test('Check that the dynamo helper responds with an item', async () => {
        mockedDb.on(GetCommand, {
            TableName: 'TestTable',
            Key: { Id: 'TestValue' }
        }).resolves({
            Item: { 
                Id: 'TestValue',
                Title: 'Baker',
                Description: 'Makes yummy biscuits',
                DueDay: 1,
                Owner: 'Me',
                Team: 'Bakers',
                IsAutomated: false,
                Resources: 'Flour, sugar, butter',
                ParentId: ''
            }
        });
        const thing = await readFromDynamoDb('TestValue') // This is the code that I have writen
        expect(thing).toStrictEqual({"Description": "Makes yummy biscuits", "DueDay": 1, "Id": "TestValue", "IsAutomated": false, "Owner": "Me", "ParentId": "", "Resources": "Flour, sugar, butter", "Team": "Bakers", "Title": "Baker"});
    });

    test('Check that if item is unavailable that the helper returns empty', async () => {
        mockedDb.on(GetCommand, {
            TableName: 'TestTable',
            Key: { Id: 'TestValue' }
        }).resolves({
            Item: { 
                Id: 'TestValue',
                Title: 'Baker',
                Description: 'Makes yummy biscuits',
                DueDay: 1,
                Owner: 'Me',
                Team: 'Bakers',
                IsAutomated: false,
                Resources: 'Flour, sugar, butter',
                ParentId: ''
            }
        });

        const thing = await readFromDynamoDb('NotTheExpectedKey');
        expect(thing).toStrictEqual({});
    });
});

// https://blog.chriscatt.com/jest-mocking-with-aws-sdk-v3
// https://codewithhugo.com/jest-specific-argument-parameter-assert/
// Yeah, this didn't work, I don't know why - I want to make code progress and don't want to be hing up on this
describe('DynamoDB put tests', () => {
    beforeEach(() => {
        mockedDb.reset();
    });

    test('Check that an item is put correctly', async () => {
        const command = new PutItemCommand({
            TableName: 'TestTable',
            Item: {
                Id: { S: 'PutTest'},
                Title: { S: 'Party Rings'},
                Description: { S: 'Get ready to party with these biscuits' },
                DueDay: { N: "1" },
                Owner: { S: 'Myself' },
                Team: { S: 'Party Pillar' },
                IsAutomated: { BOOL: false },
                Resources: { S: 'Disco ball, music, biscuits' },
                ParentId: { S: '' }
            },
        });

        await writeCsvToDynamoDb(command);

        expect(mockedDb.send).toHaveBeenCalledWith(command);
    })
})

