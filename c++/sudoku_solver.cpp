#include <iostream>
using namespace std;

// Board combinations to Solve
int board[9][9] = {
    {3, 0, 6, 5, 0, 8, 4, 0, 0},
    {5, 2, 0, 0, 0, 0, 0, 0, 0},
    {0, 8, 7, 0, 0, 0, 0, 3, 1},
    {0, 0, 3, 0, 1, 0, 0, 8, 0},
    {9, 0, 0, 8, 6, 3, 0, 0, 5},
    {0, 5, 0, 0, 9, 0, 6, 0, 0},
    {1, 3, 0, 0, 0, 0, 2, 5, 0},
    {0, 0, 0, 0, 0, 0, 0, 7, 4},
    {0, 0, 5, 2, 0, 6, 3, 0, 0}
};

bool solveSudoku(int board[9][9]) {
    // Check if the board is full
    bool isFull = true;
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                isFull = false;
                break;
            }
        }
        if (!isFull) {
            break;
        }
    }
    if (isFull) {
        return true;
    }

    // Iterate through the board and find the first empty cell
    for (int row = 0; row < 9; row++) {
        for (int col = 0; col < 9; col++) {
            if (board[row][col] == 0) {
                // Try filling the empty cell with a number from 1 to 9
                for (int number = 1; number <= 9; number++) {
                    // Check if the move is valid
                    if (isValidMove(board, row, col, number)) {
                        // Make the move
                        board[row][col] = number;

                        // Recursively try to solve the rest of the board
                        if (solveSudoku(board)) {
                            return true;
                        } else {
                            // If the move leads to an invalid solution, reset the cell to empty
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

bool isValidMove(int board[9][9], int row, int col, int number) {
    // Check row
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == number) {
            return false;
        }
    }

    // Check column
    for (int i = 0; i < 9; i++) {
        if (board[i][col] == number) {
            return false;
        }
    }

    // Check 3x3 square
    int squareRow = row / 3 * 3;
    int squareCol = col / 3 * 3;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 3; j++) {
            if (board[squareRow + i][squareCol + j] == number) {
                return false;
            }
        }
    }

    return true;
}

int main() {
    if (solveSudoku(board)) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                cout << board[i][j] << " ";
            }
            cout << endl;
        }
    } else {
        cout << "No solution found" << endl;
    }

    return 0;
}
