import { useEffect } from 'react';

export function useStarField(containerId: string, count = 150) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stars: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      const r = Math.random();
      if (r < 0.1) star.classList.add('star-large');
      else if (r < 0.5) star.classList.add('star-medium');
      else star.classList.add('star-small');

      const duration = 60 + Math.random() * 60;
      const delay = -Math.random() * duration;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${delay}s`;

      container.appendChild(star);
      stars.push(star);
    }

    return () => {
      stars.forEach(s => s.remove());
    };
  }, [containerId, count]);
}
