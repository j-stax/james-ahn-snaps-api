import fs from 'fs';
import path from 'path';
import { getResponseHeaders } from '../utils/getResponseHeaders';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        const id = event.rawUrl.split('/').pop();
        let photosData = await fs.promises.readFile(filePath, 'utf-8');
        photosData = JSON.parse(photosData);
        const photo = photosData.find(photoObj => photoObj.id === id);
        
        if (photo) {
            const photoExComments = {
                id: photo.id,
                photo: photo.photo,
                photoDescription: photo.photoDescription,
                photographer: photo.photographer,
                likes: photo.likes,
                timestamp: photo.timestamp,
                tags: photo.tags
            };
            
            return {
                statusCode: 200,
                headers: getResponseHeaders(),
                body: JSON.stringify(photoExComments)
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