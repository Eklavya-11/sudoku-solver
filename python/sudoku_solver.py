# Board combinations to Solve
board = [
[3,0,6,5,0,8,4,0,0],
[5,2,0,0,0,0,0,0,0],
[0,8,7,0,0,0,0,3,1],
[0,0,3,0,1,0,0,8,0],
[9,0,0,8,6,3,0,0,5],
[0,5,0,0,9,0,6,0,0],
[1,3,0,0,0,0,2,5,0],
[0,0,0,0,0,0,0,7,4],
[0,0,5,2,0,6,3,0,0]
]

def solveSudoku(board):
    # Check if the board is full
    isFull = True
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                isFull = False
                break
        if not isFull:
            break
    if isFull:
        return True

    # Iterate through the board and find the first empty cell
    for row in range(9):
        for col in range(9):
            if board[row][col] == 0:
                # Try filling the empty cell with a number from 1 to 9
                for number in range(1,10):
                    # Check if the move is valid
                    if isValidMove(board, row, col, number):
                        # Make the move
                        board[row][col] = number

                        # Recursively try to solve the rest of the board
                        if solveSudoku(board):
                            return True
                        else:
                            # If the move leads to an invalid solution, reset the cell to empty
                            board[row][col] = 0
                return False
    return True

def isValidMove(board, row, col, number):
    # Check row
    for i in range(9):
        if board[row][i] == number:
            return False

    # Check column
    for i in range(9):
        if board[i][col] == number:
            return False

    # Check 3x3 square
    squareRow = int(row/3)*3
    squareCol = int(col/3)*3
    for i in range(3):
        for j in range(3):
            if board[squareRow + i][squareCol + j] == number:
                return False

    return True

if solveSudoku(board):
    print(board)
else:
    print('No solution found')
