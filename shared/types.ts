
export interface GameState {
  score: number;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';
  gameOver: boolean;
}

export interface UpdateScoreRequest {
  score: number;
}

export interface UpdateScoreResponse {
  success: boolean;
}

export interface GetHighScoreResponse {
  highScore: number;
}
