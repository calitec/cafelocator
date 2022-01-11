import { useEffect, useRef, useState, SyntheticEvent } from "react";

export default function useScroll() {
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef(null);

  const onScroll = (e) => {
    requestAnimationFrame(() => {
      if(e.target.scrollTop >= 0) {
        setScrollTop(e.target.scrollTop);
      }
    });
  };

  useEffect(() => {
    if(ref) {
        const scrollContainer = ref.current;
        setScrollTop(scrollContainer.scrollTop);
        scrollContainer.addEventListener("scroll", onScroll, {passive: true});
        return () => {
            scrollContainer.removeEventListener("scroll", onScroll);
        };
    }
  }, [ref]);

  return [scrollTop, ref] as any;
};