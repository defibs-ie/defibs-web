import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Text } from 'react-elemental';

import { LayoutContainer } from '../layout';
import Submit from './Submit';
import { submitDefib } from './actions';

class SubmitContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      email: '',
      notes: '',
      pristine: true,
      width: 0,
    };
  }

  componentDidMount() {
    console.info(this.props);
    console.info(`SubmitContainer.componentDidMount(): ${this.props.width} x ${this.props.height}`);
    window.dispatchEvent(new Event('resize'));
  }

  componentDidUpdate() {
  }

  handleChange(which) {
    return ({ target: { value } }) =>  this.setState({
      pristine: false,
      [which]: value,
    });
  }

  handleSubmit(data) {
    const { history } = this.props;
    this.props.submitDefib(data)
      .then(() => history.push('/submit-success'));
  }

  render() {
    const { isSubmitting } = this.props;
    const { email, notes, pristine, width } = this.state;

    console.info(`SubmitContainer.componentDidMount(): ${this.props.width} x ${this.props.height}`);

    return (
      <LayoutContainer
        selectedSidebarItem="submit"
      >
        <div
          id="referenceWidth"
          ref={c => this.submitComponent = c}
        >
          <Submit
            email={email}
            handleChange={this.handleChange}
            notes={notes}
            pristine={pristine}
            isSubmitting={isSubmitting}
            handleSubmit={this.handleSubmit}
            deviceWidth={this.props.width}
            deviceHeight={this.props.height}
          />
        </div>
      </LayoutContainer>
    );
  }
}

function mapState({
  context,
  submit: { isSubmitting },
}) {
  return {
    ...context,
    isSubmitting,
  };
}

export default connect(mapState, { submitDefib })(SubmitContainer);
