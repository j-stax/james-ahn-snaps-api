import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import tagsRoute from './routes/tags.js';
import photosRoutes from './routes/photos.js';

const { PORT, CORS_ORIGIN } = process.env;

const app = express();

const logRequest = (req, res, next) => {
    if (!req.path.includes("images")) {
        console.log(`Request: ${req.method} for ${req.path} on ${new Date()}`);
    }
    next();
}

app.use(express.json());

app.use(logRequest);

app.use(cors({ origin: CORS_ORIGIN }));

app.use(express.static("public"));

app.use('/tags', tagsRoute);

app.use('/photos', photosRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
    console.log("Press CTRL + C to stop server")
});