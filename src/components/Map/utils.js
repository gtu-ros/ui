import {
  centroid,
  point,
  polygon,
  rhumbBearing,
  rhumbDistance,
  transformTranslate,
  distance
} from '@turf/turf';
import { midpoint } from 'turf';
import * as R from 'ramda';

export const toClosedPolygon = (polygon) => [...polygon, polygon[0]];

const toArray = (x) => [x];

export const toTurfPolygon = R.pipe(toClosedPolygon, toArray, polygon);

const toCorners = (p) => p.geometry.coordinates[0].slice(0, -1);

export const getCentroid = (corners) => {
  if (corners?.length < 4) return null;
  const x = centroid(toTurfPolygon(corners));
  return x.geometry.coordinates;
};

export const transformPoly = (corners) => (from) => (to) => {
  const p = toTurfPolygon(corners);
  const fromP = point(from);
  const toP = point(to);
  const bearing = rhumbBearing(fromP, toP);
  const distance = rhumbDistance(fromP, toP);
  const translatedPoly = transformTranslate(p, distance, bearing);
  return toCorners(translatedPoly);
};

export const getPolygonLengths = (corners) => {
  const lineMids = [];
  const lengths = [];

  const closedCorners = toClosedPolygon(corners);

  for (let i = 0; i < closedCorners.length - 1; i++) {
    const curr = closedCorners[i];
    const next = closedCorners[i + 1];
    const mid = midpoint(point(curr), point(next)).geometry.coordinates;
    const len = distance(point(curr), point(next));
    lineMids.push(mid);
    lengths.push(len);
  }

  return { lengths, lineMids };
};

export const turfDistanceToMeters = (distance) => distance * 1000;
