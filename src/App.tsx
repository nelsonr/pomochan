import "./App.css";
import pomochan from "./assets/pomochan.png";
import { invoke } from "@tauri-apps/api/core";
import { use, useEffect, useEffectEvent, useState } from "react";

function timeString(seconds: number) {
  const minutesStr = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secondsStr = (seconds % 60).toString().padStart(2, "0");

  return `${minutesStr}:${secondsStr}`;
}

async function notify() {
  await invoke("notify");
}

const TIMER_DURATION = 1500; // 25 minutes

function App() {
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [showTimer, setShowTimer] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startTimer = () => {
    setIsAnimating(true);
    setShowTimer(true);
  };

  const stopTimer = () => {
    setTimer(TIMER_DURATION);
    setShowTimer(false);
  };

  const timerTick = useEffectEvent(() => {
    setTimer((prevTimer) => prevTimer - 1);
    if (timer === 0) {
      stopTimer();
      notify();
    }
  });

  // Toggle timer on space key press
  const onSpacePress = useEffectEvent((ev: KeyboardEvent) => {
    if (ev.key !== " ") return;

    if (showTimer) {
      stopTimer();
    } else {
      startTimer();
    }
  });

  useEffect(() => {
    if (showTimer) {
      const interval = setInterval(timerTick, 1000);
      return () => clearInterval(interval);
    }
  }, [showTimer]);

  useEffect(() => {
    document.addEventListener("keyup", onSpacePress);
    return () => document.removeEventListener("keyup", onSpacePress);
  }, []);

  let timerClassName = "timer";
  if (isAnimating) timerClassName += " timer--animating";

  return (
    <main>
      <div className={timerClassName}>
        {!showTimer && (
          <button className="timer__start" onClick={startTimer}>
            <PlayIcon /> Start Timer
          </button>
        )}
        {showTimer && (
          <>
            <div className="timer__time">{timeString(timer)}</div>
            <button className="timer__stop" onClick={stopTimer}>
              <StopIcon /> Stop Timer
            </button>
          </>
        )}
      </div>
      <div className="pomochan">
        <img width={190} src={pomochan} alt="Pomochan" />
      </div>
    </main>
  );
}

function PlayIcon() {
  return (
    <svg
      className="icon icon-play"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg
      className="icon icon-stop"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  );
}

export default App;
