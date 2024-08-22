import { useEffect } from "react";

export default function useFocusAndScroll(ref) {
  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.focus();
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, [ref]);
}
