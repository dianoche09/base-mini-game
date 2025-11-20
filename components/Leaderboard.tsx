"use client";

import { useEffect, useState } from "react";
import styles from "../app/page.module.css";

interface Score {
    fid: number;
    username: string;
    score: number;
}

export default function Leaderboard({ currentScore }: { currentScore?: number }) {
    const [scores, setScores] = useState<Score[]>([]);

    useEffect(() => {
        fetch("/api/leaderboard")
            .then(res => res.json())
            .then(data => setScores(data.scores || []));
    }, [currentScore]);

    return (
        <div className={styles.leaderboard}>
            <h3>🏆 Leaderboard</h3>
            <ul className={styles.scoreList}>
                {scores.map((s, i) => (
                    <li key={i} className={styles.scoreItem}>
                        <span>#{i + 1} {s.username}</span>
                        <span>{s.score}m</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
