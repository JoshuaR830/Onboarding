import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, GetCommandOutput, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";

export const REGION = "eu-west-1";
export const dynamoClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION, endpoint: 'http://localhost:4566' }));

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

export async function queryDynamoDb(query: QueryCommand) : Promise<QueryCommandOutput> {
    return await dynamoClient.send(query);
}