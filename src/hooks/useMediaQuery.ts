import { useEffect, useState } from "react";

const useMediaQuery: (sizeMedia: string) => string | any = (sizeMedia) => {
  const [current, setCurrent] = useState<any>();
  const [isMatch, setIsMatch] = useState<boolean>(false);
  useEffect(() => {
    let mounted: boolean = true;

    const getCurrentMedia: (mediaList: string) => string | null = (
      mediaList
    ) => {
      let result = null;
      if (window.matchMedia(mediaList).matches) {
        result = mediaList;
        setIsMatch(true);
      } else {
        setIsMatch(false);
      }
      return result;
    };

    const onResize: () => void = () => {
      const media = getCurrentMedia(sizeMedia);
      if (current !== media) {
        setCurrent(media as any);
      }
    };

    setCurrent(getCurrentMedia(sizeMedia));
    window.addEventListener("resize", onResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeMedia]);

  return isMatch;
};
export default useMediaQuery;
