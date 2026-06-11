import { Match } from '../types';

interface MatchSelectorProps {
  matches: Match[];
  selectedMatch: Match | null;
  onSelectMatch: (match: Match) => void;
  loading: boolean;
}

export default function MatchSelector({
  matches,
  selectedMatch,
  onSelectMatch,
  loading,
}: MatchSelectorProps) {
  if (loading && matches.length === 0) {
    return (
      <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-purple-500/20 rounded"></div>
          <div className="h-12 bg-purple-500/20 rounded"></div>
          <div className="h-12 bg-purple-500/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30 sticky top-24">
      <h2 className="text-xl font-bold text-white mb-4">📋 Предстоящие матчи</h2>
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {matches.length === 0 ? (
          <p className="text-gray-400 text-center py-8">Матчи не найдены</p>
        ) : (
          matches.map((match) => (
            <button
              key={match.fixture.id}
              onClick={() => onSelectMatch(match)}
              className={`w-full p-4 rounded-lg transition-all text-left ${
                selectedMatch?.fixture.id === match.fixture.id
                  ? 'bg-purple-600 border border-purple-400'
                  : 'bg-purple-950/50 border border-purple-500/20 hover:bg-purple-900/50'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-400">
                  {new Date(match.fixture.date).toLocaleString('ru-RU')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{match.teams.home.name}</span>
                <span className="text-xs text-purple-300 font-bold">vs</span>
                <span className="font-semibold text-white">{match.teams.away.name}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
