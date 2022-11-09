import { DynamoDBClient, GetItemCommand, QueryCommand } from '@aws-sdk/client-dynamodb'

export const REGION = "eu-west-1";
const client = new DynamoDBClient({ region: REGION, endpoint: 'http://localhost:4566' })

export async function GetItem(id : string) : Promise<Record<string, any>> {
    const command = new GetItemCommand({
        Key: { Id: { S: id } },
        TableName: 'OnboardingTest',
        AttributesToGet: ["Id", "Title", "DisplayOrder", "Description", "Notes", "DueDay", "Owner"]
    });

    const item = await client.send(command);
    if(item.Item == null)
        return {};

    return item.Item;
}

export async function GetAllItemsForTeam(teamName: string) : Promise<Record<string, any>[]> {
    const query = new QueryCommand({
        TableName: 'OnboardingTest',
        IndexName: 'Team-index',
        KeyConditionExpression: 'Team = :t',
        ExpressionAttributeValues: {
            ':t': {'S': teamName }
        },
        ProjectionExpression: 'Id, Title, DisplayOrder, Description, Notes, DueDay, #owner',
        ExpressionAttributeNames: {'#owner': 'Owner'}
    });

    const items = await client.send(query);
    if(items.Items == null)
        return [];

    return items.Items
}