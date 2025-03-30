import fs from 'fs';
import path from 'path';

const handler = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        let photosData = await fs.promises.readFile(filePath, 'utf-8');
        photosData = JSON.parse(photosData);
        const photosDataExComments = photosData.map(photo => {
            return {
                id: photo.id,
                photo: photo.photo,
                photoDescription: photo.photoDescription,
                photographer: photo.photographer,
                tags: photo.tags
            }
        });

        return {
            statusCode: 200,
            body: JSON.stringify(photosDataExComments),
            headers: {
                'Content-Type': 'application/json',
            }
        }
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error reading photos." })
        };
    }
} 

export { handler };