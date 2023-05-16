import { useCallback, useRef, useState } from 'react';

const useLongPress = (onHold, { delay = 300, repeat } = {}) => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);
  const timeout = useRef();
  const target = useRef();
  const interval = useRef();

  const start = useCallback(
    (event) => {
      if (event.target) {
        event.target.addEventListener('touchend', preventDefault, {
          passive: false
        });
        target.current = event.target;
      }
      timeout.current = setTimeout(() => {
        onHold(event);
        if (repeat) {
          interval.current = setInterval(() => onHold(event), repeat);
        }
        setLongPressTriggered(true);
      }, delay);
    },
    [onHold, delay]
  );

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    interval.current && clearInterval(interval.current);
    setLongPressTriggered(false);
    if (target.current) {
      target.current.removeEventListener('touchend', preventDefault);
    }
  }, []);

  return {
    onMouseDown: (e) => start(e),
    onTouchStart: (e) => start(e),
    onMouseUp: (e) => clear(e),
    onMouseLeave: (e) => clear(e, false),
    onTouchEnd: (e) => clear(e)
  };
};

const isTouchEvent = (event) => {
  return 'touches' in event;
};

const preventDefault = (event) => {
  if (!isTouchEvent(event)) return;

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault();
  }
};

export default useLongPress;
