import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text } from 'react-elemental';

import { LayoutContainer } from '../layout';
import Submit from './Submit';
import { submitDefib } from './actions';

class SubmitContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.resize = this.resize.bind(this);
    this.state = {
      notes: '',
      width: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleChange(which) {
    return ({ target: { value } }) =>  this.setState({ [which]: value });
  }

  resize() {
    console.info('sc resize');
    console.info(this.submitComponent.clientWidth);
    this.setState({
      width: this.submitComponent.clientWidth
    });
  }

  render() {
    const { isSubmitting } = this.props;
    const { notes, width } = this.state;

    return (
      <LayoutContainer
        selectedSidebarItem="submit"
      >
        <div
          ref={c => this.submitComponent = c} style={{ width: '100%' }}
          style={{ width: '100%', maxWidth: '100%' }}
        >
          <Submit
            handleChange={this.handleChange}
            notes={notes}
            width={width}
            isSubmitting={isSubmitting}
            submitDefib={this.props.submitDefib}
          />
      </div>
      </LayoutContainer>
    );
  }
}

function mapState({ submit: { isSubmitting } }) {
  return {
    isSubmitting,
  };
}

export default connect(mapState, { submitDefib })(SubmitContainer);
