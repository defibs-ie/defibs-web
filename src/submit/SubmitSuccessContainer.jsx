import React from 'react';
import PropTypes from 'prop-types';
import { Button, Spacing, Text } from 'react-elemental';
import { withRouter } from 'react-router';

import { LayoutContainer } from '../layout';

function SubmitSuccessContainer({ history }) {
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
          <Button
            onClick={() => history.push('/')}
            style={{
                margin: '8px',
              }}
            text="Back to map"
          />
          {' '}
          <Button
            onClick={() => history.push('/submit')}
            style={{
                margin: '8px',
              }}
            text="Submit another"
          />
        </Spacing>
      </Spacing>
    </LayoutContainer>
  );
}

SubmitSuccessContainer.propTypes = {
  history: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withRouter(SubmitSuccessContainer);
