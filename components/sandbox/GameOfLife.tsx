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
    <div className="space-y-4">
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
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
            running 
              ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20' 
              : 'bg-accent/10 text-accent hover:bg-accent/20'
          }`}
        >
          {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {running ? "Pause" : "Start"}
        </button>
        
        <button
          onClick={randomize}
          className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-muted-light hover:text-foreground transition-colors"
          title="Randomize"
        >
          <Shuffle className="w-4 h-4" />
        </button>
        
        <button
          onClick={() => {
            setGrid(createEmptyGrid());
            setRunning(false);
          }}
          className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800 text-muted-light hover:text-foreground transition-colors"
          title="Clear"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Grid */}
      <div className="w-full overflow-x-auto rounded-xl border border-border/50 bg-neutral-50/50 dark:bg-neutral-900/30 p-4 custom-scrollbar">
        <div 
          className="inline-grid" 
          style={{ gridTemplateColumns: `repeat(${NUM_COLS}, minmax(12px, 1fr))` }}
        >
          {grid.map((rows, i) =>
            rows.map((col, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => toggleCell(i, j)}
                className={`w-[12px] h-[12px] sm:w-[16px] sm:h-[16px] border border-border/20 transition-colors duration-150 ${
                  grid[i][j] ? 'bg-accent' : 'bg-transparent hover:bg-accent/20'
                }`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
