import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { getResponseHeaders } from '../utils/getResponseHeaders';


const handler = async (event) => {
    switch (event.httpMethod) {
        case 'OPTIONS':
            return {
                statusCode: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                }
            }
        case 'GET':
            return await handleGetRequest(event);
        case 'POST':
            return await handlePostRequest(event);
        default:
            return {
                statusCode: 405,
                headers: getResponseHeaders(),
                body: 'Request method type not allowed'
            }
    }
} 

const handleGetRequest = async (event) => {
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
                headers: getResponseHeaders(),
                body: JSON.stringify({ message: `Data not found for photo ID ${id}.` })
            }
        };  
    } catch (err) {
        return {
            statusCode: 500,
            headers: getResponseHeaders(),
            body: JSON.stringify({ message: "Error reading photos." })
        };
    }
} 

const handlePostRequest = async (event) => {
    try {
        const filePath = path.join(__dirname, '../data/photos.json');
        const urlSegments = event.rawUrl.split('/');
        const id = urlSegments[urlSegments.length - 2];
        const { name, comment } = JSON.parse(event.body);
        let photosData = await fs.promises.readFile(filePath, 'utf-8');
        photosData = JSON.parse(photosData);
        const photo = photosData.find(photoObj => photoObj.id === id);

        if (photo) {       
            const newCommentObj = {
                name: name,
                comment: comment,
                id: uuidv4(),
                timestamp: Date.now()
            };

            return {
                statusCode: 201,
                headers: getResponseHeaders(),
                body: JSON.stringify(newCommentObj)
            }

            photosData.forEach(photoObj => {
                if (photoObj.id === id) {
                    photoObj.comments.push(newCommentObj);
                }
            });

            // await fs.promises.writeFile(filePath, JSON.stringify(photosData));

            // return {
            //     statusCode: 201,
            //     headers: getResponseHeaders(),
            //     body: JSON.stringify(newCommentObj)
            // };
        } else {
            return {
                statusCode: 404,
                headers: getResponseHeaders(),
                body: JSON.stringify({ message: `Data not found for photo ID ${id}.` })
            }
        };  
    } catch (err) {
        return {
            statusCode: 500,
            headers: getResponseHeaders(),
            body: JSON.stringify({ message: "Error reading photos." })
        };
    }
} 

export { handler };