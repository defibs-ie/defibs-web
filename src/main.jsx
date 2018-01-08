import React from 'react';
import ReactDOM from 'react-dom';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken: ACCESS_TOKEN,
});

ReactDOM.render(
  <Map
    style="mapbox://styles/mapbox/dark-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw',
    }}
  />,
  document.querySelector('#react-root'),
);
