import express from 'express';
import { getUpcomingMatches } from '../services/api.js';
import { getDatabase } from '../services/database.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const matches = await getUpcomingMatches();
    res.json(matches);
  } catch (error) {
    next(error);
  }
});

router.get('/upcoming', async (req, res, next) => {
  try {
    const matches = await getUpcomingMatches();
    res.json(matches.filter(m => m.fixture.status === 'NS'));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = getDatabase();
    const match = db.prepare('SELECT * FROM matches WHERE id = ?').get(req.params.id);
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    next(error);
  }
});

export default router;
