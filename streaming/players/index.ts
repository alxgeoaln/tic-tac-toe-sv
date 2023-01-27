import { Board, GameUtils, PlayerTurn, Players } from './types';

import { x, o } from '../../common/constants';
import { generateBoard } from '../../common/utils';

export let playerTurn: PlayerTurn = x;
export let board: Board = generateBoard();

export const players: Players = {
    [x]: {
        socket: null,
        moves: 0,
        victory: false
    },
    [o]: {
        socket: null,
        moves: 0,
        victory: false
    }
};


export const gameUtils: GameUtils = {
    board,
    playerTurn
}

