import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

export const REGION = "eu-west-1";
export const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }));

export async function writeCsvToDynamoDb(putItemCommand : PutItemCommand) {
    await dynamoClient.send(putItemCommand);
}

export async function readFromDynamoDb(): Promise<string[]> {
    const results = await dynamoClient.send(new GetCommand({
        TableName: '',
        Key: {
            id: ''
        }
    }));

    return ["", ""];
}