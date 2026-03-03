import { useState, useEffect } from 'react';
import './App.css';
import photo from './assets/love.jpeg'; // ← your photo

import confetti from 'canvas-confetti';

function App() {
  const [stage, setStage] = useState('welcome');
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noBlocked, setNoBlocked] = useState(false);
  const [success, setSuccess] = useState(false);

  // Confetti explosion when she says yes
  const fireConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#ff69b4', '#ff1493', '#c71585'],
      });

      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ff1493', '#ff0000', '#db7093'],
      });

      confetti({
        particleCount: 8,
        spread: 80,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        colors: ['#ffffff', '#ffd700', '#ff69b4'],
      });
    }, 250);

    // Big final heart burst
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 180,
        startVelocity: 45,
        decay: 0.9,
        gravity: 0.5,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#c71585', '#ff0000'],
      });
    }, 800);
  };

  const moveNoButton = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 240;
    setNoPosition({ x: newX, y: newY });

    setNoBlocked(true);
    setTimeout(() => setNoBlocked(false), 120);
  };

  const handleYes = () => {
    fireConfetti();
    setSuccess(true);
  };

  // Floating hearts in proposal stage
  useEffect(() => {
    if (stage === 'proposal' && !success) {
      const interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 12000);
      }, 700);

      return () => clearInterval(interval);
    }
  }, [stage, success]);

  if (success) {
    return (
      <div className="container success">
        <div className="success-content">
          <h1>Yes… 💍❤️</h1>

          <div className="photo-frame large">
            <img src={photo} alt="My forever love" />
          </div>

          <p className="romantic-text">
            My heart feels so full right now.<br /><br />
            You are my calm in every storm,<br />
            my joy in the quiet moments,<br />
            and the reason I believe in forever.<br /><br />
            Thank you for choosing me.<br />
            I promise to love you gently, deeply,<br />
            and with everything I am — every single day.
          </p>

          <div className="hearts-row">
            <span>💕</span> <span>💖</span> <span>💗</span> <span>💓</span> <span>💘</span>
          </div>

          <p className="small-note">
            I can't wait to hold you close<br />
            and tell you these words in person.<br />
            I love you more than yesterday,<br />
            but not as much as tomorrow.
          </p>
        </div>
      </div>
    );
  }

  if (stage === 'welcome') {
    return (
      <div className="container welcome">
        <h1>My sweetest love ❤️</h1>

        <div className="photo-frame">
          <img src={photo} alt="My heart" />
        </div>

        <p className="message">
          Every moment with you feels like magic.<br />
          Your laugh, your kindness, your beautiful soul —<br />
          you make my world so much brighter.
        </p>

        <button
          className="btn primary"
          onClick={() => setStage('proposal')}
        >
          Tap if your heart feels the same... ✨
        </button>
      </div>
    );
  }

  return (
    <div className="container proposal">
      <h1>There's something I've been wanting to ask you...</h1>

      <div className="photo-frame small">
        <img src={photo} alt="You" />
      </div>

      <h2 className="question">
        Will you marry me<br />
        and let me love you for the rest of our lives? 💍
      </h2>

      <div className="buttons">
        <button className="btn yes" onClick={handleYes}>
          Yes — forever with you 💖💍
        </button>

        <button
          className="btn no"
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            pointerEvents: noBlocked ? 'none' : 'auto',
          }}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
          onClick={(e) => {
            e.preventDefault();
            moveNoButton();
          }}
        >
          No...
        </button>
      </div>

      <p className="tiny-hint">
        (the "No" button is very shy today... 😌)
      </p>
    </div>
  );
}

export default App;