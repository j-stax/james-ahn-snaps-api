import fs from 'fs';

const handler = async (event) => {
    try {
        const { id } = event.pathParameters;
        const photosData = await JSON.parse(fs.promises.readFile('./data/photos.json', 'utf-8'));
        const photo = photosData.find(photoObj => photoObj.id === id);
        if (photo) {          
            return {
                statusCode: 200,
                body: JSON.stringify(photo.comments),
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