import fs from 'fs';

const handler = async (event) => {
    try {
        const photosData = await fs.promises.readFile('./data/photos.json', 'utf-8');
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

export { handler }