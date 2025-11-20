"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import styles from "./page.module.css";
import Game from "../components/Game";
import Leaderboard from "../components/Leaderboard";
import ShareButton from "../components/ShareButton";

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastScore, setLastScore] = useState<number | null>(null);

  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  const handleGameOver = async (score: number) => {
    setIsPlaying(false);
    setLastScore(score);

    // Submit score
    if (context?.user?.fid) {
      await fetch("/api/leaderboard", {
        method: "POST",
        body: JSON.stringify({
          fid: context.user.fid,
          username: context.user.displayName || context.user.username,
          score
        })
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>BASE JUMP</h1>

      {!isPlaying && (
        <div className={styles.gameContainer}>
          {lastScore !== null && (
            <div className={styles.gameOver}>
              <h2>Game Over!</h2>
              <div className={styles.score}>{lastScore}m</div>
              <ShareButton score={lastScore} />
            </div>
          )}

          <button
            className={styles.startButton}
            onClick={() => setIsPlaying(true)}
          >
            {lastScore === null ? "START GAME" : "PLAY AGAIN"}
          </button>

          <Leaderboard currentScore={lastScore || 0} />
        </div>
      )}

      {isPlaying && (
        <Game onGameOver={handleGameOver} />
      )}
    </div>
  );
}
