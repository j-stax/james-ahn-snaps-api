import fs from 'fs';
import path from 'path';
import { getResponseHeaders } from '../utils/getResponseHeaders';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        const urlSegments = event.rawUrl.split('/');
        const id = urlSegments[urlSegments.length - 2];
        let photosData = await fs.promises.readFile(filePath, 'utf-8');
        photosData = JSON.parse(photosData);
        const photo = photosData.find(photoObj => photoObj.id === id);
        if (photo) {          
            return {
                statusCode: 200,
                headers: getResponseHeaders(),
                body: JSON.stringify(photo.comments),
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