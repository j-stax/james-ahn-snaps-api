import fs from 'fs';

const handler = async (event) => {
    try {
        const tags = await fs.promises.readFile('./data/tags.json', 'utf8');
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