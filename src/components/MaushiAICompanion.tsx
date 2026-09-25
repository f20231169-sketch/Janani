import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGES } from '../data/mockData';
import { askMaushiAI } from '../services/geminiService';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RefreshCw,
  Heart,
  ShieldAlert,
} from 'lucide-react';

interface MaushiAICompanionProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const MaushiAICompanion: React.FC<MaushiAICompanionProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState<'voice' | 'chat'>('chat');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [speechMuted, setSpeechMuted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const speakText = (text: string) => {
    if (speechMuted) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Clean markdown tags for natural speech
      const clean = text.replace(/[*_#]/g, '').slice(0, 260);
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.rate = 0.95;
      utterance.pitch = 1.05; // warm, gentle sisterly pitch
      utterance.onstart = () => setIsVoiceSpeaking(true);
      utterance.onend = () => setIsVoiceSpeaking(false);
      utterance.onerror = () => setIsVoiceSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const reply = await askMaushiAI(textToSend, { week: 16, day: 112 });
      const maushiMsg: ChatMessage = {
        id: `maushi-${Date.now()}`,
        sender: 'maushi',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, maushiMsg]);
      speakText(reply);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleToggleVoiceMode = () => {
    setMode((prev) => (prev === 'chat' ? 'voice' : 'chat'));
    if (isVoiceSpeaking) {
      window.speechSynthesis.cancel();
      setIsVoiceSpeaking(false);
    }
  };

  const handleVoiceOrbClick = () => {
    if (isListening) {
      setIsListening(false);
      handleSendMessage('How should I care for my posture while working at week 16?');
    } else {
      setIsListening(true);
      // Simulate listening for 2.5 seconds
      setTimeout(() => {
        setIsListening(false);
        handleSendMessage('What snacks can I eat in the afternoon for iron?');
      }, 2500);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-white via-white to-[#F8F4FE] rounded-3xl p-5 sm:p-6 border border-[#E2D4F9] shadow-maternal-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#E2D4F9] flex items-center justify-center text-[#54436B] shrink-0">
            <Sparkles className="w-6 h-6 text-[#54436B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#54436B]">
                Maternal Companion
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#E2F8EE] text-[#2E7D5E] text-[10px] font-bold">
                Online
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2D2426]">
              Maushi AI Voice & Chat
            </h1>
            <p className="text-xs text-[#7D6F72] mt-0.5">
              Empathetic sisterly guidance, tailored for Week 16 (Day 112).
            </p>
          </div>
        </div>

        {/* Mode Selector & Audio Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setSpeechMuted(!speechMuted)}
            className={`p-2 rounded-full border transition-colors ${
              speechMuted
                ? 'bg-[#FFF9F6] border-[#7D6F72]/20 text-[#7D6F72]'
                : 'bg-[#E2D4F9]/40 border-[#E2D4F9] text-[#54436B]'
            }`}
            title={speechMuted ? 'Voice narration muted' : 'Voice narration active'}
            aria-label="Toggle voice sound"
          >
            {speechMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="flex items-center p-1 bg-[#FFF9F6] rounded-full border border-[#7D6F72]/15">
            <button
              onClick={() => setMode('chat')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                mode === 'chat'
                  ? 'bg-white text-[#2D2426] shadow-xs'
                  : 'text-[#7D6F72] hover:text-[#2D2426]'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                mode === 'voice'
                  ? 'bg-[#54436B] text-white shadow-xs'
                  : 'text-[#7D6F72] hover:text-[#2D2426]'
              }`}
            >
              <Mic className="w-3 h-3" />
              <span>Voice</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Companion Surface */}
      {mode === 'voice' ? (
        /* VOICE COMPANION MODE */
        <div className="bg-white rounded-3xl p-8 border border-[#E2D4F9] shadow-maternal-card flex flex-col items-center justify-center min-h-[440px] text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F4FE]/50 via-white to-[#FFE5E8]/20 pointer-events-none" />

          {/* Voice Orb */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-6">
              {/* Pulsing rings */}
              <div
                className={`absolute -inset-4 rounded-full bg-[#E2D4F9]/40 blur-xl transition-all duration-700 ${
                  isVoiceSpeaking || isListening ? 'scale-125 opacity-100 animate-pulse' : 'scale-100 opacity-50'
                }`}
              />
              <div
                className={`absolute -inset-8 rounded-full bg-[#FF8C94]/20 blur-2xl transition-all duration-1000 ${
                  isVoiceSpeaking ? 'scale-150 opacity-80' : 'scale-90 opacity-20'
                }`}
              />

              <button
                onClick={handleVoiceOrbClick}
                className={`w-32 h-32 rounded-full relative z-10 flex flex-col items-center justify-center shadow-xl transition-all duration-300 ${
                  isListening
                    ? 'bg-[#FF8C94] text-white scale-105'
                    : isVoiceSpeaking
                    ? 'bg-[#54436B] text-white scale-105'
                    : 'bg-gradient-to-tr from-[#E2D4F9] to-[#FFE5E8] text-[#54436B] hover:scale-102'
                }`}
                aria-label="Tap to speak with Maushi"
              >
                {isListening ? (
                  <>
                    <Mic className="w-9 h-9 animate-bounce" />
                    <span className="text-[10px] font-bold mt-1">Listening...</span>
                  </>
                ) : isVoiceSpeaking ? (
                  <>
                    <Volume2 className="w-9 h-9 animate-pulse" />
                    <span className="text-[10px] font-bold mt-1">Speaking...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-8 h-8 mb-1" />
                    <span className="text-[11px] font-bold">Tap to Talk</span>
                  </>
                )}
              </button>
            </div>

            <h3 className="text-lg font-bold text-[#2D2426]">
              {isListening
                ? 'Maushi is listening to your question...'
                : isVoiceSpeaking
                ? 'Maushi is answering with sisterly care...'
                : 'Sisterly Voice Companion'}
            </h3>
            <p className="text-xs text-[#7D6F72] max-w-sm mt-1 leading-relaxed">
              Ask about pelvic aches, baby’s avocado size, night cramps, or morning meal ideas.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                'Is mild back ache normal at 16 weeks?',
                'What snacks help with evening acidity?',
                'When will I feel distinct kicks?',
              ].map((sample) => (
                <button
                  key={sample}
                  onClick={() => handleSendMessage(sample)}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-[#FFF9F6] border border-[#7D6F72]/15 text-[#7D6F72] hover:text-[#2D2426] hover:border-[#FF8C94]/40 transition-colors"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* CHAT COMPANION MODE */
        <div className="bg-white rounded-3xl border border-[#7D6F72]/10 shadow-maternal-card flex flex-col h-[520px] overflow-hidden">
          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {messages.map((m) => {
              const isMaushi = m.sender === 'maushi';
              return (
                <div
                  key={m.id}
                  className={`flex items-start gap-2.5 ${isMaushi ? 'justify-start' : 'justify-end'}`}
                >
                  {isMaushi && (
                    <div className="w-8 h-8 rounded-full bg-[#E2D4F9] text-[#54436B] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs shadow-xs">
                      ✨
                    </div>
                  )}

                  <div className={`max-w-[85%] sm:max-w-[75%] ${isMaushi ? 'text-left' : 'text-right'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                        isMaushi
                          ? 'bg-[#F8F4FE] text-[#2D2426] rounded-tl-sm border border-[#E2D4F9]/60'
                          : 'bg-[#FF8C94] text-white rounded-tr-sm shadow-xs'
                      }`}
                    >
                      <p className="whitespace-pre-line">{m.text}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#7D6F72]">
                      <span>{m.timestamp}</span>
                      {isMaushi && !speechMuted && (
                        <button
                          onClick={() => speakText(m.text)}
                          className="hover:text-[#FF8C94] transition-colors flex items-center gap-0.5"
                          title="Listen to audio"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Replay</span>
                        </button>
                      )}
                    </div>

                    {/* Suggested follow-up chips */}
                    {m.suggestedActions && m.suggestedActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2.5">
                        {m.suggestedActions.map((s, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSendMessage(s)}
                            className="text-[11px] px-3 py-1 rounded-full bg-white border border-[#E2D4F9] text-[#54436B] hover:bg-[#E2D4F9]/30 transition-all font-medium"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-[#7D6F72] italic pl-2">
                <div className="w-2 h-2 rounded-full bg-[#E2D4F9] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#FF8C94] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#A8E6CF] animate-bounce [animation-delay:0.4s]" />
                <span>Maushi is writing with care...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Strip */}
          <div className="px-4 py-2 bg-[#FFF9F6] border-t border-[#7D6F72]/10 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold text-[#7D6F72] uppercase tracking-wider shrink-0">
              Quick:
            </span>
            {[
              'Is mild lower back ache normal at 16 weeks?',
              'What snacks help with sudden nausea?',
              'Can I do gentle pelvic stretches today?',
              'When will I feel distinct kicks?',
            ].map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-white border border-[#7D6F72]/15 text-[#7D6F72] hover:text-[#2D2426] hover:border-[#FF8C94] transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#7D6F72]/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Maushi about symptoms, nutrition, or week 16..."
                className="flex-1 px-4 py-2.5 rounded-full border border-[#7D6F72]/20 text-xs focus:outline-none focus:ring-2 focus:ring-[#FF8C94]/40"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-full bg-[#FF8C94] text-white hover:bg-[#FF737D] disabled:opacity-50 active:scale-95 transition-all shadow-xs shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Medical Safety Disclaimer Footer */}
      <div className="flex items-start gap-2 p-3 rounded-2xl bg-[#FFF9F6] border border-[#7D6F72]/10 text-[11px] text-[#7D6F72] leading-relaxed">
        <ShieldAlert className="w-4 h-4 text-[#FF8C94] shrink-0 mt-0.5" />
        <p>
          <strong>Sisterly Care Disclaimer:</strong> Maushi AI provides empathetic guidance and evidence-based lifestyle suggestions. It is not a substitute for clinical diagnostics. For persistent pain, bleeding, or acute distress, contact Dr. Radhika Sharma directly.
        </p>
      </div>
    </div>
  );
};
