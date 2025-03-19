import fs from 'fs';
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    const jsonTags = JSON.parse(fs.readFileSync('./data/tags.json'))
    res.json(jsonTags)
})

export default router;