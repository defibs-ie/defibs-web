import React, { Component } from 'react';
import { Spacing, Text } from 'react-elemental';

import { LayoutContainer } from '../layout';

class SubmitSuccessContainer extends Component {
  render() {
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
        </Spacing>
      </LayoutContainer>
    );
  }
}

export default SubmitSuccessContainer;
