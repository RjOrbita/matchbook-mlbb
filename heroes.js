/**
 * Complete MLBB Hero List (133 heroes as of September 2026)
 * Sorted alphabetically. Update this file when new heroes are released.
 */
const MLBB_HEROES = [
  "Aamon", "Akai", "Aldous", "Alice", "Alpha", "Alucard", "Angela", "Argus", "Arlott", "Atlas", "Aulus", "Aurora",
  "Badang", "Balmond", "Bane", "Barats", "Baxia", "Beatrix", "Belerick", "Benedetta", "Brody", "Bruno",
  "Carmilla", "Cecilion", "Chang'e", "Chip", "Chou", "Cici", "Claude", "Clint", "Cyclops",
  "Diggie", "Dyrroth",
  "Edith", "Esmeralda", "Estes", "Eudora",
  "Fanny", "Faramis", "Floryn", "Franco", "Fredrinn", "Freya",
  "Gatotkaca", "Gloo", "Gord", "Granger", "Grock", "Guinevere", "Gusion",
  "Hanabi", "Hanzo", "Harith", "Harley", "Hayabusa", "Helcurt", "Hilda", "Hirara", "Hylos",
  "Irithel", "Ixia",
  "Jawhead", "Johnson", "Joy", "Julian",
  "Kadita", "Kagura", "Kaja", "Kalea", "Karina", "Karrie", "Khaleed", "Khufra", "Kimmy",
  "Lancelot", "Lapu-Lapu", "Layla", "Leomord", "Lesley", "Ling", "Lolita", "Lukas", "Lunox", "Luo Yi", "Lylia",
  "Marcel", "Martis", "Masha", "Mathilda", "Melissa", "Minotaur", "Minsitthar", "Miya", "Moskov",
  "Nana", "Natalia", "Natan", "Nolan", "Novaria",
  "Obsidia", "Odette",
  "Paquito", "Pharsa", "Phoveus", "Popol and Kupa",
  "Rafaela", "Roger", "Ruby",
  "Saber", "Selena", "Silvanna", "Sora", "Sun", "Suyou",
  "Terizla", "Thamuz", "Tigreal",
  "Uranus",
  "Vale", "Valentina", "Valir", "Vexana",
  "Wanwan",
  "X.Borg", "Xavier",
  "Yi Sun-shin", "Yin", "Yu Zhong", "Yve",
  "Zetian", "Zhask", "Zhuxin", "Zilong"
];

/**
 * Hero roles mapping — each hero's primary role(s) for auto-suggestions
 */
const HERO_ROLES = {
  "Aamon": "Assassin", "Akai": "Tank", "Aldous": "Fighter", "Alice": "Mage", "Alpha": "Fighter",
  "Alucard": "Fighter", "Angela": "Support", "Argus": "Fighter", "Arlott": "Fighter", "Atlas": "Tank",
  "Aulus": "Fighter", "Aurora": "Mage",
  "Badang": "Fighter", "Balmond": "Fighter", "Bane": "Fighter", "Barats": "Tank", "Baxia": "Tank",
  "Beatrix": "Marksman", "Belerick": "Tank", "Benedetta": "Assassin", "Brody": "Marksman", "Bruno": "Marksman",
  "Carmilla": "Support", "Cecilion": "Mage", "Chang'e": "Mage", "Chip": "Tank", "Chou": "Fighter",
  "Cici": "Fighter", "Claude": "Marksman", "Clint": "Marksman", "Cyclops": "Mage",
  "Diggie": "Support", "Dyrroth": "Fighter",
  "Edith": "Tank", "Esmeralda": "Mage", "Estes": "Support", "Eudora": "Mage",
  "Fanny": "Assassin", "Faramis": "Support", "Floryn": "Support", "Franco": "Tank", "Fredrinn": "Fighter",
  "Freya": "Fighter",
  "Gatotkaca": "Tank", "Gloo": "Tank", "Gord": "Mage", "Granger": "Marksman", "Grock": "Tank",
  "Guinevere": "Fighter", "Gusion": "Assassin",
  "Hanabi": "Marksman", "Hanzo": "Assassin", "Harith": "Mage", "Harley": "Mage", "Hayabusa": "Assassin",
  "Helcurt": "Assassin", "Hilda": "Fighter", "Hirara": "Assassin", "Hylos": "Tank",
  "Irithel": "Marksman", "Ixia": "Marksman",
  "Jawhead": "Fighter", "Johnson": "Tank", "Joy": "Assassin", "Julian": "Fighter",
  "Kadita": "Mage", "Kagura": "Mage", "Kaja": "Support", "Karina": "Assassin", "Karrie": "Marksman",
  "Khaleed": "Fighter", "Khufra": "Tank", "Kimmy": "Marksman",
  "Lancelot": "Assassin", "Lapu-Lapu": "Fighter", "Layla": "Marksman", "Leomord": "Fighter",
  "Lesley": "Marksman", "Ling": "Assassin", "Lolita": "Tank", "Lunox": "Mage", "Luo Yi": "Mage", "Lylia": "Mage",
  "Martis": "Fighter", "Masha": "Fighter", "Mathilda": "Support", "Melissa": "Marksman",
  "Minotaur": "Tank", "Minsitthar": "Fighter", "Miya": "Marksman", "Moskov": "Marksman",
  "Nana": "Mage", "Natalia": "Assassin", "Natan": "Marksman", "Nolan": "Assassin", "Novaria": "Mage",
  "Odette": "Mage",
  "Paquito": "Fighter", "Pharsa": "Mage", "Phoveus": "Fighter", "Popol and Kupa": "Marksman",
  "Rafaela": "Support", "Roger": "Fighter", "Ruby": "Fighter",
  "Saber": "Assassin", "Selena": "Assassin", "Silvanna": "Fighter", "Sun": "Fighter", "Suyou": "Assassin",
  "Terizla": "Fighter", "Thamuz": "Fighter", "Tigreal": "Tank",
  "Uranus": "Tank",
  "Vale": "Mage", "Valentina": "Mage", "Valir": "Mage", "Vexana": "Mage",
  "Wanwan": "Marksman",
  "X.Borg": "Fighter", "Xavier": "Mage",
  "Yi Sun-shin": "Assassin", "Yin": "Fighter", "Yu Zhong": "Fighter", "Yve": "Mage",
  "Zhask": "Mage", "Zhuxin": "Fighter", "Zilong": "Fighter"
};
