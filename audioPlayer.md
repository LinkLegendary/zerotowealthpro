 ── THIN AUDIO PLAYER ──
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2.5">
            <div className="flex items-center gap-3">

              {/* Icon + status */}
              <div className="flex items-center gap-2 min-w-fit">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${audioState === 'playing' ? 'bg-green-400 animate-pulse' : audioState === 'paused' ? 'bg-yellow-400' : 'bg-white/20'}`}>
                  🎧
                </div>
                <p className="text-white text-xs font-medium hidden sm:block">
                  {audioState === 'playing' ? 'Playing...' :
                   audioState === 'paused'  ? 'Paused' : 'Listen'}
                </p>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-white/20" />

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Stop */}
                <button
                  onClick={handleStop}
                  disabled={audioState === 'idle'}
                  title="Stop"
                  className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                >
                  ⏹
                </button>

                {/* Play / Pause */}
                <button
                  onClick={audioState === 'playing' ? handlePause : handlePlay}
                  title={audioState === 'playing' ? 'Pause' : 'Play'}
                  className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1F4E78] text-xs font-bold shadow hover:scale-105 active:scale-95 transition-all"
                >
                  {audioState === 'playing' ? '⏸' : '▶'}
                </button>

                {/* Restart */}
                <button
                  onClick={handleRestart}
                  disabled={audioState === 'idle'}
                  title="Restart"
                  className="w-6 h-6 flex items-center justify-center text-white/70 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                >
                  🔄
                </button>
              </div>

              {/* Divider */}
              <div className="w-px h-4 bg-white/20" />

              {/* Progress bar */}
              <div className="flex-1 bg-white/20 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Speed buttons */}
              <div className="flex items-center gap-0.5 ml-1">
                {[0.75, 1, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSpeed(s)}
                    className={`px-1.5 py-0.5 rounded text-xs transition-all ${currentSpeed === s ? 'bg-white text-[#1F4E78] font-bold' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

            </div>
          </div>

