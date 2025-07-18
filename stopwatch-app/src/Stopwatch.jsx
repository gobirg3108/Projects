import React, { useEffect, useRef, useState } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  const requestRef = useRef(null);

  const animate = () => {
    setElapsedTime(Date.now() - startTimeRef.current);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isRunning]);

  function start() {
    if (!isRunning) {
      setIsRunning(true);
    }
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  }

  function lap() {
    if (isRunning) {
      setLaps([...laps, formatTime()]);
    }
  }

  function formatTime() {
    const totalSeconds = elapsedTime / 1000;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    return [
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
      String(milliseconds).padStart(2, "0"),
    ].join(":");
  }

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-card">
        <div className="display">{formatTime()}</div>

        <div className="controls">
          <button
            className={`control-btn ${!isRunning ? "start-btn" : ""}`}
            onClick={start}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className={`control-btn ${isRunning ? "stop-btn" : ""}`}
            onClick={stop}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            className="control-btn lap-btn"
            onClick={lap}
            disabled={!isRunning}
          >
            Lap
          </button>
          <button
            className="control-btn reset-btn"
            onClick={reset}
            disabled={isRunning && elapsedTime === 0}
          >
            Reset
          </button>
        </div>

        {laps.length > 0 && (
          <div className="laps-section">
            <h3>Laps</h3>
            <ul className="laps-list">
              {laps.map((lapTime, index) => (
                <li key={index} className="lap-item">
                  <span className="lap-label">Lap {index + 1}</span>
                  <span className="lap-time">{lapTime}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Stopwatch;
