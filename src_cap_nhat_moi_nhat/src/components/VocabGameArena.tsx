import React, { useState, useEffect, useRef } from 'react';
import {
  Gamepad2,
  Trophy,
  Flame,
  Timer,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Zap,
  Award,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VocabularyItem, MasteryStatus } from '../types';
import { speakEnglish } from '../utils/tts';

interface VocabGameArenaProps {
  vocabulary: VocabularyItem[];
  onUpdateQuizResult: (term: string, isCorrect: boolean) => void;
  accent: 'UK' | 'US';
}

interface GameQuestion {
  termItem: VocabularyItem;
  options: string[];
  correctMeaning: string;
}

const HIGH_SCORE_KEY = 'evm_arena_high_score';

export const VocabGameArena: React.FC<VocabGameArenaProps> = ({
  vocabulary,
  onUpdateQuizResult,
  accent
}) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(HIGH_SCORE_KEY);
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  const [currentQ, setCurrentQ] = useState<GameQuestion | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [correctAnswered, setCorrectAnswered] = useState<number>(0);

  const timerRef = useRef<any>(null);

  // Generate a random question from vocabulary pool
  const generateQuestion = (): GameQuestion | null => {
    if (vocabulary.length < 4) return null;

    // Pick random target item
    const targetIdx = Math.floor(Math.random() * vocabulary.length);
    const target = vocabulary[targetIdx];

    // Pick 3 distractors
    const otherItems = vocabulary.filter((_, idx) => idx !== targetIdx);
    const shuffledOthers = [...otherItems].sort(() => 0.5 - Math.random());
    const distractors = shuffledOthers.slice(0, 3).map((item) => item.meaning);

    // Shuffle options
    const allOptions = [...distractors, target.meaning].sort(() => 0.5 - Math.random());

    return {
      termItem: target,
      options: allOptions,
      correctMeaning: target.meaning
    };
  };

  // Start game
  const startGame = () => {
    if (vocabulary.length < 4) return;
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(60);
    setTotalAnswered(0);
    setCorrectAnswered(0);
    setSelectedOption(null);
    setFeedback(null);
    setGameState('playing');

    const firstQ = generateQuestion();
    setCurrentQ(firstQ);
    if (firstQ) {
      speakEnglish(firstQ.termItem.term, accent);
    }
  };

  // Timer loop
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // End game
  const endGame = () => {
    setGameState('gameover');
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem(HIGH_SCORE_KEY, score.toString());
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Option select handler
  const handleSelectOption = (option: string) => {
    if (selectedOption || !currentQ || gameState !== 'playing') return;

    setSelectedOption(option);
    setTotalAnswered((prev) => prev + 1);

    const isCorrect = option === currentQ.correctMeaning;
    onUpdateQuizResult(currentQ.termItem.term, isCorrect);

    if (isCorrect) {
      setFeedback('correct');
      setCorrectAnswered((prev) => prev + 1);

      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      // Score calculation: Base 100 + streak multiplier
      const multiplier = Math.min(newStreak, 5);
      const points = 100 * multiplier;
      setScore((prev) => prev + points);

      if (newStreak >= 3) {
        confetti({
          particleCount: 20,
          spread: 40,
          origin: { y: 0.7 }
        });
      }
    } else {
      setFeedback('wrong');
      setStreak(0);
    }

    // Next question after short delay
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      const nextQ = generateQuestion();
      setCurrentQ(nextQ);
      if (nextQ) {
        speakEnglish(nextQ.termItem.term, accent);
      }
    }, 550);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-amber-100 mb-2">
              <Gamepad2 className="w-4 h-4 text-amber-200" />
              <span>Gamification in Education • Kỹ năng Phản xạ Từ vựng THPT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Quick-Fire Vocab Arena (Đấu Trường 60 Giây)
            </h1>
            <p className="mt-1 text-amber-100 text-xs sm:text-sm">
              Luyện phản xạ nhanh với các cụm Collocations, Idioms, Phrasal Verbs trong 60 giây. Chuỗi combo càng cao, điểm nhân càng lớn!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-black/25 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
              <div className="flex items-center gap-1.5 text-amber-200 text-xs font-bold">
                <Trophy className="w-4 h-4 text-amber-300" />
                <span>Kỷ Lục Điểm</span>
              </div>
              <p className="text-xl sm:text-2xl font-black text-white">{highScore}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-8">
        {gameState === 'idle' && (
          <div className="text-center py-12 max-w-md mx-auto space-y-5">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
              <Zap className="w-10 h-10 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">
                Sẵn sàng thử thách 60s?
              </h2>
              <p className="text-xs text-slate-500">
                Kho từ vựng của bạn hiện có <strong>{vocabulary.length}</strong> từ. Cần tối thiểu 4 từ vựng để bắt đầu.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-left p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                <span>Combo x2, x3 khi đúng liên tục</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-amber-600" />
                <span>60 giây đếm ngược</span>
              </div>
            </div>

            <button
              type="button"
              disabled={vocabulary.length < 4}
              onClick={startGame}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-extrabold text-base shadow-lg shadow-orange-200 transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5" />
              <span>Bắt đầu đấu trường ngay!</span>
            </button>
          </div>
        )}

        {gameState === 'playing' && currentQ && (
          <div className="space-y-6">
            {/* Top Game Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              {/* Timer */}
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm ${
                    timeLeft <= 10
                      ? 'bg-rose-100 text-rose-700 animate-pulse ring-2 ring-rose-400'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <Timer className="w-4 h-4 text-orange-500" />
                  <span>{timeLeft}s</span>
                </div>

                {/* Streak Badge */}
                {streak > 1 && (
                  <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-100 text-orange-800 font-extrabold text-xs animate-bounce">
                    <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                    <span>COMBO x{Math.min(streak, 5)}</span>
                  </div>
                )}
              </div>

              {/* Current Score */}
              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Điểm số</span>
                <p className="text-2xl font-black text-orange-600">{score}</p>
              </div>
            </div>

            {/* Target Word Display */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-8 text-center space-y-3 relative overflow-hidden shadow-md">
              <div className="flex items-center justify-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {currentQ.termItem.type}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 text-slate-300">
                  CEFR {currentQ.termItem.cefrLevel}
                </span>
              </div>

              <div className="flex items-center justify-center gap-3">
                <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                  {currentQ.termItem.term}
                </h2>
                <button
                  type="button"
                  onClick={() => speakEnglish(currentQ.termItem.term, accent)}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                  title="Nghe phát âm"
                >
                  <Volume2 className="w-5 h-5 text-amber-300" />
                </button>
              </div>

              <p className="font-mono text-sm text-indigo-200">
                {currentQ.termItem.ipa}
              </p>

              {currentQ.termItem.context && (
                <p className="text-xs text-slate-300 italic max-w-lg mx-auto line-clamp-2 pt-2 border-t border-white/10">
                  "{currentQ.termItem.context.replace(/\*\*/g, '')}"
                </p>
              )}
            </div>

            {/* 4 Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isChosen = selectedOption === opt;
                const isCorrect = opt === currentQ.correctMeaning;

                let btnStyle = 'border-slate-200 bg-white hover:border-orange-300 hover:bg-orange-50/50 text-slate-800';

                if (selectedOption) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-400';
                  } else if (isChosen) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-2 ring-rose-400';
                  } else {
                    btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={Boolean(selectedOption)}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border-2 text-left font-semibold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {selectedOption && isChosen && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="text-center py-10 max-w-md mx-auto space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-xl shadow-orange-200">
              <Award className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                Hết Giờ!
              </span>
              <h2 className="text-3xl font-black text-slate-900 pt-2">
                Tổng Kết Đấu Trường
              </h2>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Điểm đạt</span>
                <strong className="text-2xl font-black text-orange-600">{score}</strong>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Đúng</span>
                <strong className="text-2xl font-black text-emerald-600">
                  {correctAnswered}/{totalAnswered}
                </strong>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 font-semibold block">Max Combo</span>
                <strong className="text-2xl font-black text-indigo-600">x{maxStreak}</strong>
              </div>
            </div>

            {score >= highScore && score > 0 && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold flex items-center justify-center gap-2">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>CHÚC MỪNG! Bạn vừa lập Kỷ Lục Điểm Mới!</span>
              </div>
            )}

            <button
              type="button"
              onClick={startGame}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-rose-600 hover:from-orange-600 hover:to-rose-700 text-white font-bold text-sm shadow-md shadow-orange-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Chơi lại hiệp mới</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
