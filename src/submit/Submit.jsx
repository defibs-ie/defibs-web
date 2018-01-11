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
    this.resize = this.resize.bind(this);
    this.updateViewport = this.updateViewport.bind(this);
    const width = 0;
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

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  resize() {
    const width = (document.querySelector('#outer-thing').clientWidth);
    const { viewport } = this.state;
    this.setState({ viewport: { ...viewport, width } });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const round = (f) => Math.round(f * 10**6) / 10**6;
    const { notes } = this.props;
    const { viewport: { latitude, longitude } } = this.state;
    const data = {
      notes,
      lat: round(latitude),
      lon: round(longitude),
    };
    this.props.handleSubmit(data);
  }

  updateViewport(viewport) {
    const { viewport: { width } } = this.state;
    const { handleChange } = this.props;

    handleChange('viewport')({ target: { value: 0 } });

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
    const {
      deviceWidth,
      deviceHeight,
      errors,
      handleChange,
      isSubmitting,
      notes,
      pristine,
    } = this.props;

    const { viewport } = this.state;
    // const width = viewport.width;
    // const height = Math.max(200, Math.min(width, 400));
    const width = deviceWidth - 200;
    const height = 200;
    // const width  =0;
    // const height = 0;

    return (
    <Spacing top left right bottom>
      <Text size="beta" bold>Submit a defib</Text>
      <Spacing top bottom>
        <Text>Help us out by submitting a defibrillator location.</Text>
      </Spacing>
      <form id="submit-form">
        <Label
          label="Location"
          sublabel="Move the map under the marker to place this defibrillator."
        />
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
            width={width}
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
