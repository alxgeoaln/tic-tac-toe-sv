import { Socket } from "socket.io"

export interface Player {
    socket: Socket | null,
    moves: number,
    victory: boolean
}

export interface Players {
    x: Player;
    o: Player;
}

export type Cell = {
    colId: string;
    item: string | null
};
export type Board = {
    rowId: string;
    row: Cell[]
}[];

export type PlayerTurn = 'x' | 'o';

export interface GameUtils {
    board: Board,
    playerTurn: PlayerTurn
}