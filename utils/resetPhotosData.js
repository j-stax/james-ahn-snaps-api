import fs from 'fs';
import path from 'path';

const resetPhotosData = async () => {
    const backupDataPath = path.join(__dirname, '../data/photos-backup.json');
    const photosDataPath = path.join(__dirname, '../data/photos.json');
    const backupData = await fs.promises.readFile(backupDataPath, 'utf-8');
    await fs.promises.writeFile(photosDataPath, backupData);
}

setTimeout(resetPhotosData, 86400000);