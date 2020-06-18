import React from 'react';
import classNames from 'classnames';

import {PlayPauseButton} from './PlayPauseButton'
import {ProgressIndicators} from './ProgressIndicators'
import {TimeDisplay} from './TimeDisplay'

import styles from './ControlBar.module.css';

export function PlayerControls(props) {
  return (
    <div onFocus={props.onFocus}
         onBlur={props.onBlur}
         onMouseEnter={props.onMouseEnter}
         onMouseLeave={props.onMouseLeave}
         className={classNames(styles.controlBarContainer,
                               styles.backgroundColor,
                               {
                                 [styles.inset]: props.inset,
                                 [styles.transparent]: props.isPlaying && props.inset && props.inactive
                               })}>
      <div className={classNames(styles.controlBar,
                                 props.style === 'white' ? styles.foregroundLight : styles.foregroundDark)}>
        <div className={styles.controlsContainer}>
          <div className={styles.controls}>
            <PlayPauseButton isPlaying={props.isPlaying}
                             play={props.play}
                             pause={props.pause}/>
          </div>
        </div>
        <div className={classNames(styles.controlsContainer, styles.progressDisplayContainer)}>
          <div className={styles.controls}>
            <ProgressIndicators currentTime={props.currentTime}
                                duration={props.duration}
                                bufferedEnd={props.bufferedEnd}
                                scrubTo={props.scrubTo}
                                seekTo={props.seekTo}/>
          </div>
        </div>
        <div className={classNames(styles.controlsContainer)}>
          <div className={styles.controls}>
            <TimeDisplay currentTime={props.currentTime}
                         duration={props.duration}/>
          </div>
        </div>
    </div>
  );
}

PlayerControls.defaultProps = {
  currentTime: 200,
  duration: 600,
  bufferedEnd: 400,
  isPlaying: false,

  play: () => {
  },
  pause: () => {
  },
  scrubTo: () => {
  },
  seekTo: () => {
  },

  type: 'video',
  style: 'white',
  inset: false
};
