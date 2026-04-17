'use client';

import { useEffect, useRef, useState } from 'react';
import { cn, configureAssistant, getSubjectColor } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import Image from 'next/image';
import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import soundwaves from '@/constants/soundwaves.json';
import { addToSessionHistory } from '@/lib/actions/companion.actions';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
  companionId,
}: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };
    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        setMessages(prev => [{ role: message.role, content: message.transcript }, ...prev]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    };
  }, [companionId]);

  const toggleMicrophone = () => {
    const muted = vapi.isMuted();
    vapi.setMuted(!muted);
    setIsMuted(!muted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);
    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    };
    //@ts-expect-error ddd
    await vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const isActive = callStatus === CallStatus.ACTIVE;
  const isConnecting = callStatus === CallStatus.CONNECTING;
  const color = getSubjectColor(subject);

  return (
    <section className="flex flex-col h-[72vh] gap-4">
      <section className="flex gap-4 max-sm:flex-col">
        {/* ── Companion Panel ── */}
        <div className={cn('companion-section', isActive && 'active')}>
          {/* Avatar */}
          <div
            className="companion-avatar"
            style={{
              background: `radial-gradient(ellipse at center, ${color}18 0%, ${color}08 50%, transparent 70%)`,
              border: isActive ? `1px solid ${color}50` : `1px solid ${color}20`,
              boxShadow: isActive ? `0 0 60px ${color}20, inset 0 0 40px ${color}08` : 'none',
              transition: 'all 0.5s ease',
            }}
          >
            <div
              className={cn(
                'absolute transition-all duration-700',
                isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
                isConnecting && 'animate-pulse'
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={100}
                height={100}
                className="max-sm:w-14 drop-shadow-lg"
              />
            </div>
            <div
              className={cn(
                'absolute transition-all duration-700',
                isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="companion-lottie"
              />
            </div>
          </div>

          {/* Name + status */}
          <div className="flex flex-col items-center gap-1">
            <p className="font-bold text-lg" style={{ color: 'rgba(255,255,255,0.9)' }}>
              {name}
            </p>
            <p
              className="text-xs font-medium capitalize tracking-wide"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              {subject} tutor
            </p>
          </div>

          {/* Live indicator */}
          {isActive && (
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full mb-2"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <span
                className="size-2 rounded-full animate-pulse"
                style={{ background: '#22c55e', boxShadow: '0 0 8px #22c55e' }}
              />
              <span className="text-xs font-semibold" style={{ color: '#4ade80' }}>
                Live Session
              </span>
            </div>
          )}
        </div>

        {/* ── User Panel ── */}
        <div className="user-section">
          <div className="user-avatar">
            <div
              className="relative"
              style={{
                filter: isActive ? 'drop-shadow(0 0 16px rgba(168,85,247,0.4))' : 'none',
                transition: 'filter 0.5s ease',
              }}
            >
              <Image
                src={userImage}
                alt={userName}
                width={72}
                height={72}
                className="rounded-2xl"
              />
              {isActive && (
                <span
                  className="absolute inset-0 rounded-2xl animate-pulse-ring"
                  style={{ border: '2px solid rgba(168,85,247,0.5)' }}
                />
              )}
            </div>
            <p className="font-semibold text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {userName}
            </p>
          </div>

          {/* Mic button */}
          <button
            className="btn-mic"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <div
              className="size-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: isMuted ? 'rgba(239,68,68,0.15)' : 'rgba(168,85,247,0.12)',
                border: isMuted
                  ? '1px solid rgba(239,68,68,0.3)'
                  : '1px solid rgba(168,85,247,0.25)',
              }}
            >
              <Image
                src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
                alt="mic"
                width={18}
                height={18}
              />
            </div>
            <p className="text-xs max-sm:hidden" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {isMuted ? 'Unmute mic' : 'Mute mic'}
            </p>
          </button>

          {/* Start/End button */}
          <button
            className={cn(
              'rounded-2xl py-3.5 cursor-pointer transition-all w-full text-white text-sm font-semibold relative overflow-hidden',
              isConnecting && 'animate-pulse cursor-wait'
            )}
            style={
              isActive
                ? {
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#f87171',
                  }
                : {
                    background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 50%, #a855f7 100%)',
                    backgroundSize: '200% auto',
                    boxShadow: '0 0 30px rgba(168,85,247,0.4)',
                    border: '1px solid rgba(168,85,247,0.3)',
                  }
            }
            onClick={isActive ? handleDisconnect : handleCall}
          >
            {isActive ? '⬛ End Session' : isConnecting ? 'Connecting…' : '▶ Start Session'}
          </button>
        </div>
      </section>

      {/* ── Transcript ── */}
      <section className="transcript">
        {messages.length === 0 && (
          <p className="text-sm text-center mt-8 italic" style={{ color: 'rgba(255,255,255,0.2)' }}>
            Transcript will appear here once the session starts…
          </p>
        )}
        <div className="transcript-message no-scrollbar">
          {messages.map((message, index) =>
            message.role === 'assistant' ? (
              <p
                key={index}
                className="text-sm leading-relaxed animate-float-up"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                <span className="font-bold" style={{ color: '#c084fc' }}>
                  {name.split(' ')[0]}
                </span>
                {'  '}
                {message.content}
              </p>
            ) : (
              <p
                key={index}
                className="text-sm leading-relaxed animate-float-up"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                <span className="font-bold" style={{ color: '#67e8f9' }}>
                  {userName}
                </span>
                {'  '}
                {message.content}
              </p>
            )
          )}
        </div>
        <div className="transcript-fade" />
      </section>
    </section>
  );
};

export default CompanionComponent;
