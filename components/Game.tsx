"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../app/page.module.css";

interface GameProps {
    onGameOver: (score: number) => void;
}

export default function Game({ onGameOver }: GameProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [score, setScore] = useState(0); // Unused state
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Game constants
        const GRAVITY = 0.4;
        const JUMP_FORCE = -10;
        const MOVEMENT_SPEED = 5;
        const PLATFORM_WIDTH = 60;
        const PLATFORM_HEIGHT = 10;

        // Game state
        const player = { x: canvas.width / 2, y: canvas.height - 100, vx: 0, vy: 0, width: 20, height: 20 };
        let platforms = [
            { x: canvas.width / 2 - 30, y: canvas.height - 50 },
            { x: 50, y: canvas.height - 150 },
            { x: 200, y: canvas.height - 250 },
            { x: 100, y: canvas.height - 350 },
            { x: 250, y: canvas.height - 450 },
        ];
        // let cameraY = 0; // Unused
        let currentScore = 0;
        let animationFrameId: number;
        const keys: { [key: string]: boolean } = {};

        // Input handling
        const handleKeyDown = (e: KeyboardEvent) => { keys[e.code] = true; };
        const handleKeyUp = (e: KeyboardEvent) => { keys[e.code] = false; };

        // Touch handling
        let touchStartX = 0;
        const handleTouchStart = (e: TouchEvent) => { touchStartX = e.touches[0].clientX; };
        const handleTouchMove = (e: TouchEvent) => {
            const touchX = e.touches[0].clientX;
            if (touchX < touchStartX) keys["ArrowLeft"] = true;
            else keys["ArrowRight"] = true;
            touchStartX = touchX;
        };
        const handleTouchEnd = () => { keys["ArrowLeft"] = false; keys["ArrowRight"] = false; };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchmove", handleTouchMove);
        canvas.addEventListener("touchend", handleTouchEnd);

        const update = () => {
            // Player movement
            if (keys["ArrowLeft"]) player.vx = -MOVEMENT_SPEED;
            else if (keys["ArrowRight"]) player.vx = MOVEMENT_SPEED;
            else player.vx *= 0.9; // Friction

            player.x += player.vx;
            player.vy += GRAVITY;
            player.y += player.vy;

            // Screen wrapping
            if (player.x > canvas.width) player.x = 0;
            if (player.x < 0) player.x = canvas.width;

            // Camera movement (only moves up)
            if (player.y < canvas.height / 2) {
                const diff = canvas.height / 2 - player.y;
                player.y += diff;
                // cameraY += diff;
                currentScore += Math.floor(diff);
                // setScore(currentScore);

                // Move platforms down
                platforms.forEach(p => p.y += diff);

                // Remove platforms below screen and add new ones
                platforms = platforms.filter(p => p.y < canvas.height);
                while (platforms.length < 6) {
                    platforms.push({
                        x: Math.random() * (canvas.width - PLATFORM_WIDTH),
                        y: platforms[platforms.length - 1].y - 100 - Math.random() * 50
                    });
                }
            }

            // Collision detection
            if (player.vy > 0) { // Only jump when falling
                platforms.forEach(p => {
                    if (
                        player.x + player.width > p.x &&
                        player.x < p.x + PLATFORM_WIDTH &&
                        player.y + player.height > p.y &&
                        player.y + player.height < p.y + PLATFORM_HEIGHT + 10 // Tolerance
                    ) {
                        player.vy = JUMP_FORCE;
                    }
                });
            }

            // Game Over
            if (player.y > canvas.height) {
                setIsGameOver(true);
                onGameOver(currentScore);
                cancelAnimationFrame(animationFrameId);
                return;
            }

            draw();
            animationFrameId = requestAnimationFrame(update);
        };

        const draw = () => {
            // Clear screen
            ctx.fillStyle = "#1a1a1a"; // Dark background
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw platforms
            ctx.fillStyle = "#0052FF"; // Base Blue
            platforms.forEach(p => {
                ctx.fillRect(p.x, p.y, PLATFORM_WIDTH, PLATFORM_HEIGHT);
            });

            // Draw player
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // Draw score
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "20px Arial";
            ctx.fillText(`Score: ${currentScore}`, 10, 30);
        };

        update();

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            canvas.removeEventListener("touchstart", handleTouchStart);
            canvas.removeEventListener("touchmove", handleTouchMove);
            canvas.removeEventListener("touchend", handleTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [onGameOver]);

    if (isGameOver) return null;

    return (
        <canvas
            ref={canvasRef}
            width={350}
            height={600}
            className={styles.gameCanvas}
            style={{ border: "2px solid #333", borderRadius: "8px" }}
        />
    );
}
