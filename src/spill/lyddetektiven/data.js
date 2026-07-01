// I prototypen brukes Web Speech API til å "spille" dyrelyden.
// Når du har ekte lydklipp: bytt src til f.eks. "/lyd/dyrelyder/ku.mp3"
// og bruk playAudio() fra speak.js i stedet for speak().

export const DYR = [
  { id: "ku",      navn: "Ku",       emoji: "🐄", lyd: "Møøøø",        farge: "#f1f6ec", kant: "#9bb87a" },
  { id: "hund",    navn: "Hund",     emoji: "🐶", lyd: "Voff voff!",   farge: "#fdf2e6", kant: "#e0a868" },
  { id: "katt",    navn: "Katt",     emoji: "🐱", lyd: "Mjau!",        farge: "#fdf0f4", kant: "#e3a0b8" },
  { id: "and",     navn: "And",      emoji: "🦆", lyd: "Kvakk kvakk!", farge: "#eaf6ff", kant: "#7fc7e8" },
  { id: "sau",     navn: "Sau",      emoji: "🐑", lyd: "Bæææ!",        farge: "#f4f0fa", kant: "#b79fd6" },
  { id: "hane",    navn: "Hane",     emoji: "🐓", lyd: "Kykeliky!",    farge: "#fff7e6", kant: "#f0c14b" },
  { id: "fros",    navn: "Frosk",    emoji: "🐸", lyd: "Kvekk kvekk!", farge: "#edfaf0", kant: "#5dbf7a" },
  { id: "ugle",    navn: "Ugle",     emoji: "🦉", lyd: "Huu-huu!",     farge: "#f0f4ff", kant: "#8fa8d6" },
];
