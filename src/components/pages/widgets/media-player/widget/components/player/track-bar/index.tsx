import React from 'react';

import Slider from '@mui/material/Slider';

import { mergeClassNames } from '@utils/common';
import { formatDuration } from '../../../utils/common';

import styles from './style.module.scss';

interface IEventMessageData {
  data: {
    type: string,
    body: {
      data: {
        name: string,
        eventData: {
          position: number
          track_window?: any
        }
      }
    }
  }
}

interface ITrackBar {
  trackUri: string
  loading: boolean,
  paused: boolean,
  duration: number,
  position: number,
  changePosition: (value) => void,
}

class TrackBar extends React.Component<ITrackBar, any> {
  static getDerivedStateFromProps(props, state) {
    if (props.trackUri === state.trackUri) {
      return null;
    }
    return {
      value: props.position,
      trackUri: props.trackUri,
    }
  };

  static defaultProps = {
    position: 0,
    duration: 0,
    paused: true,
    loading: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      trackUri: props.trackUri,
      value: props.position,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.onMessageReceive);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.onMessageReceive);
  }

  onMessageReceive = (event: IEventMessageData) => {
    if (!event.data || event.data.type !== 'SP_MESSAGE') {
      return;
    }

    if (this.props.loading && this.state.value) {
      this.setState({ value: 0 });
      return;
    }

    if (['PLAYER_STATE_CHANGED', 'PROGRESS'].includes(event.data.body?.data?.name)) {
      if (this.props.loading || this.state.value === event.data.body.data?.eventData?.position || !event.data.body.data?.eventData) {
        return;
      }
      this.setState({
        value: event.data.body.data?.eventData?.position
      });
    }
  };

  onChange = (e, value) => {
    this.setState({ value });
    this.props.changePosition(value);
  };

  render() {
    const { value } = this.state;
    const { duration } = this.props;
    // console.log(this.state.uri, this.props.trackUri);

    return (
      <div className={styles.trackBar}>
        <label className={styles.timeValue}>
          { formatDuration(value) }
        </label>
        <Slider
          aria-label="track-slider"
          value={value}
          min={0}
          step={duration/500}
          max={duration}
          onChange={this.onChange}
          classes={{
            root: styles.muiRoot,
            track: styles.muiTrack,
            rail: styles.muiTrackRail,
            thumb: styles.muiThumb,
            focusVisible: styles.muiThumbFocus
          }}
        />
        <label className={mergeClassNames([styles.timeValue, styles.odd])}>
          { formatDuration(duration) }
        </label>
      </div>
    );
  }
}

export default TrackBar;
