export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const secsToDate = (secs) => new Date(secs * 1000);

export const fillFromClipboard = async (listeners) => {
  const clipboard = await navigator.clipboard.readText();
  const data = clipboard.split(' ');
  listeners.forEach((f, i) => f(data[i]));
}
