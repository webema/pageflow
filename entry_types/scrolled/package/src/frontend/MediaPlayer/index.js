import React, {useEffect, useContext, useRef} from 'react';
import PlayerContainer from './PlayerContainer';
import ScrollToSectionContext from "../ScrollToSectionContext";
import {useMediaSettings} from '../useMediaSettings';
import watchPlayer from './watchPlayer';
import { applyPlayerState } from './applyPlayerState';
import { updatePlayerState } from './updatePlayerState';

export * from './usePlayerState';

export function MediaPlayer(props){
  let playerRef = useRef();
  let previousPlayerState = useRef(props.playerState);
  let scrollToSection = useContext(ScrollToSectionContext);
  let mediaSettings = useMediaSettings();

  let onSetup = (newPlayer)=>{
    playerRef.current = newPlayer;
    newPlayer.on('ended', () => props.nextSectionOnEnd && scrollToSection('next'));
    
    watchPlayer(newPlayer, props.playerActions);
    applyPlayerState(newPlayer, props.playerState, props.playerActions)
  }

  let onDispose = ()=>{
    playerRef.current = undefined;
    props.playerActions.discardMediaElementId();
  }

  useEffect( () => {
    let player = playerRef.current
    previousPlayerState.current = props.playerState;
    if (player) {
      updatePlayerState(player, previousPlayerState.current, props.playerState, props.playerActions, props.state, props.autoplay, mediaSettings.mediaOff);
    }
  }, [mediaSettings.mediaOff, props.autoplay, props.state, props.playerState, props.playerActions, playerRef]);

  return (
    <PlayerContainer  className={props.className}
                      type={props.type}
                      sources={props.sources}
                      poster={props.poster}
                      loop={props.loop}
                      controls={props.controls}
                      playsInline={props.playsInline}
                      onSetup={onSetup}
                      onDispose={onDispose} />
  );
};