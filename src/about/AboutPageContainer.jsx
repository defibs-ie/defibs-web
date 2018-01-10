import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LayoutContainer } from '../layout';
import AboutPage from './AboutPage';

export default class AboutPageContainer extends Component {
  componentDidMount() {
  }

  render() {
    const { contributors } = this.props;

    return (
      <LayoutContainer selectedSidebarItem="about">
        <AboutPage contributors={contributors} />
      </LayoutContainer>
    );
  }
}

AboutPageContainer.propTypes = {
  contributors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

AboutPageContainer.defaultProps = {
  contributors: null,
};
