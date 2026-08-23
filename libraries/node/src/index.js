export const logger = {
  info: (...args) => console.log("\x1b[36m[INFO]\x1b[0m", ...args),
  warn: (...args) => console.warn("\x1b[33m[WARN]\x1b[0m", ...args),
  error: (...args) => console.error("\x1b[31m[ERROR]\x1b[0m", ...args),
  success: (...args) => console.log("\x1b[32m[OK]\x1b[0m", ...args),
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds || parts.length === 0) parts.push(`${seconds}s`);
  return parts.join(" ");
}
