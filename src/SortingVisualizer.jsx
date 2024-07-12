import React, { useState, useEffect, useRef } from 'react';

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [moves, setMoves] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    init();
  }, []);

  function init() {
    const n = 9;
    const newArray = [];
    for (let i = 0; i < n; i++) {
      newArray[i] = Math.floor(Math.random() * (11 - 1) + 1);
    }
    setArray(newArray);
    showBars();
  }

  function play() {
    const copy = [...array];
    const moves = bubbleSort(copy);
    animate(moves);
  }

  function animate(moves) {
    if (moves.length === 0) {
      showBars();
      return;
    }
    const move = moves.shift();
    const [i, j] = move.indices;
    if (move.type === 'swap') {
      [array[i], array[j]] = [array[j], array[i]];
    }
    showBars(move);
    setTimeout(() => {
      animate(moves);
    }, 200);
  }

  function bubbleSort(arr) {
    const moves = [];
    let swapped = false;
    do {
      swapped = false;
      for (let i = 1; i < arr.length; i++) {
        moves.push({ indices: [i - 1, i], type: 'comp' });
        if (arr[i - 1] > arr[i]) {
          swapped = true;
          moves.push({ indices: [i - 1, i], type: 'swap' });
          [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
        }
      }
    } while (swapped);
    return moves;
  }

  function showBars(move) {
    if (!containerRef.current) {
      return;
    }
    containerRef.current.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
      const bar = document.createElement('div');
      bar.style.height = `${array[i] * 10}%`;
      bar.classList.add('bar');
      bar.textContent = Math.floor(array[i] * 10);
      if (move && move.indices.includes(i)) {
        bar.style.backgroundColor = move.type === 'swap' ? 'red' : 'green';
      }
      containerRef.current.appendChild(bar);
    }
  }

  return (
    <div className="main_container">
      <div id="container" ref={containerRef} />
      <div>
        <button className="btn" id="generate" onClick={init}>
          Generate Array ✨
        </button>
        <button className="btn" id="play" onClick={play}>
          Sort 🔥
        </button>
      </div>
    </div>
  );
}

export default SortingVisualizer;