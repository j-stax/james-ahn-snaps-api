import fs from 'fs';
import path from 'path';
import { getResponseHeaders } from '../utils/getResponseHeaders';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/tags.json');
        const tags = await fs.promises.readFile(filePath, 'utf8');
        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: tags,
        };
    } catch (err) {
        return {
            statusCode: 500,
            message: JSON.stringify({ message: "Error reading tags." })
        }
    }
}

export { handler };