import React from 'react';

interface LifecycleDiagramProps {
  activePath: 'INCIDENT' | 'REQUEST' | 'CHANGE' | null;
  className?: string;
}

const LifecycleDiagram: React.FC<LifecycleDiagramProps> = ({ activePath, className = '' }) => {
  const isInc = activePath === 'INCIDENT';
  const isReq = activePath === 'REQUEST';
  const isChg = activePath === 'CHANGE';

  // Helper for conditional classes
  const getPathClass = (active: boolean, color: 'red' | 'blue' | 'purple') => `
    transition-all duration-1000 ease-in-out fill-none stroke-[4px]
    ${active 
        ? (color === 'red' ? 'stroke-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,1)]' 
        : color === 'blue' ? 'stroke-blue-400 filter drop-shadow-[0_0_8px_rgba(96,165,250,1)]'
        : 'stroke-purple-400 filter drop-shadow-[0_0_8px_rgba(192,132,252,1)]') 
        : 'stroke-gray-800 opacity-30'}
  `;

  const getNodeClass = (active: boolean, color: 'red' | 'blue' | 'purple') => `
    transition-all duration-500
    ${active 
        ? (color === 'red' ? 'fill-red-900/80 stroke-red-500' 
        : color === 'blue' ? 'fill-blue-900/80 stroke-blue-400'
        : 'fill-purple-900/80 stroke-purple-400') 
        : 'fill-gray-900 stroke-gray-700'}
    stroke-2
  `;

  const getTextClass = (active: boolean) => `
    font-vt323 text-lg uppercase transition-colors duration-500
    ${active ? 'fill-white font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' : 'fill-gray-600'}
  `;

  return (
    <div className={`w-full bg-[#050505] rounded p-6 overflow-hidden ${className}`}>
      <svg viewBox="0 0 800 350" className="w-full h-auto" role="img" aria-label="ITIL Workflow Diagram showing paths for Incident, Change, and Request management">
        <title>IT Service Management Workflow Simulation</title>
        <defs>
          <marker id="arrow-inc" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="#ef4444" />
          </marker>
          <marker id="arrow-req" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="#60a5fa" />
          </marker>
          <marker id="arrow-chg" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="#c084fc" />
          </marker>
          
          <filter id="glow">
             <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
             <feMerge>
                 <feMergeNode in="coloredBlur"/>
                 <feMergeNode in="SourceGraphic"/>
             </feMerge>
          </filter>
        </defs>

        {/* --- COMMON START --- */}
        <g>
            <rect x="350" y="10" width="100" height="45" rx="4" className="fill-gray-800 stroke-white stroke-2" />
            <text x="400" y="38" textAnchor="middle" className="font-press-start text-xs fill-white">TICKET</text>
            
            {/* Split Line */}
            <path d="M400,55 L400,80" className="stroke-white stroke-2 fill-none" />
            
            {/* Paths Split */}
            {/* Incident (Left) */}
            <path d="M400,80 L150,80 L150,110" className={getPathClass(isInc, 'red')} markerEnd={isInc ? "url(#arrow-inc)" : ""} />
            {/* Change (Middle) */}
            <path d="M400,80 L400,110" className={getPathClass(isChg, 'purple')} markerEnd={isChg ? "url(#arrow-chg)" : ""} />
            {/* Request (Right) */}
            <path d="M400,80 L650,80 L650,110" className={getPathClass(isReq, 'blue')} markerEnd={isReq ? "url(#arrow-req)" : ""} />

            {/* Packet Animation (Start) */}
            {(isInc || isReq || isChg) && (
                 <circle r="4" fill="white">
                    <animateMotion dur="0.5s" repeatCount="1" path={`M400,55 L400,80 ${isInc ? 'L150,80 L150,110' : isReq ? 'L650,80 L650,110' : 'L400,110'}`} />
                 </circle>
            )}
        </g>

        {/* --- LEFT SIDE: INCIDENT PATH --- */}
        <g className="transition-opacity duration-500">
            <rect x="100" y="110" width="100" height="60" rx="6" className={getNodeClass(isInc, 'red')} filter={isInc ? "url(#glow)" : ""} />
            <text x="150" y="135" textAnchor="middle" className={getTextClass(isInc)}>FEHLER / BUG</text>
            <text x="150" y="155" textAnchor="middle" className="font-vt323 text-sm fill-gray-400">(Kaputt)</text>
            
            <path d="M150,170 L150,220" className={getPathClass(isInc, 'red')} markerEnd={isInc ? "url(#arrow-inc)" : ""} />
            {isInc && <circle r="3" fill="#ef4444"><animateMotion dur="1s" repeatCount="indefinite" path="M150,170 L150,220" /></circle>}
            
            <rect x="100" y="220" width="100" height="60" rx="6" className={getNodeClass(isInc, 'red')} />
            <text x="150" y="245" textAnchor="middle" className={getTextClass(isInc)}>REPARATUR</text>
            <text x="150" y="265" textAnchor="middle" className="font-vt323 text-sm fill-gray-400">Admin Fix</text>
            
            <path d="M150,280 L150,310" className={getPathClass(isInc, 'red')} />
            
            <circle cx="150" cy="325" r="30" className={getNodeClass(isInc, 'red')} />
            <text x="150" y="320" textAnchor="middle" className="font-press-start text-[10px] fill-white">SLA</text>
            <text x="150" y="340" textAnchor="middle" className={getTextClass(isInc)}>4h</text>
        </g>

        {/* --- MIDDLE: CHANGE PATH --- */}
        <g className="transition-opacity duration-500">
            <rect x="350" y="110" width="100" height="60" rx="6" className={getNodeClass(isChg, 'purple')} filter={isChg ? "url(#glow)" : ""} />
            <text x="400" y="135" textAnchor="middle" className={getTextClass(isChg)}>NEUER SCOPE</text>
            <text x="400" y="155" textAnchor="middle" className="font-vt323 text-sm fill-gray-400">(Erweiterung)</text>

            <path d="M400,170 L400,220" className={getPathClass(isChg, 'purple')} markerEnd={isChg ? "url(#arrow-chg)" : ""} />
            {isChg && <circle r="3" fill="#c084fc"><animateMotion dur="1s" repeatCount="indefinite" path="M400,170 L400,220" /></circle>}

            <rect x="350" y="220" width="100" height="60" rx="6" className={getNodeClass(isChg, 'purple')} />
            <text x="400" y="245" textAnchor="middle" className={getTextClass(isChg)}>ENTWICKLUNG</text>
            <text x="400" y="265" textAnchor="middle" className="font-vt323 text-sm fill-gray-400">CAB / Dev</text>

            <path d="M400,280 L400,310" className={getPathClass(isChg, 'purple')} />

            <circle cx="400" cy="325" r="30" className={getNodeClass(isChg, 'purple')} />
            <text x="400" y="320" textAnchor="middle" className="font-press-start text-[10px] fill-white">SLA</text>
            <text x="400" y="340" textAnchor="middle" className={getTextClass(isChg)}>~2w</text>
        </g>

        {/* --- RIGHT SIDE: REQUEST PATH --- */}
        <g>
            <rect x="600" y="110" width="100" height="60" rx="6" className={getNodeClass(isReq, 'blue')} filter={isReq ? "url(#glow)" : ""} />
            <text x="650" y="135" textAnchor="middle" className={getTextClass(isReq)}>FÄHIGKEIT</text>
            <text x="650" y="155" textAnchor="middle" className="font-vt323 text-sm fill-gray-400">(Bestellung)</text>

            <path d="M650,170 L650,220" className={getPathClass(isReq, 'blue')} markerEnd={isReq ? "url(#arrow-req)" : ""} />
            {isReq && <circle r="3" fill="#60a5fa"><animateMotion dur="1s" repeatCount="indefinite" path="M650,170 L650,220" /></circle>}

            <rect x="600" y="220" width="100" height="60" rx="6" className={getNodeClass(isReq, 'blue')} />
            <text x="650" y="245" textAnchor="middle" className={getTextClass(isReq)}>STANDARD</text>
            <text x="650" y="265" textAnchor="middle" className="font-vt323 text-sm fill-gray-400">Genehmigung</text>

            <path d="M650,280 L650,310" className={getPathClass(isReq, 'blue')} />

            <circle cx="650" cy="325" r="30" className={getNodeClass(isReq, 'blue')} />
            <text x="650" y="320" textAnchor="middle" className="font-press-start text-[10px] fill-white">SLA</text>
            <text x="650" y="340" textAnchor="middle" className={getTextClass(isReq)}>3d</text>
        </g>

      </svg>
    </div>
  );
};

export default LifecycleDiagram;