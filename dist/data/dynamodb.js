import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
// skapar en anslutning till DynamoDB databas
const accessKey = process.env.ACCESS_KEY_ID || '';
const secret = process.env.SECRET_ACCESS_KEY || '';
const client = new DynamoDBClient({
    region: "eu-north-1",
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret,
    },
});
//Skapar Document Client 
const db = DynamoDBDocumentClient.from(client);
const tableName = 'jwt';
export { db, tableName };
//# sourceMappingURL=dynamodb.js.map