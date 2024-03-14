
import { Request, Response } from 'express';
import { UpdateScoreRequest, UpdateScoreResponse, GetHighScoreResponse } from '../shared/types';
import { updateHighScore, getHighScore } from './db';

export async function handleUpdateScore(req: Request, res: Response) {
  const { score } = req.body as UpdateScoreRequest;

  try {
    await updateHighScore(score);
    const response: UpdateScoreResponse = { success: true };
    res.json(response);
  } catch (error) {
    console.error('Error updating high score:', error);
    res.status(500).json({ success: false });
  }
}

export async function handleGetHighScore(req: Request, res: Response) {
  try {
    const highScore = await getHighScore();
    const response: GetHighScoreResponse = { highScore };
    res.json(response);
  } catch (error) {
    console.error('Error getting high score:', error);
    res.status(500).json({ highScore: 0 });
  }
}
