import fs from 'fs';
import path from 'path';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        const { id } = event.pathParameters;
        const photosData = await JSON.parse(fs.promises.readFile(filePath, 'utf-8'));
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
                body: JSON.stringify(photoExComments),
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

export { handler }