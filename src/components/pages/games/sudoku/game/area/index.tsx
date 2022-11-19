import React, { useEffect, useImperativeHandle, useState } from 'react';
import cloneDeep from 'lodash/cloneDeep';

import BoxItem from './box-item';

enum KeyCodes {
  Erase = 8,
  One = 49,
  Nine = 57,
}

interface GameArea {
  blank: Array<Array<number>>,
  filled: Array<Array<number>>,
  componentRef: React.Ref<any>,
}

const GameArea: React.FC<GameArea> = ({ blank, filled, componentRef }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    }
  });

  useImperativeHandle(componentRef, () => ({
    fillItem,
    hintItem,
  }));

  const [hints, setHints] = useState(5);
  const [active, setActive] = useState([-1, -1]);
  const [blankData, setBlankData] = useState(() => cloneDeep(blank));

  const onSetActive = ([row, cell]) => {
    if (active[0] === row && active[1] === cell) {
      return;
    }
    setActive([row, cell]);
  };

  const onKeyDown = (e) => {
    const [row, cell] = active;

    if (row < 0 || cell < 0) {
      return;
    }

    if (e.keyCode === KeyCodes.Erase) {
      fillItem(0);
      return;
    }

    if (e.keyCode >= KeyCodes.One && e.keyCode <= KeyCodes.Nine) {
      fillItem(Number(e.key));
    }
  };

  const fillItem = (value) => {
    const [row, cell] = active;
    const newData = [...blankData];

    newData[row][cell] = value;
    setBlankData(newData);
    checkIsFinish(newData);
  };

  const hintItem = () => {
    if (hints <= 0) {
      return;
    }

    const blocks = [];
    const emptyBlocs = [];
    const newData = [...blankData];

    blankData.forEach((row, index) => {
      const hasEmpty = row.some((item) => !item);

      if (!hasEmpty) {
        blocks[index] = null;
        return;
      }
      emptyBlocs.push(index);
      blocks[index] = row.reduce((prev, item, index) => {
        if (!item) {
          prev.push(index);
        }
        return prev;
      }, []);
    });

    if (!emptyBlocs.length) {
      return;
    }

    const blockIndex = emptyBlocs[Math.round(Math.random() * (emptyBlocs.length-1))];
    const cellIndex = blocks[blockIndex][Math.round(Math.random() * (blocks[blockIndex].length-1))];

    newData[blockIndex][cellIndex] = filled[blockIndex][cellIndex];
    setHints(hints-1);
    setBlankData(newData);
    checkIsFinish(newData);
  };

  const checkIsFinish = (data) => {
    const isFinish = !data.some((itemRow, row) => itemRow.some((item, cell) => filled[row][cell] !== item));

    if (isFinish) {
      alert('You WIN');
    }
  };

  const renderBoxItem = (item, rowIndex, cellIndex) => {
    const [row, cell] = active;

    return (
      <BoxItem
        key={rowIndex+cellIndex}
        value={item}
        origin={blank[rowIndex][cellIndex]}
        filled={filled[rowIndex][cellIndex]}
        active={row === rowIndex && cell === cellIndex}
        onPress={() => onSetActive([rowIndex, cellIndex])}
      />
    );
  };

  return (
    <div className="area">
      {
        blankData.map((item, rowIndex) => (
          <div className="box-area" key={rowIndex}>
            {
              item.map((item, cellIndex) => renderBoxItem(item, rowIndex, cellIndex))
            }
          </div>
        ))
      }
    </div>
  );
}

export default GameArea;
