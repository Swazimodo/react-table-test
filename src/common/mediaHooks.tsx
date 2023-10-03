import { useCallback, useEffect, useMemo, useState } from "react";
import { enumKeys } from "./enumUtils";

export enum MediaSizes {
  'xs' = 1,
  'sm',
  'md',
  'lg',
  'xl',
  'xxl'
}
export const sizes: { [K in MediaSizes]: string } = {
  [MediaSizes.xs]: '320px',
  [MediaSizes.sm]: '425px',
  [MediaSizes.md]: '768px',
  [MediaSizes.lg]: '1024px',
  [MediaSizes.xl]: '1280px',
  [MediaSizes.xxl]: '1440px'
};

const isMatch = (size: MediaSizes) => {
  const query = `(min-width: ${sizes[size]})`;
  return window.matchMedia(query).matches;
}

const findClosest = () => {
  const mediaSizes = enumKeys(MediaSizes)
  for (let i = mediaSizes.length - 1; i >= 0; i--) {
    const mediaSize = MediaSizes[mediaSizes[i]]
    if (isMatch(mediaSize)) {
      return mediaSize;
    }
  }
  return MediaSizes.sm;
}

export const useClosestMedia = (): MediaSizes => {
  const [closest, setClosest] = useState<MediaSizes>(() => findClosest());
  const listener = useCallback(() => setClosest(findClosest()), [])

  useEffect(() => {
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [listener]);

  return closest;
};

export const useMediaQuery = (size: MediaSizes) => {
  const media = useMemo(() => window.matchMedia(`(min-width: ${sizes[size]})`), [size])
  const [matches, setMatches] = useState<boolean>(() => media.matches);
  const listener = useCallback(() => setMatches(media.matches), [media, setMatches])

  useEffect(() => {
    console.log('useMedia effect')
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [listener]);

  return matches;
};
