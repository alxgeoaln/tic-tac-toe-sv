import { Socket, Server } from "socket.io";

import { board, gameUtils, playerTurn, players } from "../players";

import { Column, Row } from "./types";

import { emitBoard, emitTurn, emitVictoryPath, o, onPlaceSign, x } from "../../common/constants";
import { checkVictory } from "../../common/utils";

export const placeSign = (io: Server, socket: Socket) => {
    socket.on(onPlaceSign, (position: [Row, Column]) => {

        const [row, column] = position;

        if (players[gameUtils.playerTurn].socket?.id !== socket.id) {
            console.log('not the player turn')
            return;
        }

        if (gameUtils.board[row].row[column].item) {
            console.log('position already used');
            return;
        }

        players[gameUtils.playerTurn].moves += 1;

        gameUtils.board[row].row[column].item = gameUtils.playerTurn;

        let victoryPath: boolean | number[][] = false;

        if (!players[playerTurn].victory) {
            io.emit(emitBoard, gameUtils.board);
            if (players[playerTurn].moves > 2) {
                victoryPath = checkVictory(board, row, column, gameUtils.playerTurn);
            }
        }


        if (players[gameUtils.playerTurn].moves >= 3 && victoryPath) {

            players[playerTurn].victory = true;
            io.emit(emitVictoryPath, victoryPath)
            return;
        }


        gameUtils.playerTurn = gameUtils.playerTurn === x ? o : x;
        io.emit(emitTurn, gameUtils.playerTurn);
    });
}