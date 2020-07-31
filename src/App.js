import React, { Component } from 'react';
import './index.css';
import Snake from './Snake';
import Food from './Food';

const getRandomCoordinates = () => {
  let min = 1;
  let max = 99;
  let v = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let h = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [v, h]
}

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  arrow: 'right',
  snake: [
    [0, 0],
    [2, 0]
  ]
}

class App extends Component {
  state = initialState;

  componentDidMount() {
    setInterval(this.snakeMoves, this.state.speed)
    document.onkeydown = this.onkeydown;
  }

  componentDidUpdate() {
    this.checkIfOutbordersGame();
    // this.checkIfSnakeEatHerSelf();
    this.checkIfSnakeEatTheFood();
  }

  onkeydown = (e) => {
    e = e || window.event;

    switch (e.keyCode) {
      case (38):
        this.setState({ arrow: 'up' })
        break;
      case (40):
        this.setState({ arrow: 'down' })
        break;
      case (37):
        this.setState({ arrow: 'left' })
        break;
      case (39):
        this.setState({ arrow: 'right' })
        break;
      default:
        break;
    }
  }

  snakeMoves = () => {
    let dots = [...this.state.snake];
    let snakeHead = dots[dots.length - 1];

    switch (this.state.arrow) {
      case 'right':
        snakeHead = [snakeHead[0] + 2, snakeHead[1]]
        break;
      case 'left':
        snakeHead = [snakeHead[0] - 2, snakeHead[1]]
        break;
      case 'up':
        snakeHead = [snakeHead[0], snakeHead[1] - 2]
        break;
      case 'down':
        snakeHead = [snakeHead[0], snakeHead[1] + 2]
        break;
    }
    dots.push(snakeHead);
    dots.shift();
    this.setState({
      snake: dots
    })
  }

  checkIfOutbordersGame() {
    let snakeHead = this.state.snake[this.state.snake.length - 1]
    if (snakeHead[0] >= 100 || snakeHead[1] >= 100 || snakeHead[0] < 0 || snakeHead[1] < 0) {
      this.gameOver();
    }
  }

  checkIfSnakeEatHerSelf() {
    let snake = [...this.state.snake]
    let head = snake[snake.length - 1]
    head.pop()
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.gameOver();
      }
    })
  }

  checkIfSnakeEatTheFood() {
    let head = this.state.snake[this.state.snake.length - 1]
    let food = [...this.state.food]

    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates()
      })
      this.enlargedSnakeBody();
      this.increaseSpeed();
    }
  }
  
  enlargedSnakeBody = () => {
    let snakeBody = [...this.state.snake];
    snakeBody.unshift([])
    this.setState({ snake: snakeBody })
  }
 increaseSpeed(){
   if (this.state.speed > 10) {
     this.setState({
       speed: this.state.speed-10
     })
   }
 }
  gameOver = () => {
    alert('game over')
    this.setState(initialState)
  }

  render() {
    return (
      <div>
        <h1 className='title'>Snake Game</h1>
        <div className="the-game">
          <Snake snake={this.state.snake} />
          <Food apple={this.state.food} />
        </div>
      </div>
    )
  }
}

export default App;
