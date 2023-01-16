import React from 'react';
import debounce from 'lodash/debounce';

import Matrix from '@pages/games/nonogram/game/area/matrix';
import Tooltip from '@pages/games/nonogram/game/area/tooltip';

import { Action, EBoxState, GameContext, IState, TDispatch } from '@pages/games/nonogram/game/context';
import { EMouseButton } from '@shared/enums/web-ui';

const TooltipAxisOffset = {
  x: 50,
  y: 40,
};

enum EFlow {
  HORIZONTAL,
  VERTICAL
}

interface IArea {
  size: [v: number, h: number],
  blank: Array<Array<number>>,
  onBoxHover: (row, cell) => void,
}

class Area extends React.Component<IArea, null> {
  private readonly tooltipRef: React.RefObject<any>;
  private readonly onCheckIsDoneDebounce: () => void;
  private drawMode: { horizontal: any[]; startBox: any[]; active: boolean; filled: null; vertical: any[]; position: any[]; flow: number };
  declare public context: [IState, TDispatch];

  private static invertValue = (value: EBoxState) => {
    switch (value) {
      case EBoxState.Cross:
      case EBoxState.Filled: {
        return EBoxState.Empty
      }
      case EBoxState.Empty: {
        return EBoxState.Filled;
      }
      default:
        return EBoxState.Empty;
    }
  }

  constructor(props) {
    super(props);

    this.tooltipRef = React.createRef();
    this.drawMode = {
      active: false,
      startBox: [],
      position: [],
      filled: null,
      flow: -1,
      horizontal: [],
      vertical: [],
    };
    this.onCheckIsDoneDebounce = debounce(this.onCheckIsDone, 200, { leading: false, trailing: true });
  }

  componentDidUpdate(prevProps: Readonly<IArea>, prevState: Readonly<null>) {
    this.onCheckIsDoneDebounce();
  };

  componentDidMount() {
    // TODO: for future test
    //this.fillAllBox();
  }

  // private fillAllBox = () => {
  //   const [state, dispatch] = this.context;
  //   const blank = state.matrix.map((item) => item.slice());
  //
  //   // set wrong item-box
  //   blank[0][4] = 0;
  //   dispatch({
  //     type: Action.UPDATE_BLANK,
  //     payload: blank
  //   });
  // };

  private stopDrawMode = () => {
    this.drawMode.active = false;
    this.drawMode.startBox = [];
    this.drawMode.horizontal = [];
    this.drawMode.vertical = [];
    this.drawMode.flow = -1;
    this.tooltipRef.current.classList.add('hidden');
  };

  private onBoxEnter = (row, cell) => {
    this.props.onBoxHover(row, cell);

    if (!this.drawMode.active) {
      return false;
    }
    this.tooltipRef.current.classList.remove('hidden');

    if (this.drawMode.startBox[0] === row || this.drawMode.startBox[1] === cell) {
      this.setDrawData(row, cell);
      return;
    }
    this.stopDrawMode();
  };

  private setDrawData = (row, cell) => {
    if (this.drawMode.flow < 0) {
      this.drawMode.flow = this.drawMode.startBox[0] === row ? EFlow.HORIZONTAL : EFlow.VERTICAL;
    }

    const value = this.drawMode.flow === EFlow.HORIZONTAL
      ? this.drawMode.startBox[1] - cell
      : this.drawMode.startBox[0] - row;

    if (!value) {
      this.drawByAxis(row, cell, value);
      this.tooltipRef.current.classList.add('hidden');
      return;
    }
    this.tooltipRef.current.innerHTML = Math.abs(value)+1;
    this.drawByAxis(row, cell, value);
  };

  private drawByVertical = (row, cell, value) => {
    if (!value) {
      if (!this.drawMode.filled) {
        return;
      }
      this.fillItemBox(this.drawMode.vertical[0], cell, Area.invertValue(this.drawMode.filled));
      this.drawMode.vertical.pop();
      return;
    }

    if (this.drawMode.vertical.includes(row)) {
      if (!this.drawMode.filled) {
        return;
      }
      this.fillItemBox(this.drawMode.vertical.pop(), cell, Area.invertValue(this.drawMode.filled));
      return;
    }

    this.drawMode.vertical.push(row);
    this.fillItemBox(row, cell, this.drawMode.filled);
  };

  private drawByHorizontal = (row, cell, value) => {
    if (!value) {
      if (!this.drawMode.filled) {
        return;
      }
      this.fillItemBox(row, this.drawMode.horizontal[0], Area.invertValue(this.drawMode.filled));
      this.drawMode.horizontal.pop();
      return;
    }

    if (this.drawMode.horizontal.includes(cell)) {
      if (!this.drawMode.filled) {
        return;
      }
      this.fillItemBox(row, this.drawMode.horizontal.pop(), Area.invertValue(this.drawMode.filled));
      return;
    }

    this.drawMode.horizontal.push(cell);
    this.fillItemBox(row, cell, this.drawMode.filled);
  };

  private fillItemBox = (row, cell, value) => {
    if (isNaN(row) || isNaN(cell)) {
      return;
    }
    const [, dispatch] = this.context;

    dispatch({
      type: Action.FILL_BOX,
      payload: {
        row, cell, value
      }
    });
  };

  private drawByAxis = (row, cell, value) => {
    this.drawMode.flow === EFlow.HORIZONTAL
      ? this.drawByHorizontal(row, cell, value)
      : this.drawByVertical(row, cell, value)
  };


  private onCheckIsDone = () => {
    const [state, dispatch] = this.context;
    const isDone = !state.matrix.some((row, i) =>
      row.some((cell, j) => {
        if (state.blank[i][j] === 1 && !cell) {
          return true;
        }
        return (cell === 1 && state.blank[i][j] !== cell);
      })
    );

    if (!state.isFinish && isDone) {
      dispatch({ type: Action.SET_FINISH, payload: isDone });
    }
  };

  public onContextMenu = (e) => {
    e.preventDefault();
  };

  public onMouseDown = (e) => {
    if (e.button === EMouseButton.MIDDLE) {
      return false;
    }
    const { row, cell } = e.target.dataset;

    if (!row || !cell) {
      return;
    }
    const { blank } = this.props;
    let value;

    switch (e.button) {
      case EMouseButton.RIGHT: {
        value = blank[+row][+cell] === EBoxState.Cross ? EBoxState.Empty : EBoxState.Cross;
        break;
      }
      case EMouseButton.LEFT: {
        value = blank[+row][+cell] === EBoxState.Filled ? EBoxState.Empty : EBoxState.Filled;
      }
    }
    if (!this.drawMode.active) {
     this.fillItemBox(row, cell, value);
    }

    this.drawMode.active = true;
    this.drawMode.filled = value;
    this.drawMode.startBox = [+row, +cell];
  };

  public onMouseUp = () => {
    this.stopDrawMode();
  };

  public onMouseLeave = () => {
    this.props.onBoxHover(-1, -1);
    this.stopDrawMode();
  };

  public onMouseMove = (e) => {
    if (!this.drawMode.active) {
      return;
    }
    this.drawMode.position[EFlow.HORIZONTAL] = e.clientX;
    this.drawMode.position[EFlow.VERTICAL] = e.clientY;

    this.tooltipRef.current.style.left = e.clientX - TooltipAxisOffset.x + 'px';
    this.tooltipRef.current.style.top = e.clientY - TooltipAxisOffset.y + 'px';
  }

  render() {
    const { size, blank } = this.props;

    return (
      <div
        className="area"
        onMouseUp={this.onMouseUp}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        onContextMenu={this.onContextMenu}
      >
        <Tooltip tooltipRef={this.tooltipRef} />
        <Matrix
          size={size}
          blank={blank}
          onBoxEnter={this.onBoxEnter}
        />
      </div>
    )
  }
}

Area.contextType = GameContext;

export default Area;
