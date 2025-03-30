import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        const { id } = event.pathParameters;
        const { name, comment } = event.pathParameters.body;
        const photosData = await JSON.parse(fs.promises.readFile(filePath, 'utf-8'));
        const photo = photosData.find(photoObj => photoObj.id === id);
        if (photo) {       
            const newCommentObj = {
                name: name,
                comment: comment,
                id: uuidv4(),
                timestamp: Date.now()
            };

            photosData.forEach(photoObj => {
                if (photoObj.id === id) {
                    photoObj.comments.push(newCommentObj);
                }
            });

            await fs.promises.writeFile('./data/photos.json', photosData);
            return {
                statusCode: 201,
                body: JSON.stringify(newCommentObj),
                headers: {
                    'Content-Type': 'application/json',
                }
            };
        } else {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: `Data not found for photo ID ${id}.` })
            }
        };  
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error reading photos." })
        };
    }
} 

export { handler };