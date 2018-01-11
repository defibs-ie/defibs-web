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
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = {
      email: '',
      notes: '',
      file: null,
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

  handleClear(evt) {
    evt.stopPropagation();
    this.setState({ file: null });
  }

  handleSubmit(data) {
    const { history } = this.props;
    const { file } = this.state;

    this.props.submitDefib({ ...data, file })
      .then(() => history.push('/submit-success'));
  }

  onDrop(files) {
    const file = files[0];
    console.info('onDrop');
    console.info(files[0]);
    const formData = new FormData();
    formData.append('file', file);
    this.setState({ formData });
    this.setState({ file });
  }

  render() {
    const { isSubmitting } = this.props;
    const { email, file, notes, pristine, width } = this.state;

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
            file={file}
            handleChange={this.handleChange}
            handleClear={this.handleClear}
            notes={notes}
            onDrop={this.onDrop}
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
