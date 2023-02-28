import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

const WheelOfFortune: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState<string>('');
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const wheelRef = useRef<HTMLCanvasElement>(null);

  const addText = (): void => {
    const text = prompt('Enter a text:');
    setTexts([...texts, text!]);
    setSelectedText('');
  };

  function spinWheel(duration: number = 1000): void {
    setIsSpinning((s) => !s);
    const randomIndex = Math.floor(Math.random() * texts.length);

    setTimeout(() => {
      setSelectedText(texts[randomIndex]);
      setIsSpinning(false);
    }, duration);
  };

  const updateWheel = (texts: string[]): void => {
    const canvas = wheelRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const colors = ['#FF4136', '#2ECC40', '#0074D9', '#FF851B', '#FFDC00', '#39CCCC'];

    context.clearRect(0, 0, canvas.width, canvas.height);

    const sliceAngle = Math.PI * 2 / texts.length;
    let startAngle = 0;

    texts.forEach((text, index) => {
      const MAX_LENGTH = 16;
      const truncatedText = text.slice(0, MAX_LENGTH + 3) + '...';

      const endAngle = startAngle + sliceAngle;
      const midAngle = startAngle + (endAngle - startAngle) / 2;
      const color = colors[index % colors.length];

      context.beginPath();
      context.fillStyle = color;
      context.moveTo(canvas.width / 2, canvas.height / 2);
      context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, startAngle, endAngle);
      context.fill();
      context.save();
      context.translate(canvas.width / 2, canvas.height / 2);
      context.rotate(midAngle);
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.font = 'bold 16px Arial';
      context.fillStyle = 'white';
      context.fillText(truncatedText, canvas.width / 3.6, 0);
      context.restore();

      startAngle = endAngle;
    });
  };

  useEffect(() => {
    updateWheel(texts);
  }, [texts]);

  return (
    <WheelContainer>
      {texts.length > 0 ? (<WheelCanvas ref={wheelRef} isSpinning={isSpinning} width="400" height="400" />) : (<EmptyWheel ref={wheelRef} width="400" height="400" />)}
      <AddButton onClick={addText}>Add Text</AddButton>
      <SpinButton onClick={() => spinWheel(5000)}>Spin</SpinButton>
      {selectedText && <p>The selected text is: {selectedText}</p>}
    </WheelContainer>
  );
};

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const spinAnimationMixin = css`
  animation: ${spin} 1s linear infinite;
`;

const WheelContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const WheelCanvas = styled.canvas<{
  isSpinning?: boolean,
}>`
  width: 100%;
  height: 100%;
  ${props => props.isSpinning && spinAnimationMixin};
`;

const EmptyWheel = styled(WheelCanvas)`
--color: #cbcbcb;
  border-radius: 50%;
  background-color: var(--color);
  outline: 4px dashed var(--color);
  outline-offset: 4px;
`;

const AddButton = styled.button`
  background-color: #e0a80d;
  color: black;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 2rem;
  margin: 1rem;
`;

const SpinButton = styled.button`
  background-color: #c80000;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 2rem;
  margin: 1rem;
`;

export default WheelOfFortune;