import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, GetCommandOutput } from "@aws-sdk/lib-dynamodb";

export const REGION = "eu-west-1";
export const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

export async function writeCsvToDynamoDb(putItemCommand : PutItemCommand) {
    await dynamoClient.send(putItemCommand);
}

export async function readFromDynamoDb(id: string): Promise<Record<string, any>> {
    var client = DynamoDBDocumentClient.from(new DynamoDBClient({ }))
    const results = await client.send(new GetCommand({
        TableName: 'TestTable',
        Key: {
            Id: id
        },
        AttributesToGet: ['Id', 'Title', 'Description', 'DueDay', 'Owner', 'Team', 'IsAutomated', 'Resources', 'ParentId']
    }));

    if(results == null || results.Item == null) {
        return {};
    }

    return results.Item
}