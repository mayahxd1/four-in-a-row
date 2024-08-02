import { useState } from "react";


function Square({value, onSquareClick}) {          // create a function Square that takes in value and onSquareClick as props; ${value} is dynamic and will be replaced with the value prop
    return (
        <button className={`square ${value}`} onClick={onSquareClick}>                 
            {value}
        </button>
    );
}


export default function Board() {
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(42).fill(null));

    function handleClick(i) {
        if (calculateWinner(squares)){
            return;
        }                                                                           // if the first element of the squares array is not null, return 
        const nextSquares = squares.slice();                                        // create a new array nextSquares that is a copy of the squares array
        
     // Determine the row based on the index range
        let row;
        if (i >= 0 && i <= 6) row = 0;
        else if (i >= 7 && i <= 13) row = 1;
        else if (i >= 14 && i <= 20) row = 2;
        else if (i >= 21 && i <= 27) row = 3;
        else if (i >= 28 && i <= 34) row = 4;
        else if (i >= 35 && i <= 41) row = 5;

     // Calculate the column from the index
        const col = i - 7 * row;

     // Start from the bottom-most row of that column
        let start_count = 35 + col;

     // Check each row in the column to find the first empty slot
        for (let rowIndex = start_count; rowIndex >= 0; rowIndex -= 7) {
            if (nextSquares[rowIndex] === null) {
                nextSquares[rowIndex] = xIsNext ? 'X' : 'O';
                setSquares(nextSquares);
                setXIsNext(!xIsNext);
                return;
            }
        } 
    }

    const winner = calculateWinner(squares);                                        // create a variable winner that is the result of the calculateWinner function
    const tie = calculateTie(squares);                                               // create a variable tie that is the result of the calculateTie function
    let status;    
    if (winner) {                                                                   
        status = 'Winner: ' + winner;                                                // set the status to 'Winner: ' plus the winner
    } else if (tie) {
        status = 'The game is a tie!' ;                                                // set the status to 'The game is a tie!'
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');                            // set the status to 'Next player: ' plus either 'X' or 'O' based on the xIsNext state
    }
                                                          

    return (
        <>
        <div className="status">{status}</div>              
        <div className="board-row"> 
              <Square value={squares[0]} onSquareClick={() => handleClick(0)}/> 
              <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
              <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
              <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
              <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
              <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
              <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        </div>
        <div className="board-row"> 
              <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>       
              <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
              <Square value={squares[9]} onSquareClick={() => handleClick(9)}/>
              <Square value={squares[10]} onSquareClick={() => handleClick(10)}/>
              <Square value={squares[11]} onSquareClick={() => handleClick(11)}/>
              <Square value={squares[12]} onSquareClick={() => handleClick(12)}/>
              <Square value={squares[13]} onSquareClick={() => handleClick(13)}/>
        </div>
        <div className="board-row">
              <Square value={squares[14]} onSquareClick={() => handleClick(14)}/>
              <Square value={squares[15]} onSquareClick={() => handleClick(15)}/>
              <Square value={squares[16]} onSquareClick={() => handleClick(16)}/>
              <Square value={squares[17]} onSquareClick={() => handleClick(17)}/>
              <Square value={squares[18]} onSquareClick={() => handleClick(18)}/>
              <Square value={squares[19]} onSquareClick={() => handleClick(19)}/>
              <Square value={squares[20]} onSquareClick={() => handleClick(20)}/>
        </div>
          <div className="board-row">
              <Square value={squares[21]} onSquareClick={() => handleClick(21)}/>
              <Square value={squares[22]} onSquareClick={() => handleClick(22)}/>
              <Square value={squares[23]} onSquareClick={() => handleClick(23)}/>
              <Square value={squares[24]} onSquareClick={() => handleClick(24)}/>
              <Square value={squares[25]} onSquareClick={() => handleClick(25)}/>
              <Square value={squares[26]} onSquareClick={() => handleClick(26)}/>
              <Square value={squares[27]} onSquareClick={() => handleClick(27)}/>
        </div>
          <div className="board-row">
              <Square value={squares[28]} onSquareClick={() => handleClick(28)}/>
              <Square value={squares[29]} onSquareClick={() => handleClick(29)}/>
              <Square value={squares[30]} onSquareClick={() => handleClick(30)}/>
              <Square value={squares[31]} onSquareClick={() => handleClick(31)}/>
              <Square value={squares[32]} onSquareClick={() => handleClick(32)}/>
              <Square value={squares[33]} onSquareClick={() => handleClick(33)}/>
              <Square value={squares[34]} onSquareClick={() => handleClick(34)}/>
          </div>
          <div className="board-row">
              <Square value={squares[35]} onSquareClick={() => handleClick(35)}/>
              <Square value={squares[36]} onSquareClick={() => handleClick(36)}/>
              <Square value={squares[37]} onSquareClick={() => handleClick(37)}/>
              <Square value={squares[38]} onSquareClick={() => handleClick(38)}/>
              <Square value={squares[39]} onSquareClick={() => handleClick(39)}/>
              <Square value={squares[40]} onSquareClick={() => handleClick(40)}/>
              <Square value={squares[41]} onSquareClick={() => handleClick(41)}/>
          </div>
      </>   
    );
                                                                     
}

function calculateWinner(squares) {
    const total_cols = 7;

    // Check for vertical wins
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col < total_cols; col++) {
            const index = row * total_cols + col; 
            if (squares[index] && squares[index] === squares[index + total_cols] && squares[index] === squares[index + total_cols * 2] && squares[index] === squares[index + total_cols * 3]) {
                return squares[index];
            }
        }
    }
 
    // Check for horizontal wins
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col <= 3; col++) {
            const index = row * total_cols + col;
            if (squares[index] && squares[index] === squares[index + 1] && squares[index] === squares[index + 2] && squares[index] === squares[index + 3]) {
                return squares[index];
            }
        }
    }

    // Check for diagonal wins (right down)
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 3; col++) {
            const index = row * total_cols + col;
            if (squares[index] && squares[index] === squares[index + total_cols + 1] && squares[index] === squares[index + total_cols * 2 + 2] && squares[index] === squares[index + total_cols * 3 + 3]) {
                return squares[index];
            }
        }
    }

    // Check for diagonal wins (right up)
    for (let row = 0; row <= 2; row++) {
        for (let col = 3; col < total_cols; col++) {
            const index = row * total_cols + col;
            if (squares[index] && squares[index] === squares[index + total_cols - 1] && squares[index] === squares[index + total_cols * 2 - 2] && squares[index] === squares[index + total_cols * 3 - 3]) {
                return squares[index];
            }
        }
    }

}

// check for a tie
function calculateTie(squares) {
let tie = true;
for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
        tie = false;
        break;
    }
}
return tie;
}