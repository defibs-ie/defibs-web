import React, { Component, Fragment } from 'react';
import MapGL from 'react-map-gl';
import {
  Button,
  Label,
  Spacing,
  Spinner,
  Text,
  TextArea,
  TextField,
  colors,
} from 'react-elemental';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Dropzone from './Dropzone';

import { Header, Subheader } from '../page';
import Pin from '../map/Pin';

export default class Submit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    const width = 0;
    this.state = {
      viewport: {
        // width,
        // height: Math.max(200, Math.min(width, 400)),
        // Defaults put us in the centre of Ireland
        latitude: 53.28213993360018,
        longitude: -7.820067649242004,
        zoom: 6,
      },
      email: '',
      notes: '',
    };
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const round = f => Math.round(f * 10 ** 6) / 10 ** 6;
    const { email, notes } = this.props;
    const { viewport: { latitude, longitude } } = this.state;
    const data = {
      email,
      notes,
      lat: round(latitude),
      lon: round(longitude),
    };
    this.props.handleSubmit(data);
  }

  updateViewport(viewport) {
    const { handleChange } = this.props;
    this.setState({ viewport });
  }

  render() {
    const {
      deviceWidth,
      deviceHeight,
      email,
      errors,
      file,
      handleChange,
      handleClear,
      isSubmitting,
      notes,
      onDrop,
      pristine,
    } = this.props;

    const { viewport } = this.state;

    return (
      <Spacing top left right bottom>
        <Header text="Submit a defib" />
        <Subheader text="Help us out by submitting a defibrillator location." />
        <form id="submit-form">
          <Spacing bottom>
            <Label
              label="Your email"
              sublabel="We'll use this to contact you if we have questions about this defib."
            />
            <TextField
              type="email"
              value={email}
              onChange={handleChange('email')}
            />
          </Spacing>
          <Spacing bottom>
            <Label
              label="Photo (optional)"
              sublabel="Upload a photo of the defib"
            />
            <Dropzone
              file={file}
              handleClear={handleClear}
              onDrop={onDrop}
            />
          </Spacing>
          <Spacing bottom>
            <Label
              label="Location"
              sublabel="Move the map under the marker to place this defibrillator."
            />
            <div style={{ width: '100%', height: '300px' }}>
              <AutoSizer>
                {({ height, width }) => (
                  <Fragment>
                    <div style={{
                width,
                height,
                position: 'absolute',
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                pointerEvents: 'none',
              }}
                    >
                      <Pin />
                    </div>
                    <MapGL
                      {...viewport}
                      width={width}
                      height={height}
                      mapboxApiAccessToken={ACCESS_TOKEN}
                      onViewportChange={this.updateViewport}
                    />
                  </Fragment>
              )}
              </AutoSizer>
            </div>
          </Spacing>

          <Spacing bottom>
            <Label label="Notes (optional)" sublabel="Notes about availability, etc." />
            <TextArea value={notes} style={{ width: '100%' }} onChange={handleChange('notes')} />
          </Spacing>

          <Spacing bottom style={{ textAlign: 'right' }}>
            {isSubmitting
            ? <Button><Spinner size="gamma" /></Button>
            : <Button
              disabled={pristine || errors}
              size="alpha"
              text="Submit"
              type="submit"
              onClick={this.handleSubmit}
            />
          }
          </Spacing>

        </form>
      </Spacing>
    );
  }
}
