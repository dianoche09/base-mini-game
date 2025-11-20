const ROOT_URL = "https://base-mini-game.vercel.app";

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "",
    payload: "",
    signature: ""
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

