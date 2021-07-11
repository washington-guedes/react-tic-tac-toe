import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button
      className="square"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  nextPlayer() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) != null) {
      // game finished
      return
    }

    if (squares[i] != null) {
      // should choose another square
      return
    }

    squares[i] = this.nextPlayer();

    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  status() {
    const winner = calculateWinner(this.state.squares);
    if (winner) {
      return `Winner: ${winner}`
    }

    if (this.state.squares.some(x => x == null)) {
      return `Next player: ${this.nextPlayer()}`;
    }

    return 'Draw';
  }

  render() {
    return (
      <div>
        <div className="status">{this.status()}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/**
 * calculateWinner finds out if the current board has a winner or not
 * @param {('X' | 'O' | null)[]} board
 * @returns 'X' | 'O' | null
 */
function calculateWinner(board) {
  const s = board.map((x, i) => x || i).join('');

  // https://regex101.com/r/SEC1fz/1
  const colWinner = s.match(/(.)(?=(?:..\1){2})/);
  if (colWinner) {
    return colWinner[1]
  }

  // https://regex101.com/r/hn2jSj/1
  const rowWinner = s.match(/(.)\1\1((...)*$)/);
  if (rowWinner) {
    return rowWinner[1]
  }

  // https://regex101.com/r/B86h4s/1
  const a1DWinner = s.match(/..(.).\1.\1../);
  if (a1DWinner) {
    return a1DWinner[1]
  }

  // https://regex101.com/r/vmqIHC/1
  const a3DWinner = s.match(/(.)...\1...\1/);
  if (a3DWinner) {
    return a3DWinner[1]
  }

  return null;
}
