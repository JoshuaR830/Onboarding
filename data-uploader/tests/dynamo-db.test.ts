import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";
import { mockClient } from "aws-sdk-client-mock";

const mockedDb = mockClient(DynamoDBDocumentClient)

// https://aws.amazon.com/blogs/developer/mocking-modular-aws-sdk-for-javascript-v3-in-unit-tests/
describe('Dynamo tests', async () => {
    beforeEach(() => {
        mockedDb.reset();
    });

    mockedDb.on(GetCommand, {
        TableName: "",
        Key: {}
    }).resolves({
        Item: {}
    });

    test("", () => {
        const thing = getValues
        expect()
    })
})

