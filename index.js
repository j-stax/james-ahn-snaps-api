import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import tagsRoute from './routes/tags.js'
import photosRoutes from './routes/photos.js'

const app = express();

const logRequest = (req, res, next) => {
    console.log(`Request: ${req.method} for ${req.path} on ${new Date()}`);
    next();
}

// 3. How are we supposed to use the public/images/ http://localhost8080/public/images/...

app.use(logRequest);

const { PORT, CORS_ORIGIN } = process.env;

app.use(cors({ origin: CORS_ORIGIN }));

app.use(express.json());

app.use('/tags', tagsRoute)

app.use('/photos', photosRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
    console.log("Press CTRL + C to stop server")
});