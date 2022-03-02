// https://github.com/bsb808/geonav_transform/blob/master/src/alvinxy/alvinxy.py
const ll2xy = (lat, lon, orgLat, orgLon) => {
  const mdeglon = (lat) => {
    const latrad = (lat * 2.0 * Math.PI) / 360.0;
    const dx =
      111415.13 * Math.cos(latrad) -
      94.55 * Math.cos(3.0 * latrad) +
      0.12 * Math.cos(5.0 * latrad);
    return dx;
  };

  const mdeglat = (lat) => {
    const latrad = (lat * 2.0 * Math.PI) / 360.0;
    const dy =
      111132.09 -
      566.05 * Math.cos(2.0 * latrad) +
      1.2 * Math.cos(4.0 * latrad) -
      0.002 * Math.cos(6.0 * latrad);
    return dy;
  };

  const x = (lon - orgLon) * mdeglon(orgLat);
  const y = (lat - orgLat) * mdeglat(orgLat);

  return { x, y };
};

export const gpsToOdom = (goalCoordinates, initialCoordinates) => {
  const { latitude: goalLat, longitude: goalLon } = goalCoordinates;
  const { latitude: initLat, longitude: initLon } = initialCoordinates;
  const { x, y } = ll2xy(goalLat, goalLon, initLat, initLon);
  return { x: -x, y };
};
