
import React from 'react';
import ReactDOM from 'react-dom';
import { GameState, UpdateScoreRequest, GetHighScoreResponse } from '../shared/types';
import './index.css';

const BOARD_SIZE = 20;
const CELL_SIZE = 20;

const App: React.FC = () => {
  const [gameState, setGameState] = React.useState<GameState>({
    score: 0,
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 15 },
    direction: 'right',
    gameOver: false,
  });

  const [highScore, setHighScore] = React.useState<number>(0);

  React.useEffect(() => {
    fetchHighScore();
  }, []);

  const fetchHighScore = async () => {
    try {
      const response = await fetch('/api/highScore');
      const data: GetHighScoreResponse = await response.json();
      setHighScore(data.highScore);
    } catch (error) {
      console.error('Error fetching high score:', error);
    }
  };

  const updateScore = async (score: number) => {
    try {
      const request: UpdateScoreRequest = { score };
      await fetch('/api/updateScore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      fetchHighScore();
    } catch (error) {
      console.error('Error updating score:', error);
    }
  };

  const moveSnake = () => {
    const { snake, direction, food } = gameState;
    const head = snake[0];
    let newHead: { x: number; y: number };

    switch (direction) {
      case 'up':
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case 'down':
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case 'left':
        newHead = { x: head.x - 1, y: head.y };
        break;
      case 'right':
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    if (
      newHead.x < 0 ||
      newHead.x >= BOARD_SIZE ||
      newHead.y < 0 ||
      newHead.y >= BOARD_SIZE ||
      snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameState((prevState) => ({
        ...prevState,
        gameOver: true,
      }));
      updateScore(gameState.score);
      return;
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setGameState((prevState) => ({
        ...prevState,
        score: prevState.score + 1,
        snake: newSnake,
        food: {
          x: Math.floor(Math.random() * BOARD_SIZE),
          y: Math.floor(Math.random() * BOARD_SIZE),
        },
      }));
    } else {
      newSnake.pop();
      setGameState((prevState) => ({
        ...prevState,
        snake: newSnake,
      }));
    }
  };

  React.useEffect(() => {
    const intervalId = setInterval(moveSnake, 100);
    return () => clearInterval(intervalId);
  }, [gameState.direction]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    let newDirection: GameState['direction'];

    switch (key) {
      case 'ArrowUp':
        newDirection = 'up';
        break;
      case 'ArrowDown':
        newDirection = 'down';
        break;
      case 'ArrowLeft':
        newDirection = 'left';
        break;
      case 'ArrowRight':
        newDirection = 'right';
        break;
      default:
        return;
    }

    setGameState((prevState) => ({
      ...prevState,
      direction: newDirection,
    }));
  };

  const resetGame = () => {
    setGameState({
      score: 0,
      snake: [{ x: 10, y: 10 }],
      food: { x: 15, y: 15 },
      direction: 'right',
      gameOver: false,
    });
  };

  return (
    <div className="game-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="game-board">
        {gameState.snake.map((segment, index) => (
          <div
            key={index}
            className="snake-segment"
            style={{
              left: segment.x * CELL_SIZE,
              top: segment.y * CELL_SIZE,
            }}
          />
        ))}
        <div
          className="food"
          style={{
            left: gameState.food.x * CELL_SIZE,
            top: gameState.food.y * CELL_SIZE,
          }}
        />
      </div>
      <div className="game-info">
        <p>Score: {gameState.score}</p>
        <p>High Score: {highScore}</p>
        {gameState.gameOver && (
          <div>
            <p>Game Over!</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
