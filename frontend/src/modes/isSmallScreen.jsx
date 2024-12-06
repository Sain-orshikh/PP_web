import { useState, useEffect } from "react";

function IsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();

  });

  return isSmallScreen;
}

export default IsSmallScreen;