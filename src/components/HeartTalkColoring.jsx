import { useEffect, useRef, useState } from 'react';

export default function PlayGamesHub() {
  const [activeGame, setActiveGame] = useState('home');

  return (
    <div className="joy-hub-container">
      <style>{styles}</style>
      
      {/* HEADER */}
      <div className="joy-hub-header">
        <h1 className="joy-hub-title">
          <span className="joy-hub-title-accent">JOY HUB</span>  🎮
        </h1>
        <p className="joy-hub-subtitle">Fun games to relax and enjoy!</p>
      </div>

      {/* HOME - GAME SELECTION */}
      {activeGame === 'home' && (
        <div className="joy-hub-grid">
          <div className="joy-hub-card" onClick={() => setActiveGame('memory')}>
            <div className="joy-hub-card-icon">🎴</div>
            <h2 className="joy-hub-card-title">Memory Match</h2>
            <p className="joy-hub-card-desc">Find all the matching pairs!</p>
          </div>

          <div className="joy-hub-card" onClick={() => setActiveGame('coloring')}>
            <div className="joy-hub-card-icon">🎨</div>
            <h2 className="joy-hub-card-title">Color & Heal</h2>
            <p className="joy-hub-card-desc">Draw and decorate with colors</p>
          </div>
        </div>
      )}

      {/* MEMORY GAME */}
      {activeGame === 'memory' && (
        <div className="joy-hub-page-content">
          <button className="joy-hub-back-btn" onClick={() => setActiveGame('home')}>← Back to Hub</button>
          <MemoryGame />
        </div>
      )}

      {/* COLORING GAME */}
      {activeGame === 'coloring' && (
        <div className="joy-hub-page-content">
          <button className="joy-hub-back-btn" onClick={() => setActiveGame('home')}>← Back to Hub</button>
          <ColoringGame />
        </div>
      )}
    </div>
  );
}

/* ==================== MEMORY GAME ==================== */
function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  const emojis = ['🌸', '🦋', '🌈', '⭐', '🍓', '🎀', '💝', '🌺'];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, matched: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(index)) {
      return;
    }

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      
      if (cards[first].emoji === cards[second].emoji) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        
        if (newMatched.length === cards.length) {
          setTimeout(() => setGameWon(true), 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="memory-card">
      <h1 className="memory-title">🎴 Memory Match</h1>
      <p className="memory-subtitle">Find all the matching pairs!</p>

      <div className="memory-stats-bar">
        <div className="memory-stat-box">
          <span className="memory-stat-label">Moves</span>
          <span className="memory-stat-value">{moves}</span>
        </div>
        <div className="memory-stat-box">
          <span className="memory-stat-label">Matched</span>
          <span className="memory-stat-value">{matched.length / 2} / {emojis.length}</span>
        </div>
      </div>

      <div className="memory-grid">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <div
              key={card.id}
              className={`memory-tile ${isFlipped ? 'flipped' : ''}`}
              onClick={() => handleCardClick(index)}
            >
              {isFlipped ? (
                <span className="memory-tile-emoji">{card.emoji}</span>
              ) : (
                <span className="memory-tile-back">?</span>
              )}
            </div>
          );
        })}
      </div>

      <button className="memory-reset-btn" onClick={initializeGame}>
        🔄 New Game
      </button>

      {gameWon && (
        <div className="memory-win-modal">
          <div className="memory-win-content">
            <h2 className="memory-win-title">🎉 Congratulations! 🎉</h2>
            <p className="memory-win-text">You won in {moves} moves!</p>
            <button className="memory-win-btn" onClick={initializeGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==================== COLORING GAME ==================== */
function ColoringGame() {
  const canvasRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('#FFB7C5');
  const [brushSize, setBrushSize] = useState(15);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [stickersOnCanvas, setStickersOnCanvas] = useState([]);

  const colorPalette = [
    '#FFB7C5', '#FFD3B6', '#FFE9B0', '#F7FFC9', '#A8E6CF', '#ACE7FF', '#B8B4E3'
  ];

  const stickers = ['🌸', '❤️', '⭐', '✨', '🍓', '🦄'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stickersOnCanvas.forEach(({ x, y, sticker }) => {
      ctx.font = '40px serif';
      ctx.fillText(sticker, x, y);
    });
  }, [stickersOnCanvas]);

  const startDrawing = (e) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing || selectedSticker) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
  };

  const placeSticker = (e) => {
    if (!selectedSticker) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    setStickersOnCanvas([...stickersOnCanvas, { x, y, sticker: selectedSticker }]);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    if (selectedSticker) {
      placeSticker(touch);
    } else {
      setIsDrawing(true);
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (touch.clientX - rect.left) * scaleX;
      const y = (touch.clientY - rect.top) * scaleY;
      
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = selectedColor;
      ctx.beginPath();
      ctx.arc(x, y, brushSize, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const handleTouchMove = (e) => {
    if (!isDrawing || selectedSticker) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (touch.clientX - rect.left) * scaleX;
    const y = (touch.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = selectedColor;
    ctx.beginPath();
    ctx.arc(x, y, brushSize, 0, Math.PI * 2);
    ctx.fill();
    
    if (e.cancelable) e.preventDefault();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff7fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setStickersOnCanvas([]);
  };

  return (
    <div className="coloring-wrapper">
      <h1 className="coloring-title">🎀 Color & Heal 🎨</h1>

      <div className="coloring-container">
        {/* LEFT - Canvas */}
        <div className="coloring-canvas-box">
          <canvas
            ref={canvasRef}
            width={420}
            height={360}
            className="coloring-canvas"
            onMouseDown={selectedSticker ? placeSticker : startDrawing}
            onMouseMove={selectedSticker ? undefined : draw}
            onMouseUp={selectedSticker ? undefined : stopDrawing}
            onMouseLeave={selectedSticker ? undefined : stopDrawing}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
        </div>

        {/* RIGHT - Tools */}
        <div className="coloring-tools-box">
          {/* Colors */}
          <div>
            <h3 className="coloring-tool-title">🎨 Color Palette</h3>
            <div className="coloring-color-grid">
              {colorPalette.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="coloring-color-btn"
                  style={{
                    backgroundColor: color,
                    border: selectedColor === color ? '3px solid #6A3EA1' : '2px solid #fff',
                    boxShadow: selectedColor === color ? '0 0 8px #6A3EA1' : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Brush size */}
          <div>
            <label className="coloring-tool-title">
              Brush Size: {brushSize}
              <input
                type="range"
                min="5"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="coloring-slider"
              />
            </label>
          </div>

          {/* Stickers */}
          <div>
            <h3 className="coloring-tool-title">🌟 Stickers</h3>
            <div className="coloring-sticker-grid">
              {stickers.map(stk => (
                <button
                  key={stk}
                  onClick={() => setSelectedSticker(stk)}
                  className="coloring-sticker-btn"
                  style={{
                    background: selectedSticker === stk ? '#F8DFFF' : 'transparent',
                    border: selectedSticker === stk ? '2px solid #6A3EA1' : '2px solid transparent',
                  }}
                >
                  {stk}
                </button>
              ))}
            </div>
            <button onClick={() => setSelectedSticker(null)} className="coloring-clear-sticker-btn">
              Clear Sticker Mode
            </button>
          </div>

          {/* Clear Canvas */}
          <button onClick={clearCanvas} className="coloring-clear-btn">
            Clear Canvas
          </button>
        </div>
      </div>
    </div>
  );
}

/* ==================== GLOBAL STYLES ==================== */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  
  .joy-hub-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffeef8 0%, #e8d5f2 100%);
    padding: 40px 20px;
    font-family: 'Poppins', sans-serif;
  }
  .joy-hub-header {
    text-align: center;
    margin-bottom: 50px;
  }
  .joy-hub-title {
    font-size: 48px;
    font-weight: 700;
    color: #9b59b6;
    margin-bottom: 10px;
  }
  .joy-hub-title-accent {
    color: #ef6ac3;
  }
  .joy-hub-subtitle {
    font-size: 18px;
    color: #7d5ba6;
  }
  .joy-hub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
  }
  .joy-hub-card {
    background: white;
    border-radius: 20px;
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    box-shadow: 0 5px 20px rgba(155, 89, 182, 0.15);
  }
  .joy-hub-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(155, 89, 182, 0.25);
  }
  .joy-hub-card-icon {
    font-size: 60px;
    margin-bottom: 20px;
  }
  .joy-hub-card-title {
    font-size: 24px;
    font-weight: 600;
    color: #9b59b6;
    margin-bottom: 10px;
  }
  .joy-hub-card-desc {
    font-size: 14px;
    color: #7d5ba6;
  }
  .joy-hub-page-content {
    max-width: 900px;
    margin: 0 auto;
  }
  .joy-hub-back-btn {
    background: #e91e63;
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(233, 30, 99, 0.25);
    margin-bottom: 30px;
    transition: transform 0.2s;
  }
  .joy-hub-back-btn:hover {
    transform: translateY(-1px);
  }

  /* Memory Game Styles */
  .memory-card {
    background: white;
    border-radius: 25px;
    padding: 30px;
    box-shadow: 0 8px 30px rgba(155, 89, 182, 0.18);
    max-width: 480px;
    margin: 0 auto;
  }
  .memory-title {
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    color: #9b59b6;
    margin-bottom: 8px;
  }
  .memory-subtitle {
    text-align: center;
    font-size: 14px;
    color: #7d5ba6;
    margin-bottom: 25px;
  }
  .memory-stats-bar {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-bottom: 25px;
  }
  .memory-stat-box {
    background: linear-gradient(135deg, #f8e4f8 0%, #e8d5f2 100%);
    padding: 12px 20px;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }
  .memory-stat-label {
    font-size: 12px;
    color: #7d5ba6;
    font-weight: 500;
  }
  .memory-stat-value {
    font-size: 18px;
    color: #9b59b6;
    font-weight: 700;
  }
  .memory-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin-bottom: 25px;
  }
  .memory-tile {
    aspect-ratio: 1;
    background: linear-gradient(135deg, #ffd6e8 0%, #c7b5ff 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 12px rgba(155, 89, 182, 0.18);
    border: 2px solid transparent;
  }
  .memory-tile.flipped {
    background: white;
    border: 2px solid #ffb7d5;
    transform: scale(1.04);
  }
  .memory-tile-emoji {
    font-size: 38px;
  }
  .memory-tile-back {
    font-size: 28px;
    color: white;
    font-weight: 700;
  }
  .memory-reset-btn {
    width: 100%;
    background: linear-gradient(135deg, #e91e63 0%, #9b59b6 100%);
    color: white;
    border: none;
    padding: 12px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(233, 30, 99, 0.28);
    transition: transform 0.2s;
  }
  .memory-reset-btn:hover {
    transform: scale(1.01);
  }
  .memory-win-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(155, 89, 182, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  .memory-win-content {
    background: white;
    padding: 40px;
    border-radius: 25px;
    text-align: center;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
  }
  .memory-win-title {
    font-size: 30px;
    color: #9b59b6;
    margin-bottom: 15px;
  }
  .memory-win-text {
    font-size: 16px;
    color: #7d5ba6;
    margin-bottom: 25px;
  }
  .memory-win-btn {
    background: linear-gradient(135deg, #e91e63 0%, #9b59b6 100%);
    color: white;
    border: none;
    padding: 12px 30px;
    border-radius: 22px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(233, 30, 99, 0.28);
  }

  /* Coloring Game Styles */
  .coloring-wrapper {
    background: white;
    border-radius: 30px;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(155, 89, 182, 0.2);
    max-width: 900px;
    margin: 0 auto;
  }
  .coloring-title {
    color: #6A3EA1;
    font-size: 36px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
  }
  .coloring-container {
    display: flex;
    gap: 30px;
  }
  .coloring-canvas-box {
    flex: 1;
    background: #f8f4fc;
    border-radius: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .coloring-canvas {
    border-radius: 15px;
    border: 3px solid #F8DFFF;
    cursor: crosshair;
    max-width: 100%;
    height: auto;
    display: block;
    background: #fff7fa;
    touch-action: none;
  }
  .coloring-tools-box {
    width: 280px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex-shrink: 0;
  }
  .coloring-tool-title {
    color: #6A3EA1;
    margin-bottom: 10px;
    font-weight: 600;
    font-size: 16px;
    display: block;
  }
  .coloring-color-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .coloring-color-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .coloring-slider {
    width: 100%;
    margin-top: 8px;
  }
  .coloring-sticker-grid {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .coloring-sticker-btn {
    font-size: 28px;
    border-radius: 12px;
    cursor: pointer;
    padding: 6px 10px;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  .coloring-clear-sticker-btn {
    background: #6A3EA1;
    color: white;
    border: none;
    border-radius: 12px;
    padding: 8px 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 13px;
    width: 100%;
    box-shadow: 0 2px 6px rgba(106, 62, 161, 0.2);
  }
  .coloring-clear-btn {
    background: linear-gradient(135deg, #FFB7C5, #FF9FB0);
    border: none;
    border-radius: 20px;
    color: white;
    font-weight: 700;
    font-size: 16px;
    padding: 12px 0;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(255, 183, 197, 0.6);
    transition: transform 0.2s ease;
  }
  .coloring-clear-btn:hover {
    transform: translateY(-1px);
  }

  /* Responsive Breakpoints */
  @media (max-width: 768px) {
    .joy-hub-container {
      padding: 20px 10px;
    }
    .joy-hub-title {
      font-size: 36px;
    }
    .joy-hub-subtitle {
      font-size: 16px;
    }
    .coloring-wrapper {
      padding: 20px 12px;
      border-radius: 20px;
    }
    .coloring-title {
      font-size: 28px;
      margin-bottom: 20px;
    }
    .coloring-container {
      flex-direction: column;
      gap: 20px;
    }
    .coloring-canvas-box {
      padding: 10px;
    }
    .coloring-tools-box {
      width: 100%;
    }
  }
`;