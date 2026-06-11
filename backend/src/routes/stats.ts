import express from 'express';
import { getTeamStatistics } from '../services/api.js';
import { getDatabase } from '../services/database.js';

const router = express.Router();

router.get('/teams/:teamId', async (req, res, next) => {
  try {
    const stats = await getTeamStatistics(parseInt(req.params.teamId));
    res.json(stats);
  } catch (error) {
    next(error);
  }
});

router.get('/accuracy', (req, res, next) => {
  try {
    const db = getDatabase();
    const stats = db.prepare(`
      SELECT 
        COUNT(*) as total_predictions,
        SUM(CASE WHEN result_checked = 1 THEN 1 ELSE 0 END) as checked_predictions,
        SUM(CASE WHEN correct = 1 THEN 1 ELSE 0 END) as correct_predictions,
        AVG(confidence) as avg_confidence
      FROM predictions
    `).get();
    
    const accuracy = (stats as any).checked_predictions > 0 
      ? (((stats as any).correct_predictions / (stats as any).checked_predictions) * 100).toFixed(2)
      : 0;
    
    res.json({
      totalPredictions: (stats as any).total_predictions,
      checkedPredictions: (stats as any).checked_predictions,
      correctPredictions: (stats as any).correct_predictions,
      accuracy: `${accuracy}%`,
      avgConfidence: ((stats as any).avg_confidence?.toFixed(2) || 0),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
