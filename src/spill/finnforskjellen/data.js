// Hver scene har et bakgrunns-tema og en liste objekter med posisjon.
// "forskjell" peker på id-et som er endret i B-bildet.
// endring: { fra: "emoji i A", til: "emoji i B" }

export const SCENER = [
  {
    id: "eng",
    bakgrunn: "linear-gradient(180deg, #c8f0a0 0%, #a8e080 100%)",
    objekter: [
      { id: 1, emoji: "🦋", x: 20, y: 28 },
      { id: 2, emoji: "🌸", x: 68, y: 18 },
      { id: 3, emoji: "🐝", x: 44, y: 52 },
      { id: 4, emoji: "🌼", x: 14, y: 68 },
      { id: 5, emoji: "🍄", x: 78, y: 62 },
      { id: 6, emoji: "🐞", x: 54, y: 78 },
    ],
    forskjell: 1,
    endring: { fra: "🦋", til: "🐝" },
  },
  {
    id: "hav",
    bakgrunn: "linear-gradient(180deg, #a0d8f0 0%, #5ab0d8 100%)",
    objekter: [
      { id: 1, emoji: "🐠", x: 22, y: 30 },
      { id: 2, emoji: "🐙", x: 65, y: 20 },
      { id: 3, emoji: "🦀", x: 42, y: 58 },
      { id: 4, emoji: "⭐", x: 16, y: 70 },
      { id: 5, emoji: "🐚", x: 76, y: 65 },
      { id: 6, emoji: "🐡", x: 52, y: 80 },
    ],
    forskjell: 2,
    endring: { fra: "🐙", til: "🦑" },
  },
  {
    id: "skog",
    bakgrunn: "linear-gradient(180deg, #b8e8a0 0%, #78c860 100%)",
    objekter: [
      { id: 1, emoji: "🦊", x: 18, y: 32 },
      { id: 2, emoji: "🍄", x: 70, y: 22 },
      { id: 3, emoji: "🐿️", x: 46, y: 54 },
      { id: 4, emoji: "🌰", x: 20, y: 72 },
      { id: 5, emoji: "🦔", x: 75, y: 66 },
      { id: 6, emoji: "🐦", x: 56, y: 18 },
    ],
    forskjell: 1,
    endring: { fra: "🦊", til: "🐺" },
  },
  {
    id: "gard",
    bakgrunn: "linear-gradient(180deg, #f0e8a0 0%, #d8c860 100%)",
    objekter: [
      { id: 1, emoji: "🐄", x: 20, y: 34 },
      { id: 2, emoji: "🐓", x: 68, y: 24 },
      { id: 3, emoji: "🐷", x: 44, y: 56 },
      { id: 4, emoji: "🌻", x: 16, y: 70 },
      { id: 5, emoji: "🐑", x: 76, y: 64 },
      { id: 6, emoji: "🥕", x: 54, y: 80 },
    ],
    forskjell: 3,
    endring: { fra: "🐷", til: "🐗" },
  },
];
