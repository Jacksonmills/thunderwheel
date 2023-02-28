import React, { useEffect, useState } from 'react';

const WheelOfFortune: React.FC = () => {
  const [texts, setTexts] = useState<string[]>([]);
  const [selectedText, setSelectedText] = useState<string>('');

  const addText = (): void => {
    const text = prompt('Enter a text:');
    setTexts([...texts, text!]);
  };

  const startSpin = (): void => {
    const randomIndex = Math.floor(Math.random() * texts.length);
    setSelectedText(texts[randomIndex]);
  };

  const updateWheel = (): void => {
    const canvas = document.getElementById('wheel') as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    const colors = ['#FF4136', '#2ECC40', '#0074D9', '#FF851B', '#FFDC00', '#39CCCC'];

    context.clearRect(0, 0, canvas.width, canvas.height);

    const sliceAngle = Math.PI * 2 / texts.length;
    let startAngle = 0;

    texts.forEach((text, index) => {
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
      context.font = 'bold 20px Arial';
      context.fillStyle = 'white';
      context.fillText(text, canvas.width / 3, 0);
      context.restore();

      startAngle = endAngle;
    });
  };

  useEffect(() => {
    updateWheel();
  }, [texts]);

  return (
    <div>
      <canvas id="wheel" width="400" height="400"></canvas>
      <button onClick={addText}>Add Text</button>
      <button onClick={startSpin}>Spin</button>
      {selectedText && <p>The selected text is: {selectedText}</p>}
    </div>
  );
};

export default WheelOfFortune;