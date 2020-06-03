import React from 'react';
import {storiesOf} from '@storybook/react';

import {PlayerControls} from 'pageflow-scrolled/frontend';

const stories = storiesOf('Frontend/Player Controls', module);

function addControlbarStory(name, type, style) {
  stories.add(
    name,
    () => {
      return (
        <div style={{fontFamily: 'Source Sans Pro, sans-serif'}}>
          <div style={{background: 'rgba(0, 0, 0, 0.6)', width: '100%', height: '150px'}}></div>
          <PlayerControls type={type} style={style}/>
        </div>
      );
    },
    {
      percy: {skip: false}
    }
  );
}

addControlbarStory('Basic Controls', 'video', 'white');
addControlbarStory('Inverted Version', 'video', 'black');