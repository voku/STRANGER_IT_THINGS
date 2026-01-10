import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';

interface TerminalProps {
  history: LogEntry[];
}

const Terminal: React.FC<TerminalProps> = ({ history }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // If user is within 50px of the bottom, enable auto-scroll
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      shouldAutoScrollRef.current = isAtBottom;
    }
  };

  useEffect(() => {
    if (shouldAutoScrollRef.current && bottomRef.current?.scrollIntoView) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-grow bg-[#051105] border-4 border-green-900/50 p-6 font-vt323 text-2xl overflow-y-auto h-80 md:h-96 shadow-[0_0_20px_rgba(20,83,45,0.4)] rounded-lg mb-6 custom-scrollbar relative"
    >
      {/* Phosphor Glow Overlay */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] z-10"></div>
      
      {history.length === 0 && (
          <div className="text-green-800 text-center mt-10 animate-pulse">Initializing System Link...</div>
      )}
      <div className="relative z-0">
        {history.map((log) => (
            <div key={log.id} className="mb-4 leading-relaxed border-b border-green-900/30 pb-2 last:border-0">
            <div className="flex items-baseline mb-1">
                <span className="text-green-700 text-base font-mono mr-3">[{log.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}]</span>
                
                {log.speaker === 'GM' && <span className="text-purple-400 font-bold uppercase tracking-wider text-sm glow">Dungeon Master</span>}
                {log.speaker === 'PLAYER' && <span className="text-blue-400 font-bold uppercase tracking-wider text-sm glow">You</span>}
                {log.speaker === 'SYSTEM' && <span className="text-red-500 font-bold uppercase tracking-wider text-sm glow">System</span>}
            </div>
            
            <div className={`pl-0 ${
                log.speaker === 'GM' ? 'text-purple-200' : 
                log.speaker === 'PLAYER' ? 'text-blue-200 italic' : 'text-red-300'
            }`}>
                {log.text}
            </div>
            </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;