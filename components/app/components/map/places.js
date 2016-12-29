
import React, { Component} from 'react';

import {PlaceStyle} from './places_style.js';

export default class Places extends Component {



  render() {
    return (
       <div style={PlaceStyle}>
          {this.props.text}
       </div>
    );
  }
}