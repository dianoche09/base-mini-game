const ROOT_URL = "https://base-mini-game.vercel.app";

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjIzNTY3MSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweEU5RGQ4QWVBZkEwMDNjNUNkY2MwZGY2N0E4N2NFQjU0NDliYjk0MjgifQ",
    payload: "eyJkb21haW4iOiJiYXNlLW1pbmktZ2FtZS52ZXJjZWwuYXBwIn0",
    signature: "cTCEbdnjLaUyBvVO0JWtwQoLy2jvd9q0kOOLEJ6Dln8H51jUOo8NFNfpWKwVhDU2wDco2YGQbsc/SO+/LRZs+Rw="
  },
  miniapp: {
    version: "1",
    name: "Base Jump",
    subtitle: "Infinite Vertical Jumper",
    description: "Jump as high as you can and compete on the leaderboard!",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "social",
    tags: ["game", "jumper", "base", "fun"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`,
    tagline: "Jump to the moon on Base!",
    ogTitle: "Base Jump Game",
    ogDescription: "Can you beat the high score?",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

