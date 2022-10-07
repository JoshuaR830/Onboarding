import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";
import { readFromDynamoDb } from "../src/dynamo-client"

const mockedDb = mockClient(DynamoDBDocumentClient)

// https://aws.amazon.com/blogs/developer/mocking-modular-aws-sdk-for-javascript-v3-in-unit-tests/
describe('Dynamo tests', () => {
    beforeEach(() => {
        mockedDb.reset();
    });

    mockedDb.on(GetCommand, {
        TableName: 'Thing',
        Key: { Name: 'Thing' }
    }).resolves({
        Item: { Name: "Thing" }
    });

    test('Check that dynamo actually gets the value', async () => {
        const thing = await readFromDynamoDb('Thing') // This is the code that I have writen
        expect(thing).toStrictEqual(["Thing"])
    })
})

