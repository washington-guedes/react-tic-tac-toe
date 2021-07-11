import React from 'react';
import { Board } from './board';
import { calculateWinner } from './calculateWinner';

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        squarePlayed: -1,
      }],
      stepNumber: 0,
    };
  }

  squares() {
    const { history } = this.state;
    return history[this.state.stepNumber].squares;
  }

  turnOf(i) {
    return i % 2 === 0 ? 'X' : 'O';
  }

  turn() {
    return this.turnOf(this.state.stepNumber);
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

    return `Next to play: ${this.turn()}`;
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
      history: this.state.history.slice(0, this.state.stepNumber + 1).concat({
        squares,
        squarePlayed: i,
      }),
      stepNumber: this.state.stepNumber + 1,
    });
  }

  jumpTo(i) {
    this.setState({
      stepNumber: i,
    })
  }

  getCoordinates(i) {
    const letter = 'abc'[i % 3];
    const digit = 3 - Math.floor(i / 3);
    return letter + digit;
  }

  getMoveDescription(moveNumber, squarePlayed) {
    const prefix = moveNumber % 2 === 0 ? '' : `${Math.floor((moveNumber + 1) / 2)}. `;
    const moveDescription = `${this.turnOf(moveNumber-1)}:${this.getCoordinates(squarePlayed)}`;
    return prefix + moveDescription;
  }

  moves() {
    return this.state.history.map((x, i) => (
      <div key={i} className="move" onClick={() => this.jumpTo(i)}>
        {i === 0 ? 'Initial position' : this.getMoveDescription(i, x.squarePlayed)}
      </div>
    ));
  }

  render() {
    return (
      <div className="game">
        <div className="game-moves">
          {this.moves()}
        </div>
        <div className="game-info">
          {this.status()}
        </div>
        <div className="game-board">
          <Board
            squares={this.squares()}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      </div>
    );
  }
}
