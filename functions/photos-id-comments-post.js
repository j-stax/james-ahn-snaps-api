import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { getResponseHeaders } from '../utils/getResponseHeaders';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        const urlSegments = event.rawUrl.split('/');
        const id = urlSegments[urlSegments.length - 2];
        const { name, comment } = JSON.parse(event.body);
        let photosData = await fs.promises.readFile(filePath, 'utf-8');
        photosData = JSON.parse(photosData);
        const photo = photosData.find(photoObj => photoObj.id === id);

        return {
            statusCode: 201,
            headers: getResponseHeaders(),
            body: JSON.stringify({ name, comment })
        }

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

            await fs.promises.writeFile(filePath, JSON.stringify(photosData));
            return {
                statusCode: 201,
                headers: getResponseHeaders(),
                // body: JSON.stringify(newCommentObj)
                body: JSON.stringify({ name, comment })
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