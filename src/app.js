import http from 'http'
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { host, port, env } from 'c0nfig';
import api_v1 from './v1';
import * as middleware from './middleware';
/****************************************/

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logger('tiny'));

app.get('/', (req, res) => {
    res.send('yeth');
});

app.use('/v1', api_v1());
app.use(middleware.notFoundHandler);
app.use(middleware.errorHandler);

http.createServer(app).listen(port, err => {
    if (err) {
        console.error(error);
    }
    console.log(`listening on http://${host}:${port} env=${env}`);
});
