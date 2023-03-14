
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import MaxWidthWrapper from 'src/components/MaxWidthWrapper';
import SiteLayoutWrapper from 'src/components/SiteLayoutWrapper';
import styled, { css, keyframes } from 'styled-components';

const Home: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [picked, setPicked] = useState<string>('');
  const [duration, setDuration] = useState<number>(5000);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const wheelRef = useRef<HTMLCanvasElement>(null);

  const handleDuration = (e: ChangeEvent<HTMLInputElement>) => {
    const parsedValue = parseInt(e.currentTarget.value) * 1000;
    setDuration(parsedValue);
  };

  const addText = () => {
    const text = prompt('Enter a text:');
    setItems([...items, text!]);
    setPicked('');
  };

  function spinWheel(duration: number = 1000) {
    setIsSpinning((s) => !s);
    const randomIndex = Math.floor(Math.random() * items.length);

    setTimeout(() => {
      setPicked(items[randomIndex]);
      setIsSpinning(false);
    }, duration);
  };

  const updateWheel = (texts: string[]) => {
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
    updateWheel(items);
  }, [items]);

  return (
    <SiteLayoutWrapper>
      <MaxWidthWrapper>
        <WheelContainer>
          {items.length > 0 ? (
            <WheelCanvas
              ref={wheelRef}
              isSpinning={isSpinning}
              onClick={() => spinWheel(duration)}
              width="400"
              height="400"
            />
          ) : (
            <EmptyWheel
              ref={wheelRef}
              width="400"
              height="400"
            />
          )}
          <AddButton onClick={addText}>Add Text</AddButton>
          <div>
            <input type="number" value={duration / 1000} onChange={handleDuration} />
            <SpinButton onClick={() => spinWheel(duration)}>Spin</SpinButton>
          </div>
          {picked && <p>{picked}</p>}
        </WheelContainer>
      </MaxWidthWrapper>
    </SiteLayoutWrapper>
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

const MousePositions = styled.div`
  background-color: white;
  color: black;
`;

const WheelContainer = styled.div`
  position: relative;
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

export default Home;