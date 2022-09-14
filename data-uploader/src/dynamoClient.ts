import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const REGION = "eu-west-1";
export const dynamoClient = new DynamoDBClient({ region: REGION });