import { useEffect, useRef, useState } from "react";

/**
 * SnakeGame
 * --------
 * A generic playable Snake game that runs directly on top of the portfolio.
 * There is no game window, board, modal or overlay panel: the snake moves
 * through the real viewport.
 *
 * Key decisions:
 *  - Movement and rendering happen on a fixed, <canvas> that covers the
 *    viewport. It sits ABOVE section backgrounds (so the snake is visible)
 *    but BELOW the navbar, and has pointer-events: none so it never blocks
 *    clicks or real navigation.
 *  - Obstacles are NOT hardcoded. They are derived from the ACTUAL rendered
 *    page by sampling `document.elementFromPoint` over a grid and treating
 *    any non-layout element (headings, paragraphs, links, buttons, images,
 *    list items, ...) as solid "text/content". This is recomputed on scroll
 *    and resize so the snake genuinely navigates around the live content.
 *  - Controls: WASD or arrow keys. Arrow keys / space are prevented from
 *    scrolling the page while the game is active. Press R to restart after
 *    game over.
 *  - The interval-based game loop and all event listeners are torn down on
 *    unmount (Game Mode OFF), so no resources leak.
 *  - Reduced-motion users get a slower tick; nothing heavier than that.
 */

const CELL = 16; // pixel size of one grid cell / snake segment
const SNAKE_GREEN = "#3ca55c";
const SNAKE_DARK = "#2e7d43";
const SNAKE_EYE = "#101916";
const FOOD_RED = "#dd4b4b";
const TICK_MS = 92;
const TICK_MS_SLOW = 150;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Build a blocked-cell grid from the real DOM, sampled per cell centre. */
function buildObstacleGrid() {
  const cw = window.innerWidth;
  const ch = window.innerHeight;
  const cols = Math.max(1, Math.floor(cw / CELL));
  const rows = Math.max(1, Math.floor(ch / CELL));
  const grid = new Uint8Array(cols * rows);

  // Layout/container tags are transparent to the snake. Anything else that
  // renders on top (text, links, buttons, images, controls) is an obstacle.
  const transparent = new Set([
    "HTML", "BODY", "MAIN", "SECTION", "DIV", "HEADER", "FOOTER",
    "ARTICLE", "ASIDE", "NAV", "UL", "OL", "CANVAS", "SVG", "FORM",
  ]);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * CELL + CELL / 2;
      const y = r * CELL + CELL / 2;
      if (x > cw || y > ch) continue;
      // elementFromPoint ignores pointer-events:none layers (our canvas and
      // the old ambient wrapper), so this returns the real underlying content.
      const el = document.elementFromPoint(x, y);
      if (el && !transparent.has(el.tagName)) {
        grid[r * cols + c] = 1;
      }
    }
  }
  return { grid, cols, rows };
}

const BEST_KEY = "ansh-snake-best";

function readBest() {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}

function writeBest(v) {
  try {
    window.localStorage.setItem(BEST_KEY, String(v));
  } catch {
    /* localStorage unavailable */
  }
}

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const obstaclesRef = useRef(null);
  const controlsRef = useRef(null);
  const [ui, setUi] = useState({ score: 0, best: 0, over: false, paused: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let tick = null;
    let raf = null;
    let recomputePending = false;

    const reduced = prefersReducedMotion();

    const world = { cols: 0, rows: 0, snake: [], dir: { x: 1, y: 0 }, nextDir: null, food: null, score: 0, best: readBest(), over: false, paused: false, started: false, queued: [] };

    const cellW = () => Math.floor(window.innerWidth / CELL);
    const cellH = () => Math.floor(window.innerHeight / CELL);

    function setPaused(paused) {
      world.paused = paused;
      setUi((u) => ({ ...u, paused }));
      draw();
    }

    function resetGame() {
      world.cols = cellW();
      world.rows = cellH();
      const startC = Math.floor(world.cols / 2);
      const startR = Math.floor(world.rows * 0.6);
      world.snake = [];
      for (let i = 0; i < 5; i++) world.snake.push({ x: startC - i, y: startR });
      world.dir = { x: 1, y: 0 };
      world.nextDir = null;
      world.queued = [];
      world.score = 0;
      world.over = false;
      world.started = false;
      world.paused = false;
      setUi({ score: 0, best: world.best, over: false, paused: false });
      spawnFood();
      draw();
    }

    function cellBlocked(x, y) {
      if (x < 0 || y < 0 || x >= world.cols || y >= world.rows) return true;
      const o = obstaclesRef.current;
      if (o && o.grid[y * o.cols + x]) return true;
      return false;
    }

    function spawnFood() {
      const free = [];
      const occupied = new Set();
      for (const s of world.snake) occupied.add(s.y * world.cols + s.x);
      // Limit the candidate area to the viewport to keep the scan cheap.
      const limit = world.cols * world.rows;
      if (limit < 20000) {
        for (let i = 0; i < limit; i++) {
          if (!occupied.has(i)) {
            const x = i % world.cols;
            const y = Math.floor(i / world.cols);
            if (!cellBlocked(x, y)) free.push({ x, y });
          }
        }
      }
      if (free.length && Math.random() < 0.98) {
        world.food = free[Math.floor(Math.random() * free.length)];
      } else {
        // Fallback: any unoccupied cell (content may be dense).
        world.food = null;
        for (let i = 0; i < limit; i++) {
          if (!occupied.has(i)) {
            world.food = { x: i % world.cols, y: Math.floor(i / world.cols) };
            break;
          }
        }
      }
      if (!world.food) world.food = { x: 1, y: 1 };
    }

    function step() {
      if (world.over || world.paused) return;

      // Apply a queued turn (only one step ahead).
      if (world.queued.length) {
        const want = world.queued.shift();
        const rev = want.x === -world.dir.x && want.y === -world.dir.y;
        if (!rev) world.dir = want;
      }

      const head = world.snake[0];
      const nx = head.x + world.dir.x;
      const ny = head.y + world.dir.y;

      // Boundary collision.
      if (nx < 0 || ny < 0 || nx >= world.cols || ny >= world.rows) return gameOver();

      // Self collision.
      for (const s of world.snake) if (s.x === nx && s.y === ny) return gameOver();

      // Content collision (real rendered text / controls).
      if (cellBlocked(nx, ny)) return gameOver();

      const ate = world.food && world.food.x === nx && world.food.y === ny;

      world.snake.unshift({ x: nx, y: ny });
      if (ate) {
        world.score += 1;
        if (world.score > world.best) {
          world.best = world.score;
          writeBest(world.best);
        }
        setUi((u) => ({ score: world.score, best: world.best, over: u.over, paused: u.paused }));
        spawnFood();
      } else {
        world.snake.pop();
      }

      draw();
    }

    function gameOver() {
      world.over = true;
      if (world.score > world.best) {
        world.best = world.score;
        writeBest(world.best);
      }
      setUi({ score: world.score, best: world.best, over: true, paused: false });
      draw();
    }

    function draw() {
      const w = world.cols * CELL;
      const h = world.rows * CELL;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.clearRect(0, 0, w, h);

      // Food.
      if (world.food) {
        ctx.fillStyle = FOOD_RED;
        ctx.fillRect(world.food.x * CELL + 2, world.food.y * CELL + 2, CELL - 4, CELL - 4);
        ctx.fillStyle = "#f5b9b9";
        ctx.fillRect(world.food.x * CELL + 4, world.food.y * CELL + 4, CELL - 8, CELL - 8);
        ctx.fillStyle = SNAKE_GREEN;
        ctx.fillRect(world.food.x * CELL + 5, world.food.y * CELL - 3, 3, 3);
      }

      // Snake body.
      world.snake.forEach((s, i) => {
        ctx.fillStyle = i % 2 === 0 ? SNAKE_GREEN : SNAKE_DARK;
        ctx.fillRect(s.x * CELL, s.y * CELL, CELL, CELL);
      });

      // Head + eye.
      const head = world.snake[0];
      if (head) {
        ctx.fillStyle = "#2e8b4f";
        ctx.fillRect(head.x * CELL, head.y * CELL, CELL, CELL);
        ctx.fillStyle = SNAKE_EYE;
        ctx.fillRect(head.x * CELL + 9, head.y * CELL + 3, 3, 3);
        ctx.fillStyle = FOOD_RED;
        ctx.fillRect(head.x * CELL + CELL - 3, head.y * CELL + 5, 2, 2); // tongue
      }
    }

    function recomputeObstacles() {
      const newCols = cellW();
      const newRows = cellH();
      const dimsChanged = newCols !== world.cols || newRows !== world.rows;
      if (dimsChanged) {
        // Adapt the world to the new viewport.
        world.cols = newCols;
        world.rows = newRows;
      }
      obstaclesRef.current = buildObstacleGrid();
      if (dimsChanged) {
        // Clamp the snake back into bounds and drop out-of-bounds food.
        world.snake = world.snake.map((s) => ({
          x: Math.min(s.x, world.cols - 1),
          y: Math.min(s.y, world.rows - 1),
        }));
        if (world.food && (world.food.x >= world.cols || world.food.y >= world.rows)) {
          spawnFood();
        }
      }
      // If the head now sits on content (layout/scroll changed), stop.
      if (world.snake.length && cellBlocked(world.snake[0].x, world.snake[0].y)) {
        gameOver();
      } else if (world.food && cellBlocked(world.food.x, world.food.y)) {
        spawnFood();
      }
      draw();
    }

    function requestRecompute() {
      if (recomputePending) return;
      recomputePending = true;
      raf = requestAnimationFrame(() => {
        recomputePending = false;
        recomputeObstacles();
      });
    }

    function queueDir(dir) {
      if (world.over || world.paused) return;
      world.started = true;
      const last = world.queued.length ? world.queued[world.queued.length - 1] : world.dir;
      const rev = dir.x === -last.x && dir.y === -last.y;
      if (!rev && world.queued.length < 2) world.queued.push(dir);
    }

    function onKeyDown(e) {
      const k = e.key;
      if (k === "r" || k === "R") {
        e.preventDefault();
        resetGame();
        return;
      }
      if (k === "p" || k === "P") {
        e.preventDefault();
        if (world.over) return;
        setPaused(!world.paused);
        return;
      }
      const map = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 },
        W: { x: 0, y: -1 },
        S: { x: 0, y: 1 },
        A: { x: -1, y: 0 },
        D: { x: 1, y: 0 },
      };
      const dir = map[k];
      if (dir) {
        e.preventDefault(); // stop the page from scrolling on arrow keys
        queueDir(dir);
      }
    }

    function onResize() {
      requestRecompute();
    }

    resetGame();
    recomputeObstacles();

    // Expose controls for the touch D-pad buttons.
    controlsRef.current = {
      queueDir,
      togglePause: () => setPaused(!world.paused),
      restart: resetGame,
    };

    const tickMs = reduced ? TICK_MS_SLOW : TICK_MS;
    tick = setInterval(step, tickMs);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, { passive: true });

    return () => {
      clearInterval(tick);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize);
      controlsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        id="snake-canvas"
        className="snake-canvas"
        aria-hidden="true"
      />

      {/* Discreet score / game-over feedback (no separate window). */}
      <div
        className="snake-hud"
        aria-live="polite"
        role="status"
        aria-label={`Snake score ${ui.score}, best ${ui.best}${ui.over ? ", game over" : ""}${ui.paused ? ", paused" : ""}`}
      >
        <span className="snake-hud-dot" aria-hidden="true" />
        {ui.over ? (
          <span>
            Game over · score {ui.score} · press <kbd>R</kbd> to restart
          </span>
        ) : ui.paused ? (
          <span>Paused · press <kbd>P</kbd> to play</span>
        ) : (
          <span>
            Score {ui.score} <span className="opacity-60">· best {ui.best}</span>
          </span>
        )}
      </div>

      {/* Mobile touch D-pad (shown only on coarse-pointer devices). */}
      <div
        className="snake-dpad"
        aria-hidden="true"
        onPointerDown={(e) => e.preventDefault()}
      >
        <button
          type="button"
          className="snake-dpad-btn snake-dpad-up"
          onPointerDown={() => controlsRef.current?.queueDir({ x: 0, y: -1 })}
          aria-label="Up"
        >
          ↑
        </button>
        <button
          type="button"
          className="snake-dpad-btn snake-dpad-left"
          onPointerDown={() => controlsRef.current?.queueDir({ x: -1, y: 0 })}
          aria-label="Left"
        >
          ←
        </button>
        <button
          type="button"
          className="snake-dpad-btn snake-dpad-down"
          onPointerDown={() => controlsRef.current?.queueDir({ x: 0, y: 1 })}
          aria-label="Down"
        >
          ↓
        </button>
        <button
          type="button"
          className="snake-dpad-btn snake-dpad-right"
          onPointerDown={() => controlsRef.current?.queueDir({ x: 1, y: 0 })}
          aria-label="Right"
        >
          →
        </button>
      </div>
    </>
  );
}
