'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, Globe2 } from 'lucide-react';

interface SyncBadgeProps {
  isLiveSynced: boolean;
  lastSyncedAt: string;
  onRefresh?: () => void;
}

export const SyncBadge: React.FC<SyncBadgeProps> = ({ isLiveSynced, lastSyncedAt, onRefresh }) => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleManualSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    if (onRefresh) {
      await onRefresh();
    }
    setTimeout(() => setIsSyncing(false), 1200);
  };

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-900/90 border border-cyan-400/30 backdrop-blur-md text-[11px] font-mono shadow-[0_0_15px_rgba(0,245,200,0.1)]">
      <div className="flex items-center gap-1.5 text-cyan-400">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <Globe2 className="w-3.5 h-3.5" />
        <span className="font-semibold text-white/90">tkwebsolutions.in</span>
      </div>

      <span className="text-white/30">•</span>

      <span className="text-white/60 hidden sm:inline">
        {isLiveSynced ? 'Live Sync Active' : 'Verified Cache'}
      </span>

      <button
        onClick={handleManualSync}
        disabled={isSyncing}
        className="text-cyan-400 hover:text-cyan-300 hover:rotate-180 transition-all duration-500 p-0.5"
        title="Refresh live data from tkwebsolutions.in"
      >
        <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
};
