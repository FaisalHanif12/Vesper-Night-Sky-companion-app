export function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function formatTime(date: Date) {
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function formatDegrees(deg: number) {
  return `${deg.toFixed(1)}°`;
}
