import { useState, useEffect } from 'react';

export function useCountUp(target: number, duration = 1500, start = 0) {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const startTime = performance.now();
    const range = target - start;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + range * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration, start]);

  return value;
}
