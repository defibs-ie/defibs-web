import React, { Component } from 'react';
import { Button, Spacing, Text } from 'react-elemental';
import { withRouter } from 'react-router';

import { LayoutContainer } from '../layout';

class SubmitSuccessContainer extends Component {
  render() {
    const { history } = this.props;
    return (
      <LayoutContainer selectedSidebarItem="submit">
        <Spacing top left right bottom>
          <Text size="beta" bold>
            Thanks!
          </Text>
          <Spacing top>
            <Text>
              Your submission is in the queue.
              If we need more details, we'll contact you at the email address you supplied.
            </Text>
          </Spacing>
          <Spacing top>
            <Button onClick={() => history.push('/')} text="Back to map" />
            {' '}
            <Button onClick={() => history.push('/submit')} text="Submit another" />
          </Spacing>
        </Spacing>
      </LayoutContainer>
    );
  }
}

export default withRouter(SubmitSuccessContainer);
