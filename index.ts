import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

import { disconnectPlayer, newGame } from './streaming/new-game';
import { placeSign } from './streaming/place-sign.ts';
import { players } from './streaming/players';
import { localhost } from './common/constants';

const app = express();
const PORT = 4000;

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: localhost,
    },
})

io.on('connection', (socket) => {
    newGame(io, socket);
    placeSign(io, socket);

    socket.on('disconnect', () => {
        disconnectPlayer(socket)
        console.log('disconnected', players)
    })
})

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});