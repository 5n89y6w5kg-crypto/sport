import { Match, Prediction } from '../types';
import PredictionChart from './PredictionChart';

interface PredictionDisplayProps {
  match: Match;
  prediction: Prediction | null;
  onGeneratePrediction: () => void;
  loading: boolean;
}

export default function PredictionDisplay({
  match,
  prediction,
  onGeneratePrediction,
  loading,
}: PredictionDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Match Info */}
      <div className="bg-black/40 rounded-lg p-8 border border-purple-500/30">
        <div className="flex items-center justify-between mb-8">
          <div className="text-center flex-1">
            <img
              src={match.teams.home.logo}
              alt={match.teams.home.name}
              className="w-20 h-20 mx-auto mb-4 object-contain"
            />
            <h3 className="text-2xl font-bold text-white">{match.teams.home.name}</h3>
          </div>
          
          <div className="text-center px-8">
            <p className="text-gray-400 text-sm mb-2">
              {new Date(match.fixture.date).toLocaleString('ru-RU')}
            </p>
            <p className="text-4xl font-bold text-purple-400">VS</p>
          </div>
          
          <div className="text-center flex-1">
            <img
              src={match.teams.away.logo}
              alt={match.teams.away.name}
              className="w-20 h-20 mx-auto mb-4 object-contain"
            />
            <h3 className="text-2xl font-bold text-white">{match.teams.away.name}</h3>
          </div>
        </div>

        <button
          onClick={onGeneratePrediction}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-lg transition-all"
        >
          {loading ? '⏳ Генерирую прогноз...' : '🎯 Сгенерировать прогноз'}
        </button>
      </div>

      {/* Prediction Results */}
      {prediction && (
        <div className="space-y-6">
          {/* Confidence */}
          <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Уверенность</h3>
              <span className="text-3xl font-bold text-purple-400">{prediction.confidence}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-700 h-3 rounded-full transition-all"
                style={{ width: `${prediction.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PredictionChart
              title="Вероятность результата"
              data={[
                { name: `${prediction.homeTeam} Победа`, value: prediction.prediction.win1 },
                { name: 'Ничья', value: prediction.prediction.draw },
                { name: `${prediction.awayTeam} Победа`, value: prediction.prediction.win2 },
              ]}
            />
            
            <PredictionChart
              title="Вероятность голов"
              data={[
                { name: 'Более 2.5', value: prediction.goals.over25 },
                { name: 'Менее 2.5', value: prediction.goals.under25 },
              ]}
            />
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
              <h4 className="font-bold text-white mb-4">📊 Оба забьют</h4>
              <p className="text-3xl font-bold text-purple-400">{prediction.bothScore}%</p>
            </div>

            <div className="bg-black/40 rounded-lg p-6 border border-purple-500/30">
              <h4 className="font-bold text-white mb-4">🎯 Анализ</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p><span className="text-purple-400 font-semibold">Дома:</span> {prediction.analysis?.homeForm}</p>
                <p><span className="text-purple-400 font-semibold">В гостях:</span> {prediction.analysis?.awayForm}</p>
                <p><span className="text-purple-400 font-semibold">H2H:</span> {prediction.analysis?.headToHead}</p>
              </div>
            </div>
          </div>

          {/* Prediction Text */}
          <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg p-6 border border-purple-500/30">
            <p className="text-white text-lg">
              <span className="font-bold text-purple-400">Прогноз:</span> {prediction.analysis?.prediction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
