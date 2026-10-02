import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Compass, CheckSquare, Target, BookOpen, Brain, Clock, Calendar as CalendarIcon, 
  RotateCcw, BarChart3, Flame, MessageSquare, Award, Settings, User,
  Plus, Play, Square, Pause, ChevronRight, ChevronLeft, Search, Bell,
  MoreVertical, X, Check, ArrowRight, Activity, Zap, Layers, Sparkles,
  Sliders, ShieldCheck, Bookmark, Trash2, Edit3, Share2, Eye, TrendingUp,
  AlertCircle, Moon, Sun, Monitor, RefreshCw, Star, Laptop, ArrowUpRight,
  FolderPlus, PlusCircle, CheckCircle2, CircleDashed, Terminal, Cpu
} from 'lucide-react';

const THEMES = {
  midnight: {
    id: 'midnight',
    name: 'Midnight Glass',
    bg: 'from-slate-950 via-zinc-900 to-black',
    accent: '#6366f1',
    accentLight: '#818cf8',
    accentGlow: 'rgba(99, 102, 241, 0.25)',
    cardBg: 'rgba(15, 23, 42, 0.55)',
    cardBorder: 'rgba(255, 255, 255, 0.1)',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    pillBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(99,102,241,0.18), transparent 70%)',
    badge: 'border-indigo-500/30 bg-indigo-950/40 text-indigo-300',
  },
  aurora: {
    id: 'aurora',
    name: 'Crystal Aurora',
    bg: 'from-slate-900 via-purple-950/40 to-slate-950',
    accent: '#ec4899',
    accentLight: '#f472b6',
    accentGlow: 'rgba(236, 72, 153, 0.25)',
    cardBg: 'rgba(30, 27, 75, 0.45)',
    cardBorder: 'rgba(255, 255, 255, 0.14)',
    textPrimary: 'text-purple-50',
    textSecondary: 'text-purple-300/70',
    pillBg: 'bg-pink-500/10 border-pink-500/20 text-pink-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(236,72,153,0.20), transparent 70%)',
    badge: 'border-pink-500/30 bg-pink-950/40 text-pink-300',
  },
  emerald: {
    id: 'emerald',
    name: 'Emerald Study',
    bg: 'from-zinc-950 via-emerald-950/30 to-black',
    accent: '#10b981',
    accentLight: '#34d399',
    accentGlow: 'rgba(16, 185, 129, 0.22)',
    cardBg: 'rgba(6, 78, 59, 0.25)',
    cardBorder: 'rgba(52, 211, 153, 0.18)',
    textPrimary: 'text-emerald-50',
    textSecondary: 'text-emerald-300/70',
    pillBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.20), transparent 70%)',
    badge: 'border-emerald-500/30 bg-emerald-950/40 text-emerald-300',
  },
  solaris: {
    id: 'solaris',
    name: 'Solaris Amber',
    bg: 'from-stone-950 via-amber-950/30 to-black',
    accent: '#f59e0b',
    accentLight: '#fbbf24',
    accentGlow: 'rgba(245, 158, 11, 0.25)',
    cardBg: 'rgba(45, 26, 10, 0.35)',
    cardBorder: 'rgba(251, 191, 36, 0.2)',
    textPrimary: 'text-amber-50',
    textSecondary: 'text-amber-200/60',
    pillBg: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.22), transparent 70%)',
    badge: 'border-amber-500/30 bg-amber-950/40 text-amber-300',
  },
  nebula: {
    id: 'nebula',
    name: 'Nebula Violet',
    bg: 'from-slate-950 via-violet-950/40 to-black',
    accent: '#8b5cf6',
    accentLight: '#a78bfa',
    accentGlow: 'rgba(139, 92, 246, 0.25)',
    cardBg: 'rgba(26, 16, 51, 0.45)',
    cardBorder: 'rgba(167, 139, 250, 0.18)',
    textPrimary: 'text-violet-50',
    textSecondary: 'text-violet-300/70',
    pillBg: 'bg-violet-500/10 border-violet-500/20 text-violet-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(139,92,246,0.22), transparent 70%)',
    badge: 'border-violet-500/30 bg-violet-950/40 text-violet-300',
  },
  frost: {
    id: 'frost',
    name: 'Titanium Frost',
    bg: 'from-slate-900 via-slate-800/40 to-slate-950',
    accent: '#94a3b8',
    accentLight: '#f1f5f9',
    accentGlow: 'rgba(241, 245, 249, 0.2)',
    cardBg: 'rgba(30, 41, 59, 0.4)',
    cardBorder: 'rgba(255, 255, 255, 0.25)',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    pillBg: 'bg-slate-400/10 border-slate-400/25 text-slate-200',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(241,245,249,0.15), transparent 70%)',
    badge: 'border-slate-400/30 bg-slate-800/40 text-slate-200',
  },
  cyberTeal: {
    id: 'cyberTeal',
    name: 'Hyperdrive Cyan',
    bg: 'from-black via-cyan-950/30 to-slate-950',
    accent: '#06b6d4',
    accentLight: '#22d3ee',
    accentGlow: 'rgba(6, 182, 212, 0.25)',
    cardBg: 'rgba(8, 47, 63, 0.35)',
    cardBorder: 'rgba(34, 211, 238, 0.2)',
    textPrimary: 'text-cyan-50',
    textSecondary: 'text-cyan-200/60',
    pillBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(6,182,212,0.22), transparent 70%)',
    badge: 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300',
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Nova',
    bg: 'from-zinc-950 via-rose-950/35 to-black',
    accent: '#f43f5e',
    accentLight: '#fb7185',
    accentGlow: 'rgba(244, 63, 94, 0.25)',
    cardBg: 'rgba(44, 13, 22, 0.38)',
    cardBorder: 'rgba(251, 113, 133, 0.2)',
    textPrimary: 'text-rose-50',
    textSecondary: 'text-rose-200/60',
    pillBg: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(244,63,94,0.22), transparent 70%)',
    badge: 'border-rose-500/30 bg-rose-950/40 text-rose-300',
  },
  celestial: {
    id: 'celestial',
    name: 'Celestial Quartz',
    bg: 'from-slate-950 via-indigo-950/30 to-purple-950/40',
    accent: '#a855f7',
    accentLight: '#c084fc',
    accentGlow: 'rgba(168, 85, 247, 0.25)',
    cardBg: 'rgba(40, 20, 60, 0.4)',
    cardBorder: 'rgba(192, 132, 252, 0.22)',
    textPrimary: 'text-purple-50',
    textSecondary: 'text-purple-200/65',
    pillBg: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.22), transparent 70%)',
    badge: 'border-purple-500/30 bg-purple-950/40 text-purple-300',
  },
  obsidianGold: {
    id: 'obsidianGold',
    name: 'Obsidian Luxe',
    bg: 'from-neutral-950 via-black to-zinc-950',
    accent: '#eab308',
    accentLight: '#fde047',
    accentGlow: 'rgba(234, 179, 8, 0.25)',
    cardBg: 'rgba(20, 20, 20, 0.65)',
    cardBorder: 'rgba(234, 179, 8, 0.3)',
    textPrimary: 'text-yellow-50',
    textSecondary: 'text-zinc-400',
    pillBg: 'bg-yellow-500/10 border-yellow-500/25 text-yellow-300',
    glowGradient: 'radial-gradient(circle at 50% 0%, rgba(234,179,8,0.18), transparent 70%)',
    badge: 'border-yellow-500/35 bg-black/60 text-yellow-300',
  }
};

const createPristineState = () => ({
  user: {
    targetHoursPerDay: 4,
    joinedDate: new Date().toISOString().split('T')[0]
  },
  stats: {
    streakDays: 0,
    longestStreak: 0,
    focusScore: 100,
    todayHours: 0,
    targetHours: 4.0,
    totalHoursStudied: 0
  },
  tasks: [],
  goals: [],
  subjects: [],
  topics: [],
  revisions: [],
  exams: [],
  sessions: [],
  dailyFeedback: {
    productivityScore: 0,
    focusRating: 0,
    completionRate: 0,
    learned: '',
    difficulties: '',
    distractions: [],
    tomorrowPriority: ''
  },
  achievements: [
    { id: 'ach1', title: 'Genesis Sequence', description: 'Log your first study session', unlocked: false, icon: 'Zap' },
    { id: 'ach2', title: 'Hyperfocus Ignition', description: 'Attain 2 uninterrupted focus hours', unlocked: false, icon: 'Clock' },
    { id: 'ach3', title: 'Knowledge Architect', description: 'Create 3 active subjects with topics', unlocked: false, icon: 'Layers' },
    { id: 'ach4', title: 'Neural Resilience', description: 'Maintain a 7-day study streak', unlocked: false, icon: 'Flame' },
    { id: 'ach5', title: 'Active Recall Master', description: 'Clear 5 spaced repetition revisions', unlocked: false, icon: 'RotateCcw' }
  ],
  systemInitialized: true
});

const NexoraLogo = ({ size = 'default', showWordmark = true }) => {
  const isSmall = size === 'small';
  const isHero = size === 'hero';
  const dim = isSmall ? 30 : isHero ? 52 : 40;
  
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div 
        style={{ width: dim, height: dim }}
        className="relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 via-white/10 to-transparent border border-white/20 shadow-[0_8px_32px_rgba(99,102,241,0.25)] backdrop-blur-xl transition-all duration-500 group-hover:scale-105 group-hover:border-indigo-400/50"
      >
        <svg 
          viewBox="0 0 100 100" 
          className="w-3/5 h-3/5 drop-shadow-[0_2px_12px_rgba(255,255,255,0.6)]"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Path 1: Primary Futuristic Geometric Blade */}
          <path
            d="M 22 80 L 22 20 L 38 20 L 78 80 L 62 80 L 22 20"
            fill="url(#nexoraGrad1)"
            opacity="0.95"
          />
          {/* Path 2: Beveled Refractive Column */}
          <path
            d="M 62 20 L 78 20 L 78 80 L 62 80 Z"
            fill="url(#nexoraGrad2)"
          />
          <defs>
            <linearGradient id="nexoraGrad1" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="0.5" stopColor="#818cf8" />
              <stop offset="1" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="nexoraGrad2" x1="60" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
      </div>
      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-slate-300 text-lg leading-none">
              NEXORA
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 tracking-tight">
              StudyOS
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-slate-400 font-medium -mt-0.5">
            Plan • Study • Track • Improve
          </span>
        </div>
      )}
    </div>
  );
};

const GlassCard = ({ 
  children, 
  className = '', 
  glow = false, 
  interactive = true, 
  onClick, 
  accentColor,
  blur = 'backdrop-blur-xl' 
}) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -(y / rect.height) * 6,
      y: (x / rect.width) * 6
    });
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        boxShadow: isHovered 
          ? `0 24px 48px -12px rgba(0,0,0,0.6), 0 0 25px ${accentColor || 'rgba(99,102,241,0.2)'}`
          : '0 10px 30px -10px rgba(0,0,0,0.4)',
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/40 ${blur} transition-all duration-300 ${interactive ? 'cursor-pointer' : ''} ${className}`}
    >
      <div 
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at 50% 0%, rgba(255,255,255,0.08), transparent 40%)`
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/5" />
      {children}
    </div>
  );
};

const ProgressRing = ({ progress = 0, size = 110, strokeWidth = 8, color = '#6366f1', children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (Math.min(100, Math.max(0, progress)) / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

const EmptyDeskState = ({ title, description, actionText, onAction, icon: Icon = CircleDashed }) => (
  <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
      <Icon className="w-7 h-7 stroke-[1.5]" />
    </div>
    <h4 className="text-base font-bold text-white mb-1.5">{title}</h4>
    <p className="text-xs text-slate-400 max-w-sm mb-5 leading-relaxed">{description}</p>
    {actionText && (
      <button
        onClick={onAction}
        className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 flex items-center gap-2 transition-all transform active:scale-95"
      >
        <Plus className="w-3.5 h-3.5" />
        {actionText}
      </button>
    )}
  </div>
);

const FocusTimerEngine = ({ onSessionComplete, subjects }) => {
  const [mode, setMode] = useState('focus');
  const [duration, setDuration] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || 'General Focus');
  const [sessionTopic, setSessionTopic] = useState('');
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [sessionRating, setSessionRating] = useState(5);
  const [notesLearned, setNotesLearned] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [isFlipped, setIsFlipped] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (subjects.length > 0 && selectedSubject === 'General Focus') {
      setSelectedSubject(subjects[0].name);
    }
  }, [subjects, selectedSubject]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setShowFeedbackModal(true);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const progressPercent = Math.min(100, Math.max(0, ((duration - timeLeft) / duration) * 100));

  const sandColor = useMemo(() => {
    if (mode === 'focus') return { primary: '#818cf8', secondary: '#c084fc', glow: 'rgba(129, 140, 248, 0.6)' };
    if (mode === 'focus50') return { primary: '#38bdf8', secondary: '#818cf8', glow: 'rgba(56, 189, 248, 0.6)' };
    return { primary: '#34d399', secondary: '#10b981', glow: 'rgba(52, 211, 153, 0.6)' };
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const neckY = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const ratioRemaining = Math.max(0, timeLeft / duration);
      const ratioAccumulated = Math.min(1, 1 - ratioRemaining);

      // Top Bulb Sand Level
      const topMaxH = height * 0.36;
      const topCurrentH = topMaxH * ratioRemaining;
      const topY = neckY - topCurrentH;

      if (ratioRemaining > 0.005) {
        ctx.save();
        ctx.beginPath();
        // Top bulb triangular envelope
        ctx.moveTo(centerX - 3, neckY - 2);
        const topSpread = 44 * Math.sqrt(Math.min(1, topCurrentH / topMaxH));
        ctx.lineTo(centerX - topSpread, topY);
        ctx.quadraticCurveTo(centerX, topY + 4, centerX + topSpread, topY);
        ctx.lineTo(centerX + 3, neckY - 2);
        ctx.closePath();

        const gradTop = ctx.createLinearGradient(0, topY, 0, neckY);
        gradTop.addColorStop(0, sandColor.secondary);
        gradTop.addColorStop(1, sandColor.primary);
        ctx.fillStyle = gradTop;
        ctx.fill();

        // Shimmer highlights
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      // Falling Sand Stream (Active flow)
      if (isActive && ratioRemaining > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX - 1.2, neckY);
        ctx.lineTo(centerX + 1.2, neckY);
        ctx.lineTo(centerX + 0.8, neckY + height * 0.42);
        ctx.lineTo(centerX - 0.8, neckY + height * 0.42);
        ctx.closePath();

        const streamGrad = ctx.createLinearGradient(0, neckY, 0, neckY + height * 0.42);
        streamGrad.addColorStop(0, '#ffffff');
        streamGrad.addColorStop(0.5, sandColor.primary);
        streamGrad.addColorStop(1, sandColor.secondary);
        ctx.fillStyle = streamGrad;
        ctx.shadowColor = sandColor.glow;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();

        // Spawn falling particle embers
        if (Math.random() > 0.35) {
          particlesRef.current.push({
            x: centerX + (Math.random() - 0.5) * 4,
            y: neckY + 4,
            vx: (Math.random() - 0.5) * 1.2,
            vy: 2.5 + Math.random() * 2.8,
            size: 1 + Math.random() * 1.8,
            life: 1.0,
            color: Math.random() > 0.4 ? sandColor.primary : '#ffffff'
          });
        }
      }

      // Update and draw streaming particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;

        if (p.life <= 0 || p.y > height * 0.9) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.shadowColor = sandColor.glow;
        ctx.shadowBlur = 4;
        ctx.fill();
        ctx.restore();
      }

      // Bottom Bulb Sand Heap (Cone shape that grows)
      if (ratioAccumulated > 0.005) {
        const bottomBaseY = height * 0.89;
        const bottomMaxH = height * 0.36;
        const bottomH = bottomMaxH * Math.pow(ratioAccumulated, 0.85);
        const bottomPeakY = bottomBaseY - bottomH;
        const baseWidth = 46 * Math.sqrt(Math.min(1, ratioAccumulated + 0.1));

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerX - baseWidth, bottomBaseY);
        ctx.quadraticCurveTo(centerX - baseWidth * 0.4, bottomBaseY - bottomH * 0.3, centerX, bottomPeakY);
        ctx.quadraticCurveTo(centerX + baseWidth * 0.4, bottomBaseY - bottomH * 0.3, centerX + baseWidth, bottomBaseY);
        ctx.closePath();

        const gradBottom = ctx.createRadialGradient(centerX, bottomPeakY + bottomH * 0.4, 2, centerX, bottomBaseY, baseWidth);
        gradBottom.addColorStop(0, '#ffffff');
        gradBottom.addColorStop(0.3, sandColor.secondary);
        gradBottom.addColorStop(1, sandColor.primary);
        ctx.fillStyle = gradBottom;
        ctx.shadowColor = sandColor.glow;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Surface edge highlight
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isActive, timeLeft, duration, sandColor]);

  const selectMode = (newMode, minutes) => {
    setMode(newMode);
    setDuration(minutes * 60);
    setTimeLeft(minutes * 60);
    setIsActive(false);
    setIsFlipped(prev => !prev);
  };

  const handleFlipVessel = () => {
    setIsFlipped(prev => !prev);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSaveFeedback = () => {
    const sessionData = {
      id: 'ses-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: Math.round(duration / 60),
      subject: selectedSubject,
      topic: sessionTopic.trim() || 'Quantum Sand Flow Segment',
      rating: sessionRating,
      difficulty,
      notes: notesLearned
    };
    onSessionComplete?.(sessionData);
    setShowFeedbackModal(false);
    setNotesLearned('');
    setSessionTopic('');
    setTimeLeft(duration);
  };

  return (
    <GlassCard className="p-6 relative overflow-hidden" glow>
      {/* Ambient background caustics */}
      <div 
        className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none blur-3xl opacity-30 transition-all duration-700"
        style={{ background: sandColor.glow }}
      />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <RotateCcw className="w-3.5 h-3.5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide">3D Chrono-Vessel</h3>
            <p className="text-[9px] text-slate-400 font-mono">QUANTUM FLUIDIC SAND TIMER</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleFlipVessel}
            title="Rotate Vessel 180°"
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-all active:scale-95 text-xs flex items-center gap-1 font-mono"
          >
            <RotateCcw className="w-3 h-3 text-indigo-400" />
            <span className="hidden sm:inline">Flip</span>
          </button>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono border ${
            isActive 
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse' 
              : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20'
          }`}>
            {isActive ? 'GRAVITY FLOWING' : 'EQUILIBRIUM IDLE'}
          </span>
        </div>
      </div>

      {/* Preset Mode Controls */}
      <div className="grid grid-cols-3 gap-2 p-1 bg-black/40 rounded-xl mb-4 border border-white/5">
        <button
          onClick={() => selectMode('focus', 25)}
          className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
            mode === 'focus' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          25m Focus
        </button>
        <button
          onClick={() => selectMode('focus50', 50)}
          className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
            mode === 'focus50' ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          50m Deep
        </button>
        <button
          onClick={() => selectMode('shortBreak', 5)}
          className={`py-1.5 text-xs font-medium rounded-lg transition-all ${
            mode === 'shortBreak' ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
          }`}
        >
          5m Break
        </button>
      </div>

      {/* Center 3D Liquid Glass Sand Timer Body */}
      <div className="relative flex flex-col items-center justify-center my-3 select-none">
        <div 
          className="relative w-48 h-64 flex items-center justify-center transition-transform duration-700 ease-out"
          style={{
            perspective: '1200px',
            transform: isFlipped ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        >
          {/* Outer Glass Shell SVG */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]" 
            viewBox="0 0 192 256" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Chrome Cap */}
            <path d="M 52 14 Q 96 11 140 14 L 144 24 Q 96 21 48 24 Z" fill="url(#metalGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="58" y="8" width="76" height="5" rx="2.5" fill="url(#chromeRing)" />

            {/* Bottom Chrome Base */}
            <path d="M 48 232 Q 96 235 144 232 L 140 242 Q 96 245 52 242 Z" fill="url(#metalGrad)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            <rect x="58" y="243" width="76" height="5" rx="2.5" fill="url(#chromeRing)" />

            {/* Glass Curvature Contour Outer */}
            <path
              d="M 52 24 
                 C 54 62, 86 102, 92 124 
                 L 92 132 
                 C 86 154, 54 194, 52 232
                 L 140 232 
                 C 138 194, 106 154, 100 132
                 L 100 124 
                 C 106 102, 138 62, 140 24
                 Z"
              fill="url(#glassRefractionGrad)"
              stroke="rgba(255, 255, 255, 0.35)"
              strokeWidth="1.5"
            />

            {/* Specular Front Rim Highlights */}
            <path
              d="M 58 32 C 60 65, 86 98, 91 120"
              stroke="url(#specularHighlight)"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 58 224 C 60 191, 86 158, 91 136"
              stroke="url(#specularHighlight)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
            <path
              d="M 134 32 C 132 65, 106 98, 101 120"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Central Narrow Constriction Ring */}
            <ellipse cx="96" cy="128" rx="7" ry="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1" fill="none" />

            <defs>
              <linearGradient id="metalGrad" x1="48" y1="12" x2="144" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#64748b" />
                <stop offset="0.3" stopColor="#cbd5e1" />
                <stop offset="0.5" stopColor="#ffffff" />
                <stop offset="0.7" stopColor="#94a3b8" />
                <stop offset="1" stopColor="#475569" />
              </linearGradient>
              <linearGradient id="chromeRing" x1="58" y1="8" x2="134" y2="13" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" />
                <stop offset="0.5" stopColor="#ffffff" />
                <stop offset="1" stopColor="#6366f1" />
              </linearGradient>
              <linearGradient id="glassRefractionGrad" x1="50" y1="24" x2="142" y2="232" gradientUnits="userSpaceOnUse">
                <stop stopColor="rgba(255, 255, 255, 0.12)" />
                <stop offset="0.3" stopColor="rgba(129, 140, 248, 0.05)" />
                <stop offset="0.5" stopColor="rgba(0, 0, 0, 0.25)" />
                <stop offset="0.7" stopColor="rgba(236, 72, 153, 0.05)" />
                <stop offset="1" stopColor="rgba(255, 255, 255, 0.14)" />
              </linearGradient>
              <linearGradient id="specularHighlight" x1="58" y1="32" x2="91" y2="120" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="1" stopColor="#ffffff" stopOpacity="0.0" />
              </linearGradient>
            </defs>
          </svg>

          {/* Dynamic 2D Sand Simulation Canvas Layer */}
          <canvas
            ref={canvasRef}
            width={192}
            height={256}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Holographic Readout Overlay (Stays upright regardless of vessel orientation) */}
          <div 
            className="absolute z-10 flex flex-col items-center justify-center pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]"
            style={{ transform: isFlipped ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <div className="bg-slate-950/75 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-2xl flex flex-col items-center">
              <span className="text-2xl font-black tracking-tight text-white font-mono leading-tight">
                {formatTime(timeLeft)}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sandColor.primary }} />
                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-300 font-semibold">
                  {Math.round(progressPercent)}% DRAINED
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject & Topic Directives */}
      <div className="space-y-2 mb-4 bg-white/[0.03] p-3 rounded-xl border border-white/10">
        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Target Subject Node</label>
          {subjects.length > 0 ? (
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
            >
              {subjects.map(s => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              placeholder="e.g. Core Study"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
            />
          )}
        </div>

        <div>
          <label className="text-[10px] text-slate-400 block mb-1">Chronological Focus Milestone</label>
          <input
            type="text"
            value={sessionTopic}
            onChange={(e) => setSessionTopic(e.target.value)}
            placeholder="e.g. Master Bayes Theorem derivations"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-400"
          />
        </div>
      </div>

      {/* Main Initiation Trigger */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className={`flex-1 py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
            isActive 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
          }`}
        >
          {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
          {isActive ? 'Halt Sand Flow' : 'Release Sand & Engage'}
        </button>

        <button
          onClick={() => {
            setIsActive(false);
            setTimeLeft(duration);
            setIsFlipped(prev => !prev);
          }}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
          title="Reset & Flip Vessel"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Post-Session Cognitive Telemetry Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-white/20 p-6 rounded-2xl max-w-md w-full shadow-2xl relative">
            <h4 className="text-base font-bold text-white mb-1.5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Chrono-Vessel Concluded
            </h4>
            <p className="text-xs text-slate-400 mb-4">
              All quantum sand has passed through the constriction. Record your session output.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Focus Quality (1-5)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button
                      key={num}
                      onClick={() => setSessionRating(num)}
                      className={`flex-1 py-1.5 rounded-lg border text-xs transition-all ${
                        sessionRating === num
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {num} ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Cognitive Resistance</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Easy', 'Medium', 'Hard'].map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`py-1.5 rounded-lg text-xs border ${
                        difficulty === lvl
                          ? 'bg-purple-600/40 border-purple-400 text-purple-200 font-semibold'
                          : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Crystallized Concept / Notes</label>
                <textarea
                  value={notesLearned}
                  onChange={(e) => setNotesLearned(e.target.value)}
                  placeholder="Summarize the core mental model or derivation..."
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleSaveFeedback}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
                >
                  Commit Vessel Flow to StudyOS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
};

const QuickAddModal = ({ isOpen, onClose, onAdd, subjects }) => {
  const [entityType, setEntityType] = useState('task');
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(subjects[0]?.name || 'General');
  const [priority, setPriority] = useState('High');
  const [duration, setDuration] = useState(45);
  const [customSubjectName, setCustomSubjectName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && entityType !== 'subject') return;

    if (entityType === 'task') {
      onAdd('task', {
        id: 't-' + Date.now(),
        title: title.trim(),
        subject: subject,
        priority,
        duration: Number(duration) || 30,
        status: 'todo',
        topic: 'Active Unit'
      });
    } else if (entityType === 'goal') {
      onAdd('goal', {
        id: 'g-' + Date.now(),
        title: title.trim(),
        subject: subject,
        targetHours: Number(duration) || 5,
        loggedHours: 0,
        priority,
        deadline: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
      });
    } else if (entityType === 'subject') {
      const name = customSubjectName.trim() || title.trim();
      if (!name) return;
      onAdd('subject', {
        id: 's-' + Date.now(),
        name: name,
        color: '#6366f1',
        totalTopics: 1,
        coveredTopics: 0,
        totalHours: 0
      });
    } else if (entityType === 'revision') {
      onAdd('revision', {
        id: 'r-' + Date.now(),
        topic: title.trim(),
        subject: subject,
        dueDate: 'Today',
        urgency: priority === 'Critical' ? 'High' : 'Medium',
        confidence: 2
      });
    }

    setTitle('');
    setCustomSubjectName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-white/20 p-6 rounded-2xl max-w-md w-full shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          Rapid Command Injector
        </h3>

        <div className="grid grid-cols-4 gap-1.5 mb-4">
          {['task', 'goal', 'subject', 'revision'].map(type => (
            <button
              key={type}
              onClick={() => setEntityType(type)}
              className={`py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                entityType === type 
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200' 
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {entityType === 'subject' ? (
            <div>
              <label className="text-xs text-slate-300 block mb-1">Subject Name</label>
              <input
                type="text"
                value={customSubjectName}
                onChange={(e) => setCustomSubjectName(e.target.value)}
                placeholder="e.g. Quantum Computing, Discrete Math, Biology..."
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
              />
            </div>
          ) : (
            <>
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {entityType === 'task' ? 'Task Description' : entityType === 'goal' ? 'Milestone Title' : 'Topic to Recall'}
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Master Linear Transformations, Write Synthesis..."
                  required
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Subject</label>
                  {subjects.length > 0 ? (
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                    >
                      {subjects.map(s => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Mathematics"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                    />
                  )}
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-2 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  {entityType === 'task' ? 'Estimated Minutes' : 'Target Hours'}
                </label>
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-3 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-semibold tracking-wide shadow-lg"
          >
            Deploy to Study Matrix ✓
          </button>
        </form>
      </div>
    </div>
  );
};

const GlobalSearchModal = ({ isOpen, onClose, data }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = [
    ...data.tasks.map(t => ({ type: 'Task', title: t.title, sub: t.subject, id: t.id })),
    ...data.goals.map(g => ({ type: 'Goal', title: g.title, sub: g.subject, id: g.id })),
    ...data.subjects.map(s => ({ type: 'Subject', title: s.name, sub: 'Domain Track', id: s.id })),
    ...data.topics.map(tp => ({ type: 'Topic', title: tp.name, sub: tp.subject, id: tp.id })),
    ...data.revisions.map(r => ({ type: 'Revision', title: r.topic, sub: r.subject, id: r.id }))
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) || 
    item.sub.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-white/20 p-4 rounded-2xl max-w-xl w-full shadow-2xl">
        <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks, goals, subjects, topics, or revisions..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
          />
          <button 
            onClick={onClose}
            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 hover:text-white"
          >
            ESC
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1.5">
          {results.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8">
              No matching knowledge nodes found in StudyOS.
            </p>
          ) : (
            results.map((r, i) => (
              <div 
                key={i}
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-colors"
              >
                <div>
                  <p className="text-xs font-medium text-white">{r.title}</p>
                  <p className="text-[10px] text-slate-400">{r.sub}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {r.type}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const OnboardingWizard = ({ isOpen, onClose, onSave }) => {
  const [subjectList, setSubjectList] = useState('');
  const [targetHours, setTargetHours] = useState('4');

  if (!isOpen) return null;

  const handleFinish = (e) => {
    e.preventDefault();
    const subjects = subjectList
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)
      .map((name, idx) => ({
        id: 's-' + (Date.now() + idx),
        name,
        color: idx % 2 === 0 ? '#6366f1' : '#ec4899',
        totalTopics: 0,
        coveredTopics: 0,
        totalHours: 0
      }));

    onSave({
      targetHours: Number(targetHours) || 4,
      subjects
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-indigo-500/30 p-6 rounded-2xl max-w-md w-full shadow-2xl relative">
        <div className="flex items-center gap-3 mb-3">
          <NexoraLogo size="small" showWordmark={false} />
          <div>
            <h3 className="text-base font-bold text-white">Initialize StudyOS</h3>
            <p className="text-xs text-indigo-300">Clean slate configuration</p>
          </div>
        </div>

        <form onSubmit={handleFinish} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 block mb-1">
              Core Subjects to Track (comma separated)
            </label>
            <input
              type="text"
              value={subjectList}
              onChange={(e) => setSubjectList(e.target.value)}
              placeholder="e.g. Machine Learning, Probability, Systems"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-400"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 block mb-1">Daily Study Target (Hours)</label>
            <div className="grid grid-cols-4 gap-2">
              {['2', '4', '6', '8'].map(hrs => (
                <button
                  type="button"
                  key={hrs}
                  onClick={() => setTargetHours(hrs)}
                  className={`py-1.5 rounded-lg border text-xs font-mono font-bold transition-all ${
                    targetHours === hrs
                      ? 'bg-indigo-600 border-indigo-400 text-white'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}
                >
                  {hrs}h
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-semibold tracking-wide shadow-lg"
          >
            Launch Pristine StudyOS ✓
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [themeKey, setThemeKey] = useState('midnight');

  /* Pristine State Initialization with no records */
  const [osData, setOsData] = useState(() => {
    try {
      const saved = localStorage.getItem('nexora_studyos_pristine_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return createPristineState();
  });

  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState(null);

  /* Save state to localStorage */
  useEffect(() => {
    try {
      localStorage.setItem('nexora_studyos_pristine_v1', JSON.stringify(osData));
    } catch (e) {
      console.error(e);
    }
  }, [osData]);

  /* Keyboard shortcut Cmd/Ctrl + K for Global Search */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showNotification = (msg) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  /* Clear all data to fresh empty slate */
  const handleClearAllData = () => {
    const fresh = createPristineState();
    setOsData(fresh);
    localStorage.removeItem('nexora_studyos_pristine_v1');
    showNotification('All previous data cleared. StudyOS is now in a pristine state ✓');
  };

  /* Toggle Task completion */
  const handleTaskToggle = (id) => {
    setOsData(prev => {
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === 'completed' ? 'todo' : 'completed';
          return { ...t, status: nextStatus };
        }
        return t;
      });
      return { ...prev, tasks: updatedTasks };
    });
    showNotification('Task status updated ✓');
  };

  /* Commit study session to telemetry */
  const handleNewSession = (session) => {
    setOsData(prev => {
      const updatedSessions = [session, ...prev.sessions];
      const addedHours = session.duration / 60;
      const newTodayHours = Number((prev.stats.todayHours + addedHours).toFixed(1));
      const newTotalHours = Number((prev.stats.totalHoursStudied + addedHours).toFixed(1));
      
      // Update subject hours if matching
      const updatedSubjects = prev.subjects.map(s => {
        if (s.name.toLowerCase() === session.subject.toLowerCase()) {
          return { ...s, totalHours: Number((s.totalHours + addedHours).toFixed(1)) };
        }
        return s;
      });

      return {
        ...prev,
        sessions: updatedSessions,
        subjects: updatedSubjects,
        stats: {
          ...prev.stats,
          todayHours: newTodayHours,
          totalHoursStudied: newTotalHours,
          streakDays: Math.max(1, prev.stats.streakDays)
        }
      };
    });
    showNotification('Study session recorded to telemetry ✓');
  };

  /* Inject new entities */
  const handleInjectEntity = (type, entity) => {
    setOsData(prev => {
      if (type === 'task') return { ...prev, tasks: [entity, ...prev.tasks] };
      if (type === 'goal') return { ...prev, goals: [entity, ...prev.goals] };
      if (type === 'subject') return { ...prev, subjects: [entity, ...prev.subjects] };
      if (type === 'revision') return { ...prev, revisions: [entity, ...prev.revisions] };
      return prev;
    });
    showNotification(`New ${type} initialized in StudyOS ✓`);
  };

  /* Onboarding setup completion without operator name */
  const handleOnboardingComplete = ({ targetHours, subjects }) => {
    setOsData(prev => ({
      ...prev,
      user: { ...prev.user, targetHoursPerDay: targetHours },
      stats: { ...prev.stats, targetHours },
      subjects: subjects.length > 0 ? subjects : prev.subjects
    }));
    showNotification(`Welcome to Nexora StudyOS ✓`);
  };

  const activeTheme = THEMES[themeKey] || THEMES.midnight;

  /* Dynamic Greeting */
  const greeting = useMemo(() => {
    const hr = new Date().getHours();
    if (hr < 12) return 'Good Morning';
    if (hr < 17) return 'Good Afternoon';
    if (hr < 21) return 'Good Evening';
    return 'Good Night';
  }, []);

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Top Banner and Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono tracking-wider text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              OPERATIONAL MATRIX
            </span>
            <span className="text-xs text-slate-400">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {greeting} 👋
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Command Center active. {osData.goals.length > 0 ? `Primary directive: ${osData.goals[0].title}` : 'All nodes ready. Begin by adding your study focus for today.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <GlassCard interactive={false} className="px-4 py-2 flex items-center gap-3 border-indigo-500/30">
            <Flame className="w-5 h-5 text-amber-400 fill-amber-400/30" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono">Streak</p>
              <p className="text-base font-bold text-white leading-none">{osData.stats.streakDays} Days</p>
            </div>
          </GlassCard>

          <GlassCard interactive={false} className="px-4 py-2 flex items-center gap-3 border-emerald-500/30">
            <Activity className="w-5 h-5 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-mono">Daily Target</p>
              <p className="text-base font-bold text-white leading-none">{osData.stats.todayHours}h / {osData.stats.targetHours}h</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Row 2: Goals & Focus Chamber */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2 relative overflow-hidden" glow>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-pink-400" />
              <h2 className="text-base font-bold text-white">Daily Primary Objectives</h2>
            </div>
            <button 
              onClick={() => setIsQuickAddOpen(true)}
              className="text-xs px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 hover:bg-pink-500/30"
            >
              + Add Goal
            </button>
          </div>

          {osData.goals.length === 0 ? (
            <EmptyDeskState
              title="No Active Directives"
              description="Define your primary study milestone for today to initiate telemetry tracking."
              actionText="Add Primary Goal"
              onAction={() => setIsQuickAddOpen(true)}
              icon={Target}
            />
          ) : (
            <div className="space-y-3">
              {osData.goals.map((goal) => {
                const pct = Math.round((goal.loggedHours / goal.targetHours) * 100);
                return (
                  <div key={goal.id} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-xs font-semibold text-white">{goal.title}</h4>
                        <p className="text-[10px] text-slate-400">{goal.subject} • Target: {goal.targetHours}h</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-indigo-300">{pct}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-500" 
                        style={{ width: `${Math.min(100, pct)}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* Focus Timer Widget */}
        <FocusTimerEngine 
          onSessionComplete={handleNewSession} 
          subjects={osData.subjects}
        />
      </div>

      {/* Row 3: Active Tasks Matrix & Spaced Recall */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
              <h3 className="font-bold text-white text-base">Active Study Tasks</h3>
            </div>
            <button 
              onClick={() => setIsQuickAddOpen(true)}
              className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30"
            >
              + Add Task
            </button>
          </div>

          {osData.tasks.length === 0 ? (
            <EmptyDeskState
              title="Your Study Desk is Pristine"
              description="No pending tasks in queue. Add exercises, readings, or problem sets to execute."
              actionText="Create Study Task"
              onAction={() => setIsQuickAddOpen(true)}
              icon={CheckSquare}
            />
          ) : (
            <div className="space-y-2.5">
              {osData.tasks.map((task) => {
                const isDone = task.status === 'completed';
                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskToggle(task.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isDone 
                        ? 'bg-emerald-950/20 border-emerald-500/30 opacity-70' 
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                        isDone ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-white/30'
                      }`}>
                        {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <p className={`text-xs font-medium text-white transition-all ${isDone ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{task.subject}</span>
                          <span>•</span>
                          <span>{task.duration} mins</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      task.priority === 'High' || task.priority === 'Critical'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                        : 'bg-slate-700/40 text-slate-300'
                    }`}>
                      {task.priority}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </GlassCard>

        {/* Spaced Recall Queue */}
        <GlassCard className="p-6">
          <h4 className="text-sm font-bold text-white mb-4">Study Session History</h4>
          {osData.sessions.length === 0 ? (
            <EmptyDeskState
              title="No Session History"
              description="Complete a focus chamber session to generate telemetry logs."
              actionText="Start First Session"
              onAction={() => setActiveTab('dashboard')}
              icon={Clock}
            />
          ) : (
            <div className="space-y-2.5">
              {osData.sessions.map(ses => (
                <div key={ses.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-white">{ses.topic}</p>
                    <p className="text-[10px] text-slate-400">{ses.subject} • {ses.time}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-indigo-300">{ses.duration}m</span>
                    <span className="text-[10px] block text-amber-300">{ses.rating} ★</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );

  const renderFeedback = () => {
    const totalTasks = osData.tasks.length;
    const completedTasks = osData.tasks.filter(t => t.status === 'completed').length;
    const taskScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 35) : 35;
    const hourScore = Math.min(35, Math.round((osData.stats.todayHours / (osData.stats.targetHours || 4)) * 35));
    const focusScore = Math.round(((osData.dailyFeedback?.focusRating || 8) / 10) * 30);
    const studyScore = Math.min(100, taskScore + hourScore + focusScore);

    const distractionOptions = [
      'Smartphone', 'Social Media', 'Fatigue / Low Energy', 
      'Gaming', 'Procrastination', 'Unclear Material', 'Environment Noise'
    ];

    const toggleDistraction = (tag) => {
      setOsData(prev => {
        const cur = prev.dailyFeedback.distractions || [];
        const updated = cur.includes(tag) ? cur.filter(d => d !== tag) : [...cur, tag];
        return {
          ...prev,
          dailyFeedback: { ...prev.dailyFeedback, distractions: updated }
        };
      });
    };

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Daily Cognitive Synthesis</h2>
          <p className="text-xs text-slate-400">
            End-of-day reflective loop: assess focus, capture acquired mental models, and calibrate tomorrow.
          </p>
        </div>

        {/* Reflection Score Card */}
        <GlassCard className="p-6 relative overflow-hidden" glow>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                Cognitive Execution Rating
              </span>
              <h3 className="text-xl font-black text-white">Daily Study Score</h3>
              <p className="text-xs text-slate-400 max-w-md">
                Transparently calculated from completed tasks, hours committed vs target, and self-reported session quality.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <ProgressRing progress={studyScore} size={96} strokeWidth={8} color="#818cf8">
                <span className="text-2xl font-black text-white font-mono">{studyScore}</span>
                <span className="text-[8px] uppercase tracking-wider text-indigo-300 font-bold">/ 100</span>
              </ProgressRing>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Task Completion:</span>
                  <span className="font-mono font-bold text-white">{taskScore}/35</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Hours Volume:</span>
                  <span className="font-mono font-bold text-white">{hourScore}/35</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-400">Focus Index:</span>
                  <span className="font-mono font-bold text-white">{focusScore}/30</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Synthesis Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Focus & Productivity Calibration
            </h4>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>Productivity Index</span>
                <span className="font-mono font-bold text-indigo-300">{osData.dailyFeedback?.productivityScore || 7}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={osData.dailyFeedback?.productivityScore || 7}
                onChange={(e) => setOsData(prev => ({
                  ...prev,
                  dailyFeedback: { ...prev.dailyFeedback, productivityScore: Number(e.target.value) }
                }))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span>Mental Focus Rating</span>
                <span className="font-mono font-bold text-purple-300">{osData.dailyFeedback?.focusRating || 8}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={osData.dailyFeedback?.focusRating || 8}
                onChange={(e) => setOsData(prev => ({
                  ...prev,
                  dailyFeedback: { ...prev.dailyFeedback, focusRating: Number(e.target.value) }
                }))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-2">Identified Friction & Distractions</label>
              <div className="flex flex-wrap gap-1.5">
                {distractionOptions.map(tag => {
                  const isSelected = (osData.dailyFeedback?.distractions || []).includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleDistraction(tag)}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected 
                          ? 'bg-rose-500/25 border-rose-500/40 text-rose-200' 
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Retrospective Learning Notes
            </h4>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Crystallized Concepts Acquired</label>
              <textarea
                rows={2}
                value={osData.dailyFeedback?.learned || ''}
                onChange={(e) => setOsData(prev => ({
                  ...prev,
                  dailyFeedback: { ...prev.dailyFeedback, learned: e.target.value }
                }))}
                placeholder="What core mental models or equations did you internalize?"
                className="w-full bg-black/40 border border-white/10 rounded-xl p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">Tomorrow's Primary Direction</label>
              <input
                type="text"
                value={osData.dailyFeedback?.tomorrowPriority || ''}
                onChange={(e) => setOsData(prev => ({
                  ...prev,
                  dailyFeedback: { ...prev.dailyFeedback, tomorrowPriority: e.target.value }
                }))}
                placeholder="e.g. Complete chapter on Dynamic Programming"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400"
              />
            </div>

            <button
              type="button"
              onClick={() => showNotification('Daily synthesis recorded to memory ✓')}
              className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-xs font-semibold shadow-lg transition-all"
            >
              Seal Day's Reflection ✓
            </button>
          </GlassCard>
        </div>
      </div>
    );
  };

  const renderAnalytics = () => {
    const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const completedTasks = osData.tasks.filter(t => t.status === 'completed').length;

    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Study Telemetry & Trends</h2>
          <p className="text-xs text-slate-400">
            Real-time metric breakdown derived from your focus logs, tasks, and consistency streaks.
          </p>
        </div>

        {/* High Level Key Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard className="p-4" interactive={false}>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Total Hours</span>
            <p className="text-2xl font-black text-white mt-1 font-mono">{osData.stats.totalHoursStudied}h</p>
            <span className="text-[9px] text-emerald-400 font-mono">+{(osData.stats.todayHours).toFixed(1)}h today</span>
          </GlassCard>

          <GlassCard className="p-4" interactive={false}>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Streak Momentum</span>
            <p className="text-2xl font-black text-amber-300 mt-1 font-mono">{osData.stats.streakDays} Days</p>
            <span className="text-[9px] text-slate-400 font-mono">Consistent routine</span>
          </GlassCard>

          <GlassCard className="p-4" interactive={false}>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Tasks Concluded</span>
            <p className="text-2xl font-black text-indigo-300 mt-1 font-mono">{completedTasks}/{osData.tasks.length}</p>
            <span className="text-[9px] text-indigo-400 font-mono">
              {osData.tasks.length > 0 ? Math.round((completedTasks / osData.tasks.length) * 100) : 0}% completion
            </span>
          </GlassCard>

          <GlassCard className="p-4" interactive={false}>
            <span className="text-[10px] text-slate-400 uppercase font-mono">Active Nodes</span>
            <p className="text-2xl font-black text-pink-300 mt-1 font-mono">{osData.subjects.length}</p>
            <span className="text-[9px] text-pink-400 font-mono">Tracked knowledge domains</span>
          </GlassCard>
        </div>

        {/* Weekly Mock Heatmap & Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6">
            <h4 className="text-sm font-bold text-white mb-3">Weekly Effort Distribution</h4>
            <div className="flex items-end justify-between h-40 pt-6 px-2 border-b border-white/10">
              {weekdays.map((day, idx) => {
                const isToday = idx === 3; // mock current index
                const barHeight = isToday ? Math.min(100, Math.max(25, osData.stats.todayHours * 20)) : (idx * 15 + 20) % 85 + 10;
                return (
                  <div key={day} className="flex flex-col items-center gap-2 flex-1">
                    <div 
                      className={`w-5 rounded-t-lg transition-all duration-500 ${
                        isToday ? 'bg-gradient-to-t from-indigo-500 to-purple-500' : 'bg-white/10'
                      }`}
                      style={{ height: `${barHeight}%` }}
                    />
                    <span className={`text-[10px] font-mono ${isToday ? 'text-indigo-300 font-bold' : 'text-slate-500'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-slate-400 mt-3 text-center">
              Active tracking registers highest concentration on weekdays.
            </p>
          </GlassCard>

          <GlassCard className="p-6">
            <h4 className="text-sm font-bold text-white mb-3">Domain Allocation</h4>
            {osData.subjects.length === 0 ? (
              <EmptyDeskState
                title="No Subject Nodes"
                description="Initialize subjects to visualize your cross-domain study distribution."
                actionText="Add Subject"
                onAction={() => setIsQuickAddOpen(true)}
                icon={BookOpen}
              />
            ) : (
              <div className="space-y-3">
                {osData.subjects.map(s => {
                  const pct = Math.min(100, Math.round((s.totalHours / (osData.stats.totalHoursStudied || 1)) * 100));
                  return (
                    <div key={s.id}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white font-medium">{s.name}</span>
                        <span className="font-mono text-indigo-300">{s.totalHours}h ({pct}%)</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full" 
                          style={{ width: `${pct}%` }} 
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    );
  };

  const renderCustomization = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Liquid Glass Appearance Studio</h2>
        <p className="text-xs text-slate-400">
          Switch across 10 handcrafted Liquid Glass themes and manage StudyOS system records.
        </p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-3 uppercase tracking-wider">
            Active Liquid Glass Presets ({Object.keys(THEMES).length} Total)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.values(THEMES).map(t => (
              <div
                key={t.id}
                onClick={() => {
                  setThemeKey(t.id);
                  showNotification(`Theme switched to ${t.name}`);
                }}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                  themeKey === t.id 
                    ? 'border-indigo-400 bg-white/15 shadow-xl scale-[1.03] ring-1 ring-indigo-400/50' 
                    : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-5 h-5 rounded-full shadow-md transition-transform" 
                      style={{ backgroundColor: t.accent, boxShadow: `0 0 10px ${t.accentGlow}` }} 
                    />
                    {themeKey === t.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">{t.name}</h4>
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-2 uppercase tracking-wide">
                  {t.id}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-4">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Data & Maintenance</h4>
          <p className="text-xs text-slate-400">
            Reset all study records and telemetry back to a completely clean slate.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleClearAllData}
              className="px-4 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 text-xs font-semibold flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear Previous Data (Pristine Wipe)
            </button>
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 text-xs font-semibold"
            >
              Run Setup Wizard
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  const renderProfile = () => (
    <div className="max-w-2xl mx-auto space-y-6">
      <GlassCard className="p-8 text-center relative overflow-hidden">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-1 mb-4 shadow-xl">
          <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
            <Cpu className="w-9 h-9 text-indigo-300" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-white">StudyOS Core</h2>
        <p className="text-xs text-indigo-300 font-mono mt-0.5">Autonomous Learning Environment</p>

        <div className="grid grid-cols-3 gap-3 my-6 pt-6 border-t border-white/10">
          <div>
            <span className="text-xl font-bold text-white font-mono">{osData.stats.streakDays}</span>
            <span className="text-[10px] text-slate-400 block uppercase">Streak Days</span>
          </div>
          <div>
            <span className="text-xl font-bold text-white font-mono">{osData.stats.totalHoursStudied}h</span>
            <span className="text-[10px] text-slate-400 block uppercase">Hours Logged</span>
          </div>
          <div>
            <span className="text-xl font-bold text-white font-mono">{osData.subjects.length}</span>
            <span className="text-[10px] text-slate-400 block uppercase">Subjects</span>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
          >
            Configure Study Parameters
          </button>
        </div>
      </GlassCard>
    </div>
  );

  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: Compass },
    { id: 'feedback', label: 'Daily Synthesis', icon: MessageSquare },
    { id: 'analytics', label: 'Telemetry', icon: BarChart3 },
    { id: 'customization', label: 'Appearance Studio', icon: Sliders },
    { id: 'profile', label: 'System Profile', icon: User },
  ];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${activeTheme.bg} text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white`}>
      {/* Dynamic Ambient Aurora Glow Background */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-700" 
        style={{ background: activeTheme.glowGradient }} 
      />

      {/* Global Toast Notification */}
      {notificationMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900/95 border border-indigo-400/40 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-xl text-xs font-semibold text-white animate-bounce">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          {notificationMsg}
        </div>
      )}

      {/* Rapid Add Modal */}
      <QuickAddModal 
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        onAdd={handleInjectEntity}
        subjects={osData.subjects}
      />

      {/* Global Search Dialog */}
      <GlobalSearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={osData}
      />

      {/* Onboarding Wizard */}
      <OnboardingWizard
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onSave={handleOnboardingComplete}
      />

      {/* Main Framework Container */}
      <div className="flex flex-1 relative z-10 overflow-hidden">
        {/* Floating Glass Sidebar (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-slate-950/40 backdrop-blur-2xl p-5 justify-between">
          <div className="space-y-6">
            <NexoraLogo />

            {/* Quick Action Injector button */}
            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-bold tracking-wide flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(99,102,241,0.35)] transition-all"
            >
              <Plus className="w-4 h-4" />
              Quick Command (+)
            </button>

            {/* Navigation Switchboard */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive 
                        ? 'bg-white/10 text-white border border-white/15 shadow-sm' 
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar Status */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div 
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 cursor-pointer hover:bg-white/10"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded">⌘K</span>
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>StudyOS Active</span>
              </div>
              <button 
                onClick={handleClearAllData}
                title="Wipe data"
                className="text-slate-500 hover:text-rose-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          {/* Header Bar */}
          <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-950/40 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center gap-3 md:hidden">
              <NexoraLogo size="small" showWordmark={true} />
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-slate-400">
              <span>Nexora Agency</span>
              <span>/</span>
              <span className="text-white font-semibold capitalize">{activeTab}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 md:hidden"
              >
                <Search className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsQuickAddOpen(true)}
                className="p-2 rounded-xl bg-indigo-600 text-white md:hidden"
              >
                <Plus className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const themeKeys = Object.keys(THEMES);
                  const currentIndex = themeKeys.indexOf(themeKey);
                  const nextIndex = (currentIndex + 1) % themeKeys.length;
                  setThemeKey(themeKeys[nextIndex]);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center gap-1.5"
                title="Cycle themes"
              >
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">{activeTheme.name}</span>
              </button>
            </div>
          </header>

          {/* Active View Container */}
          <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto pb-24 md:pb-8">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'feedback' && renderFeedback()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'customization' && renderCustomization()}
            {activeTab === 'profile' && renderProfile()}
          </div>
        </main>
      </div>

      {/* Floating Bottom Navigation (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-950/85 backdrop-blur-2xl border-t border-white/10 p-2 flex justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`p-2 rounded-xl flex flex-col items-center gap-1 text-[10px] ${
                isActive ? 'text-indigo-400' : 'text-slate-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}