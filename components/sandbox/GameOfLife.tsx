"use client";

import { useState, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, Shuffle } from "lucide-react";

const NUM_ROWS = 25;
const NUM_COLS = 50;

const createEmptyGrid = () => {
  return Array.from({ length: NUM_ROWS }).map(() => Array.from({ length: NUM_COLS }).fill(0));
};

export default function GameOfLife() {
  const [grid, setGrid] = useState(() => {
    return createEmptyGrid();
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      // Create new grid based on rules
      const newGrid = createEmptyGrid();
      for (let i = 0; i < NUM_ROWS; i++) {
        for (let j = 0; j < NUM_COLS; j++) {
          let neighbors = 0;
          // Count live neighbors
          for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
              if (x === 0 && y === 0) continue;
              const newI = i + x;
              const newJ = j + y;
              if (newI >= 0 && newI < NUM_ROWS && newJ >= 0 && newJ < NUM_COLS) {
                neighbors += g[newI][newJ] as number;
              }
            }
          }

          if (g[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = 0;
          } else if (g[i][j] === 0 && neighbors === 3) {
            newGrid[i][j] = 1;
          } else {
            newGrid[i][j] = g[i][j];
          }
        }
      }
      return newGrid;
    });

    setTimeout(runSimulation, 100);
  }, []);

  const toggleCell = (i: number, j: number) => {
    const newGrid = [...grid];
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  const randomize = () => {
    const newGrid = createEmptyGrid();
    for (let i = 0; i < NUM_ROWS; i++) {
      for (let j = 0; j < NUM_COLS; j++) {
        newGrid[i][j] = Math.random() > 0.75 ? 1 : 0;
      }
    }
    setGrid(newGrid);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform hover:scale-105 border-2 shadow-sm ${
            running 
              ? 'bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 rotate-1 hover:rotate-0' 
              : 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800 -rotate-1 hover:rotate-0'
          }`}
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Start Kolam"}
        </button>
        
        <button
          onClick={randomize}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-2 border-border hover:border-orange-400 hover:text-orange-600 dark:hover:text-orange-400 transition-all transform hover:-rotate-2 hover:scale-105 shadow-sm"
          title="Randomize"
        >
          <Shuffle className="w-4 h-4" />
          Scatter
        </button>
        
        <button
          onClick={() => {
            setGrid(createEmptyGrid());
            setRunning(false);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-2 border-border hover:border-rose-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all transform hover:rotate-2 hover:scale-105 shadow-sm"
          title="Clear"
        >
          <RotateCcw className="w-4 h-4" />
          Wipe Clean
        </button>
      </div>

      {/* Grid */}
      <div className="w-full overflow-x-auto rounded-2xl border-4 border-dashed border-orange-200 dark:border-orange-900/50 bg-neutral-50 dark:bg-neutral-950 p-6 custom-scrollbar flex justify-center items-center">
        <div 
          className="inline-grid gap-0.5 sm:gap-1" 
          style={{ gridTemplateColumns: `repeat(${NUM_COLS}, minmax(12px, 1fr))` }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => toggleCell(i, j)}
                className={`w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] rounded-full transition-all duration-300 cursor-pointer ${
                  grid[i][j] 
                    ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] scale-110' 
                    : 'bg-orange-100 dark:bg-orange-900/30 hover:bg-orange-200 dark:hover:bg-orange-800/50 scale-100'
                }`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
