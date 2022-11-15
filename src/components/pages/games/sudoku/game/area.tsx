import React from 'react';

const GameArea = () => {
  return (
    <div className="area">
      {
        Array(9).fill(1).map((item, index) => (
          <div className="box-area" key={index}>
            {
              Array(9).fill(1).map((item, index) => (
                <div className="box-item" key={index}> </div>
              ))
            }
          </div>
        ))
      }
    </div>
  );
}

export default GameArea;
