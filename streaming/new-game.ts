import { Server, Socket } from 'socket.io'

import { gameUtils, players } from './players';
import { x, o, emitBoard, emitTurn, emitSign } from '../common/constants';
import { generateBoard } from '../common/utils';

export const newGame = (io: Server, socket: Socket) => {
    if (!players[x].socket) {
        players[x] = {
            socket,
            moves: 0,
            victory: false
        };
        socket.emit(emitSign, x);
    } else if (!players[o].socket) {
        players[o] = {
            socket,
            moves: 0,
            victory: false
        };
        socket.emit(emitSign, o);
        io.emit(emitTurn, gameUtils.playerTurn);
    } else {
        socket.disconnect()
    }

    io.emit(emitBoard, gameUtils.board);
}

export const disconnectPlayer = (socket: Socket) => {
    if (players[x].socket?.id === socket.id) {
        players[x] = {
            moves: 0,
            socket: null,
            victory: false
        }
    } else {
        players[o] = {
            moves: 0,
            socket: null,
            victory: false
        }
    }

    gameUtils.board = generateBoard();
    gameUtils.playerTurn = x;

}