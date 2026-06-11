export interface Team {
  id: number;
  name: string;
  logo?: string;
}

export interface Match {
  fixture: {
    id: number;
    date: string;
    status: string;
  };
  teams: {
    home: Team;
    away: Team;
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  league?: {
    id: number;
    name: string;
    season: number;
  };
}

export interface Prediction {
  id: string;
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  prediction: {
    win1: number;
    draw: number;
    win2: number;
  };
  goals: {
    under25: number;
    over25: number;
  };
  bothScore: number;
  confidence: number;
  analysis?: {
    homeForm: string;
    awayForm: string;
    headToHead: string;
    prediction: string;
  };
}
