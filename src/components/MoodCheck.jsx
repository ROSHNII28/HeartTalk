import { Heart, RefreshCw, Sparkles } from "lucide-react";
import { useState } from "react";

const MoodCheck = () => {
  const [start, setStart] = useState(false); // NEW START SCREEN
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [moodResult, setMoodResult] = useState(null);

  // ------ QUESTIONS ------
  const questions = [
    {
      q: "How would you describe your energy level today?",
      options: [
        { text: "Energized and ready to conquer!", value: 5 },
        { text: "Pretty good, feeling positive", value: 4 },
        { text: "Neutral, just getting by", value: 3 },
        { text: "A bit low, struggling", value: 2 },
        { text: "Exhausted and drained", value: 1 },
      ],
    },
    {
      q: "How are you feeling about your goals right now?",
      options: [
        { text: "Motivated and on track!", value: 5 },
        { text: "Optimistic about progress", value: 4 },
        { text: "Uncertain but trying", value: 3 },
        { text: "Discouraged and stuck", value: 2 },
        { text: "Overwhelmed and lost", value: 1 },
      ],
    },
    {
      q: "How would you rate your stress levels?",
      options: [
        { text: "Calm and peaceful", value: 5 },
        { text: "Manageable, doing okay", value: 4 },
        { text: "Moderate stress", value: 3 },
        { text: "High stress, anxious", value: 2 },
        { text: "Extremely stressed out", value: 1 },
      ],
    },
    {
      q: "How connected do you feel to others?",
      options: [
        { text: "Supported and loved", value: 5 },
        { text: "Connected and appreciated", value: 4 },
        { text: "Somewhat isolated", value: 3 },
        { text: "Lonely and disconnected", value: 2 },
        { text: "Very alone", value: 1 },
      ],
    },
    {
      q: "What's your outlook on the future?",
      options: [
        { text: "Excited and hopeful!", value: 5 },
        { text: "Positive and optimistic", value: 4 },
        { text: "Neutral, one day at a time", value: 3 },
        { text: "Worried and uncertain", value: 2 },
        { text: "Pessimistic and fearful", value: 1 },
      ],
    },
  ];

  // ------ MOOD CATEGORIES ------
  const moodCategories = {
    thriving: {
      name: "Thriving",
      color: "#FFB7C5",
      emoji: "🌟",
      quotes: [
        "You're radiating positive energy!",
        "Your momentum is unstoppable.",
        "You're truly in your element today!",
        "Your positive aura lights up everything around you.",
      ],
    },
    positive: {
      name: "Positive",
      color: "#B8B4E3",
      emoji: "😊",
      quotes: [
        "You're doing great!",
        "Your optimism is your power.",
        "Every small step counts.",
        "You're glowing with good energy today.",
      ],
    },
    balanced: {
      name: "Balanced",
      color: "#ACE7FF",
      emoji: "🌊",
      quotes: [
        "A calm day is still a growing day.",
        "You're exactly where you need to be.",
        "Balance brings clarity.",
        "You're doing just fine.",
      ],
    },
    struggling: {
      name: "Struggling",
      color: "#B8B4E3",
      emoji: "💙",
      quotes: [
        "You're stronger than you think.",
        "It's okay to slow down.",
        "Be gentle with yourself.",
        "This moment will pass.",
      ],
    },
    needSupport: {
      name: "Need Support",
      color: "#6A3EA1",
      emoji: "🫂",
      quotes: [
        "You're not alone. Please reach out.",
        "You deserve care and support.",
        "Your feelings matter.",
        "You don't have to carry this alone.",
      ],
    },
  };

  // ------ CALCULATE MOOD ------
  const calculateMood = () => {
    const total = answers.reduce((sum, val) => sum + val, 0);
    const average = total / answers.length;

    let mood;
    if (average >= 4.5) mood = moodCategories.thriving;
    else if (average >= 3.5) mood = moodCategories.positive;
    else if (average >= 2.5) mood = moodCategories.balanced;
    else if (average >= 1.8) mood = moodCategories.struggling;
    else mood = moodCategories.needSupport;

    const randomQuote =
      mood.quotes[Math.floor(Math.random() * mood.quotes.length)];

    setMoodResult({ ...mood, quote: randomQuote });
    setShowResult(true);
  };

  const handleAnswer = (value) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateMood();
    }
  };

  const restart = () => {
    setStart(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setMoodResult(null);
  };

  // -----------------------------------------------------
  //  ⭐ PAGE 1 — START SCREEN (NEW)
  // -----------------------------------------------------
  if (!start) {
    return (
      <div className="moodcheck-container" style={{ background: "#FFF6F8" }}>
        <style>{styles}</style>
        <div className="moodcheck-start-card">
          <div className="moodcheck-icon-circle" style={{ background: "#FFB7C5" }}>
            <Heart size={45} color="white" />
          </div>

          <h1 className="moodcheck-title" style={{ color: "#6A3EA1" }}>
            Check Your Mood Today
          </h1>

          <p className="moodcheck-subtitle" style={{ color: "#B8B4E3" }}>
            Take a quick 5-question test to understand how you're *really* feeling 💜
          </p>

          <button
            onClick={() => setStart(true)}
            className="moodcheck-btn-start"
            style={{ background: "#FFB7C5" }}
          >
            Start Mood Test
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // ⭐ PAGE 2 — RESULT SCREEN
  // -----------------------------------------------------
  if (showResult && moodResult) {
    return (
      <div className="moodcheck-container" style={{ background: "#FFF6F8" }}>
        <style>{styles}</style>
        <div className="moodcheck-wrapper">
          <div
            className="moodcheck-card"
            style={{
              background: "rgba(255,255,255,0.6)",
              borderColor: moodResult.color + "60",
            }}
          >
            <div className="moodcheck-card-header">
              <div className="moodcheck-result-emoji">{moodResult.emoji}</div>
              <h2 className="moodcheck-result-title" style={{ color: "#6A3EA1" }}>
                You’re Feeling: {moodResult.name}
              </h2>
            </div>

            <div
              className="moodcheck-quote-box"
              style={{
                background: moodResult.color + "20",
                borderLeft: `5px solid ${moodResult.color}`,
              }}
            >
              <div className="moodcheck-quote-flex">
                <Sparkles
                  size={26}
                  style={{ color: moodResult.color, flexShrink: 0 }}
                />
                <p className="moodcheck-quote-text" style={{ color: "#6A3EA1" }}>
                  {moodResult.quote}
                </p>
              </div>
            </div>

            {moodResult.name === "Need Support" && (
              <div className="moodcheck-support-box" style={{ background: "#ACE7FF40" }}>
                <p className="moodcheck-support-title" style={{ color: "#6A3EA1" }}>
                  You deserve support:
                </p>
                <ul className="moodcheck-support-list" style={{ color: "#6A3EA1" }}>
                  <li>• National helpline (988)</li>
                  <li>• Crisis Text Line: Text HOME to 741741</li>
                  <li>• findahelpline.com (global)</li>
                </ul>
              </div>
            )}

            <button
              onClick={restart}
              className="moodcheck-btn-restart"
              style={{ background: "#FFB7C5" }}
            >
              <RefreshCw size={20} className="inline-block mr-2" style={{ verticalAlign: "middle" }} />
              <span style={{ verticalAlign: "middle" }}>Take Again</span>
            </button>

            <p className="moodcheck-disclaimer" style={{ color: "#999" }}>
              This is a quick check-in, not a diagnosis 💜
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // ⭐ PAGE 3 — QUESTION SCREEN
  // -----------------------------------------------------
  return (
    <div className="moodcheck-container" style={{ background: "#FFF6F8" }}>
      <style>{styles}</style>
      <div className="moodcheck-wrapper">
        <div className="moodcheck-card-header">
          <div className="moodcheck-icon-circle" style={{ background: "#FFB7C5" }}>
            <Heart size={45} color="white" />
          </div>

          <h1 className="moodcheck-title" style={{ color: "#6A3EA1" }}>
            How Are You <span className="italic">Really</span> Feeling?
          </h1>

          <p className="moodcheck-subtitle" style={{ color: "#B8B4E3" }}>
            Answer 5 short questions for a personalized reflection 🌸
          </p>
        </div>

        <div
          className="moodcheck-card"
          style={{
            background: "rgba(255,255,255,0.65)",
            borderColor: "#E6DDF5",
          }}
        >
          <div className="moodcheck-progress-bar-container">
            <div className="moodcheck-progress-bars">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className="moodcheck-progress-bar-segment"
                  style={{
                    background:
                      idx <= currentQuestion
                        ? "#FFB7C5"
                        : "rgba(184,180,227,0.3)",
                  }}
                />
              ))}
            </div>

            <p className="moodcheck-progress-text" style={{ color: "#B8B4E3" }}>
              Question {currentQuestion + 1} / {questions.length}
            </p>
          </div>

          <h2 className="moodcheck-question-text" style={{ color: "#6A3EA1" }}>
            {questions[currentQuestion].q}
          </h2>

          <div className="moodcheck-options-list">
            {questions[currentQuestion].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className="moodcheck-option-btn"
                style={{
                  color: "#6A3EA1",
                }}
              >
                {option.text}
              </button>
            ))}
          </div>

          <p className="moodcheck-disclaimer" style={{ color: "#B8B4E3" }}>
            Your answers are private 💜
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  
  .moodcheck-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
    font-family: 'Poppins', sans-serif;
  }
  .moodcheck-start-card {
    text-align: center;
    max-width: 576px;
    margin: 0 auto;
    width: 100%;
  }
  .moodcheck-icon-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 50%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 12px;
  }
  .moodcheck-title {
    font-size: 32px;
    font-weight: 800;
    margin-top: 16px;
    margin-bottom: 12px;
    line-height: 1.25;
  }
  .moodcheck-subtitle {
    font-size: 18px;
    margin-bottom: 32px;
    line-height: 1.5;
  }
  .moodcheck-btn-start {
    padding: 16px 32px;
    border-radius: 16px;
    color: white;
    font-weight: 600;
    font-size: 18px;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .moodcheck-btn-start:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(255, 183, 197, 0.4);
  }
  .moodcheck-wrapper {
    width: 100%;
    max-width: 896px;
    margin: 0 auto;
  }
  .moodcheck-card {
    border-radius: 28px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(184, 180, 227, 0.15);
    border: 1px solid #E6DDF5;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
  }
  .moodcheck-card-header {
    text-align: center;
    margin-bottom: 24px;
  }
  .moodcheck-result-emoji {
    font-size: 72px;
    margin-bottom: 16px;
  }
  .moodcheck-result-title {
    font-size: 28px;
    font-weight: 700;
  }
  .moodcheck-quote-box {
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
  }
  .moodcheck-quote-flex {
    display: flex;
    align-items: start;
    gap: 12px;
  }
  .moodcheck-quote-text {
    font-size: 18px;
    line-height: 1.6;
    margin: 0;
  }
  .moodcheck-support-box {
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    text-align: left;
  }
  .moodcheck-support-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .moodcheck-support-list {
    font-size: 14px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .moodcheck-support-list li {
    margin-bottom: 4px;
  }
  .moodcheck-btn-restart {
    width: 100%;
    padding: 16px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 16px;
    color: white;
    border: none;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .moodcheck-btn-restart:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 10px rgba(255, 183, 197, 0.4);
  }
  .moodcheck-disclaimer {
    text-align: center;
    font-size: 12px;
    margin-top: 20px;
  }
  .moodcheck-progress-bar-container {
    margin-bottom: 24px;
  }
  .moodcheck-progress-bars {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
  }
  .moodcheck-progress-bar-segment {
    flex: 1;
    height: 8px;
    border-radius: 4px;
    transition: background 0.3s;
  }
  .moodcheck-progress-text {
    font-size: 14px;
    font-weight: 500;
  }
  .moodcheck-question-text {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 24px;
    text-align: center;
  }
  .moodcheck-options-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 576px;
    margin: 0 auto;
  }
  .moodcheck-option-btn {
    padding: 16px 24px;
    border-radius: 16px;
    text-align: left;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.03);
    border: 1px solid #E6DDF5;
    background: rgba(255, 255, 255, 0.9);
    font-weight: 500;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.2s;
  }
  .moodcheck-option-btn:hover {
    border-color: #FFB7C5;
    background: #FFE9EE;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .moodcheck-container {
      padding: 24px 12px;
    }
    .moodcheck-card {
      padding: 24px 16px;
      border-radius: 20px;
    }
    .moodcheck-title {
      font-size: 24px;
    }
    .moodcheck-subtitle {
      font-size: 15px;
      margin-bottom: 24px;
    }
    .moodcheck-result-emoji {
      font-size: 56px;
    }
    .moodcheck-result-title {
      font-size: 22px;
    }
    .moodcheck-quote-text {
      font-size: 15px;
    }
    .moodcheck-question-text {
      font-size: 18px;
      margin-bottom: 16px;
    }
    .moodcheck-option-btn {
      font-size: 14px;
      padding: 14px 16px;
    }
  }
`;

export default MoodCheck;
