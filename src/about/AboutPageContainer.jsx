import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LayoutContainer } from '../layout';
import AboutPage from './AboutPage';
import { fetchContributorList } from '../contributors/actions';

class AboutPageContainer extends Component {
  componentDidMount() {
    this.props.fetchContributorList();
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
  fetchContributorList: PropTypes.func.isRequired,
};

AboutPageContainer.defaultProps = {
  contributors: [],
};

function mapState({ contributors }) {
  return {
    contributors: contributors.contributorList,
  };
}

export default connect(mapState, { fetchContributorList })(AboutPageContainer);
