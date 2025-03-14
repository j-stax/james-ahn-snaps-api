import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import express from 'express';
const router = express.Router();

// Read from photos.json file and convert to a js data structure
const readPhotos = () => {
    const photosData = JSON.parse(fs.readFileSync('./data/photos.json'));
    return photosData;
}

// Write to photos.json file with data
const writePhotos = (data) => {
    const stringifiedData = JSON.stringify(data);
    fs.writeFileSync('./data/photos.json', stringifiedData)
}

router.get('/', (req, res) => {
    const photosData = readPhotos();
    const photosDataExComments = photosData.map(photo => {
        return {
            id: photo.id,
            photo: photo.photo,
            photoDescription: photo.photoDescription,
            photographer: photo.photographer,
            tags: photo.tags
        }
    })
    res.json(photosDataExComments);
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const photosData = readPhotos();
    const photo = photosData.find(photoObj => photoObj.id === id)
    const photoExComments = {
        id: photo.id,
        photo: photo.photo,
        photoDescription: photo.photoDescription,
        photographer: photo.photographer,
        likes: photo.likes,
        timestamp: photo.timestamp,
        tags: photo.tags
    }
    res.json(photoExComments);
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    const photosData = readPhotos();
    const photo = photosData.find(photoObj => photoObj.id === id);
    const photoComments = photo.comments;
    res.json(photoComments)
})

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const { name, comment } = req.body;
    const photosData = readPhotos();

    const newCommentObj = {
        name: name,
        comment: comment,
        id: uuidv4(),
        timestamp: Date.now()
    }
    
    photosData.forEach(photo => {
        if (photo.id === id) {
            photo.comments.push(newCommentObj)
        }
    })
    writePhotos(photosData)
    res.status(201).json(newCommentObj)
})

export default router;