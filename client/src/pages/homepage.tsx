import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:9001');

function HompagePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursors, setCursors] = useState<{ [key: string]: { x: number, y: number, hue: number, lineWidth: number; }; }>({});

  useEffect(() => {
    // Handle incoming cursor data
    socket.on('cursor', (data: { x: number, y: number, hue: number, lineWidth: number, id: string; }) => {
      setCursors(prevCursors => ({ ...prevCursors, [data.id]: { x: data.x, y: data.y, hue: data.hue, lineWidth: data.lineWidth } }));
    });

    // Draw cursors on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const id in cursors) {
      const cursor = cursors[id];
      context.beginPath();
      context.fillStyle = `hsl(${cursor.hue}, 100%, 50%)`;
      context.arc(cursor.x, cursor.y, cursor.lineWidth, 0, 2 * Math.PI);
      context.fill();
    }
  }, [cursors]);

  // Send cursor data to server on mouse move
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();
    const x = event.clientX - rect?.left!;
    const y = event.clientY - rect?.top!;
    const hue = Math.floor(Math.random() * 360);
    const lineWidth = Math.floor(Math.random() * 10) + 5;
    socket.emit('cursor', { x, y, hue, lineWidth });
  };

  return (
    <div>
      {typeof window !== 'undefined' &&
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} onMouseMove={handleMouseMove}></canvas>
      }
    </div>
  );
}

export default HompagePage;