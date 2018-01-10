import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text } from 'react-elemental';
import { SIDEBAR_BACKGROUND_COLOR } from './colors';

export default function Heading({ text }) {
  const backgroundColor = SIDEBAR_BACKGROUND_COLOR;
  return (
    <Spacing left padding style={{ backgroundColor }}>
      <Spacing size="small" top bottom padding>
        <Text style={{ letterSpacing: '1px' }} color="gray50" size="kilo" uppercase bold>
          {text}
        </Text>
      </Spacing>
    </Spacing>
  );
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};
