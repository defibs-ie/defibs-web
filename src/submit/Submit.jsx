import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MapGL from 'react-map-gl';
import {
  Button,
  Label,
  Spacing,
  Spinner,
  TextArea,
  TextField,
  colors,
} from 'react-elemental';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import MyLocation from 'react-icons/lib/md/my-location';
import { geolocated, geoPropTypes } from 'react-geolocated';

import Dropzone from './Dropzone';

import { Header, Subheader } from '../page';
import Pin from '../map/Pin';

class Submit extends Component {
  constructor(props) {
    super(props);
    this.handleMyLocationClick = this.handleMyLocationClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    this.state = {
      viewport: {
        // width,
        // height: Math.max(200, Math.min(width, 400)),
        // Defaults put us in the centre of Ireland
        latitude: 53.28213993360018,
        longitude: -7.820067649242004,
        zoom: 6,
      },
    };
  }

  handleMyLocationClick(evt) {
    evt.preventDefault();
    const { coords: { latitude, longitude } } = this.props;
    this.setState({
      viewport: {
        ...this.state.viewport,
        latitude,
        longitude,
        zoom: Math.max(this.state.viewport.zoom, 15),
      },
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const round = f => Math.round(f * (10 ** 6)) / (10 ** 6);
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
    this.setState({ viewport });
  }

  render() {
    const {
      email,
      errors,
      file,
      handleChange,
      handleClear,
      isGeolocationEnabled,
      isSubmitting,
      notes,
      onDrop,
      pristine,
    } = this.props;

    const { viewport } = this.state;

    return (
      <Spacing top left right bottom>
        <Header text="Submit a defib" />
        <Subheader text="Help us out by submit­ting a defibril­lator location." />
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
              // eslint-disable-next-line max-len
              sublabel="Move the map under the marker to place this defibrillator. Click the crosshairs to zoom to your location."
            />
            <div
              style={{ width: '100%', height: '300px' }}
            >
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
                    {isGeolocationEnabled && (
                      <button
                        style={{
                          background: 'none',
                          border: 'none',
                          color: colors.gray50,
                          cursor: 'pointer',
                          margin: 0,
                          padding: 0,
                          position: 'absolute',
                          top: '10px',
                          right: '10px',
                        }}
                        onClick={this.handleMyLocationClick}
                      >
                        <MyLocation fontSize={36} />
                      </button>
                    )}
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
              disabled={pristine || !!errors.length}
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

Submit.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  file: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isSubmitting: PropTypes.bool.isRequired,
  notes: PropTypes.string.isRequired,
  onDrop: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  ...geoPropTypes,
};

Submit.defaultProps = {
  file: null,
};

export default geolocated()(Submit);
