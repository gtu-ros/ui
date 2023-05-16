export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
};

export const secsToDate = (secs) => new Date(secs * 1000);
