import React, { Component } from 'react';
import MapGL from 'react-map-gl';
import {
  Button,
  Label,
  Spacing,
  Spinner,
  Text,
  TextArea,
  TextField,
} from 'react-elemental';
import Pin from '../map/Pin';

export default class Submit extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    const { width } = props;
    this.state = {
      viewport: {
        width,
        height: Math.max(200, Math.min(width, 400)),
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
    const { notes } = this.props;
    const { viewport: { latitude, longitude } } = this.state;
    const data = {
      notes,
      lat: latitude,
      lon: longitude,
    };
  }

  updateViewport(viewport) {
    const { width } = this.props;
    const height = Math.min(
      window.innerHeight - 48,
      Math.max(200, Math.min(width, 400)),
    );
    this.setState({ viewport: {
        ...viewport,
        width,
        height,
      }
    });
  }

  render() {
    const { handleChange, isSubmitting, notes, width } = this.props;
    const { viewport } = this.state;
    const height = Math.max(200, Math.min(width, 400));

    return (
    <Spacing top left right bottom style={{ maxWidth: '36em' }}>
      <Text size="beta">Submit</Text>
      <Spacing top bottom>
        <Text>Help us out by submitting a defibrillator location.</Text>
      </Spacing>
      <form>
        <Text>Drag the map around to place the defib marker.</Text>
        <Spacing bottom>
          <div style={{
            width,
            height,
            position: 'absolute',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            pointerEvents: 'none',
          }}>
            <Pin />
          </div>
          <MapGL
            {...viewport}
            width={width - 24}
            height={height}
            mapboxApiAccessToken={ACCESS_TOKEN}
            onViewportChange={this.updateViewport}
          />
        </Spacing>

        <Spacing bottom>
          <Label label="Notes" sublabel="Optional notes about availability" />
          <TextArea value={notes} style={{ width: '100%' }} onChange={handleChange('notes')} />
        </Spacing>

        <Spacing bottom style={{ textAlign: 'right' }}>
          {isSubmitting
            ? <Button><Spinner size="gamma" /></Button>
            : <Button
              size="alpha"
              text="Submit"
              type="button"
              onClick={this.handleSubmit}
            />
          }
        </Spacing>

      </form>
    </Spacing>
    );
  }
}
