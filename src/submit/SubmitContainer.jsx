import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LayoutContainer } from '../layout';
import Submit from './Submit';
import { submitDefib } from './actions';

class SubmitContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.state = {
      email: '',
      notes: '',
      file: null,
      pristine: true,
    };
  }

  handleChange(which) {
    return ({ target: { value } }) => this.setState({
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

    const {
      email, lat, lon, notes,
    } = data;

    // Build a FormData object so that we can send an image along with
    // the other data
    const formData = new FormData();
    // formData.append('data', data);
    formData.append('file', file);
    formData.append('email', email || null);
    formData.append('lat', lat);
    formData.append('lon', lon);
    formData.append('notes', notes || '');

    // Send and redirect to the 'thanks' page
    this.props.submitDefib(formData)
      .then(() => history.push('/submit-success'));
  }

  handleDrop(files) {
    // file is a File (although typeof returns 'object', thanks)
    const file = files[0];
    this.setState({ file });
  }

  render() {
    const { isSubmitting } = this.props;
    const {
      email, file, notes, pristine,
    } = this.state;

    return (
      <LayoutContainer
        selectedSidebarItem="submit"
      >
        <div
          id="referenceWidth"
          ref={(c) => { this.submitComponent = c; }}
        >
          <Submit
            email={email}
            file={file}
            handleChange={this.handleChange}
            handleClear={this.handleClear}
            notes={notes}
            onDrop={this.handleDrop}
            pristine={pristine}
            isSubmitting={isSubmitting}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </LayoutContainer>
    );
  }
}

SubmitContainer.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isSubmitting: PropTypes.bool.isRequired,
  submitDefib: PropTypes.func.isRequired,
};

function mapState({ submit: { isSubmitting } }) {
  return {
    isSubmitting,
  };
}

export default connect(mapState, { submitDefib })(SubmitContainer);
