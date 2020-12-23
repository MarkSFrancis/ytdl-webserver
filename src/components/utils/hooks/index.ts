import { useRef, useEffect } from "react";

export function useMounted() {
  const isMounted = useRef(true);
  const isMountedCheck = useRef(() => isMounted.current);

  useEffect(() => () => (isMounted.current = false), []);

  return isMountedCheck.current;
}
