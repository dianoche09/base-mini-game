"use client";

import styles from "../app/page.module.css";

export default function ShareButton({ score }: { score: number }) {
    const handleShare = () => {
        const text = `I just reached ${score}m on Base Jump! Can you beat me? 🚀 @base`;
        const url = "https://warpcast.com/~/compose?text=" + encodeURIComponent(text);
        window.open(url, "_blank");
    };

    return (
        <button onClick={handleShare} className={styles.shareButton}>
            Share on Farcaster
        </button>
    );
}
