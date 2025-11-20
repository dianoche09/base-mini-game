import { NextResponse } from "next/server";

// Simple in-memory store for demo purposes
const scores = [
    { fid: 1, username: "base_god", score: 1000 },
    { fid: 2, username: "jesse", score: 850 },
    { fid: 3, username: "brian", score: 500 },
];

export async function GET() {
    return NextResponse.json({ scores: scores.sort((a, b) => b.score - a.score).slice(0, 10) });
}

export async function POST(request: Request) {
    const body = await request.json();
    const { fid, username, score } = body;

    if (fid && score) {
        scores.push({ fid, username: username || `User ${fid}`, score });
    }

    return NextResponse.json({ success: true });
}
