import fs from 'fs';
import path from 'path';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/tags.json');
        const tags = await fs.promises.readFile(filePath, 'utf8');
        return {
            statusCode: 200,
            body: tags,
            headers: {
                'Content-Type': 'application/json',
            }
        };
    } catch (err) {
        return {
            statusCode: 500,
            message: JSON.stringify({ message: "Error reading tags." })
        }
    }
}