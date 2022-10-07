import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export const REGION = "eu-west-1";
export const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

export async function writeCsvToDynamoDb(putItemCommand : PutItemCommand) {
    await dynamoClient.send(putItemCommand);
}

export async function readFromDynamoDb(id: string): Promise<string[]> {
    var client = DynamoDBDocumentClient.from(new DynamoDBClient({ }))
    const results = await client.send(new GetCommand({
        TableName: 'Thing',
        Key: {
            Name: id
        }
    }));

    if(!results.Item) {
        return new Promise(() => {
            [""]
        });
    }

    return [results.Item.toString()]
}