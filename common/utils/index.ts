import { v4 as uuidv4 } from 'uuid'

import { Column, Row } from '../../streaming/place-sign.ts/types';
import { Board, Cell, PlayerTurn } from '../../streaming/players/types'



export const generateBoard = (): Board => {
    const board: Board = [];

    for (let row = 0; row < 3; row++) {
        const rowId = uuidv4();
        const row: Cell[] = [];
        for (let col = 0; col < 3; col++) {
            row.push({
                colId: uuidv4(),
                item: null
            })
        }

        board.push({
            rowId,
            row
        })
    }

    return board;

};

export const checkVictory = (
    board: Board,
    row: Row,
    column: Column,
    playerTurn: PlayerTurn
) => {
    let count = 0;
    let victoryPath: number[][] = [];

    // check row
    for (let position = 0; position < 3; position++) {
        if (board[row].row[position].item === playerTurn) {
            count++
            victoryPath.push([row, position])
        }

        if (count === 3) return victoryPath;
    }
    victoryPath = [];
    count = 0;

    // check column
    for (let position = 0; position < 3; position++) {
        if (board[position].row[column].item === playerTurn) {
            count++
            victoryPath.push([position, column])
        }

        if (count === 3) return victoryPath
    }
    victoryPath = [];
    count = 0;

    // check primary diagonal
    for (let rowPosition = 0; rowPosition < 3; rowPosition++) {
        if (board[rowPosition].row[rowPosition].item === playerTurn) {
            count++;
            victoryPath.push([rowPosition, rowPosition])
        }

        if (count === 3) return victoryPath
    }
    victoryPath = [];
    count = 0;

    // check secondary diagonal
    for (let rowPosition = 0; rowPosition < 3; rowPosition++) {
        if (board[rowPosition].row[2 - rowPosition].item === playerTurn) {
            count++;
            victoryPath.push([rowPosition, 2 - rowPosition])
        }

        if (count === 3) return victoryPath;
    }

    return false;
}