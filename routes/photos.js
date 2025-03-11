import fs from 'fs';
import express from 'express';
const router = express.Router();

const readPhotos = () => {
    const jsonPhotos = JSON.parse(fs.readFileSync('./data/photos.json'));
    return jsonPhotos;
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
        tags: photo.tags
    }
    res.json(photoExComments)
})

export default router;