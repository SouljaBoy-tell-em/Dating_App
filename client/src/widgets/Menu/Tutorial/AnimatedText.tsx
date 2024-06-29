import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface AnimatedTextInterface {
  text: string;
  callback: () => void;
  styles?: {} 
}

const Text = styled.p`
  color: white;
  font-size: 35px;
  font-weight: 500;
`;

const AnimatedText: React.FC<AnimatedTextInterface> = ({ text, callback, styles }) => {
  const [stateText, setStateText] = useState(text);
  const [isRendered, setRendered] = useState(false);
  const [currentText, setCurrentText] = useState("");
  useEffect(() => {
    if (!isRendered) {
      setRendered(true);
      let index = 0;

      const animateText = () => {
        if (index < stateText.length) {
          setCurrentText((prev) => prev + stateText.charAt(index));
          setTimeout(() => {
            index++;
            animateText();
          }, 20);
        } else {
          callback();
        }
      };

      animateText();
    }
  }, [callback]);

  return <Text style={styles}>{currentText}</Text>;
};

export default AnimatedText;
