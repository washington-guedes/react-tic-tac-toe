import React from 'react';
import { Board } from './board';
import { calculateWinner } from './calculateWinner';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        { squares: Array(9).fill(null) }
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  squares() {
    const { history } = this.state;
    return history[this.state.stepNumber].squares;
  }

  turn() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  isDrawn() {
    return this.squares().every(x => x != null);
  }

  hasAWinner() {
    return calculateWinner(this.squares()) != null;
  }

  isFinished() {
    return this.isDrawn() || this.hasAWinner();
  }

  status() {
    const squares = this.squares();

    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    }

    if (this.isDrawn()) {
      return 'Game drawn';
    }

    return `Next player: ${this.turn()}`;
  }

  handleClick(i) {
    if (this.isFinished()) {
      alert('game finished');
      return;
    }

    const squares = this.squares().slice();
    if (squares[i] != null) {
      alert('choose another square');
      return;
    }

    squares[i] = this.turn();

    this.setState({
      history: this.state.history.slice(0, this.state.stepNumber + 1).concat({ squares }),
      stepNumber: this.state.stepNumber + 1,
      xIsNext: this.state.stepNumber % 2 === 1,
    });
  }

  jumpTo(i) {
    this.setState({
      stepNumber: i,
      xIsNext: i % 2 === 0
    })
  }

  moves() {
    return this.state.history.map((_, i) => (
      <li key={i}>
          <button onClick={() => this.jumpTo(i)}>
            {i === 0 ? 'Go to game start' : `Go to move ${i}`}
          </button>
      </li>
    ));
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.squares()}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{this.status()}</div>
          <ol>{this.moves()}</ol>
        </div>
      </div>
    );
  }
}
