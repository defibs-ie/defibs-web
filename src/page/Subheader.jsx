import React from 'react';
import PropTypes from 'prop-types';
import { Spacing, Text, colors } from 'react-elemental';

export default function Subheader({ text }) {
  return (
    <Spacing top bottom>
      <Text color={colors.gray70} size="delta">{text}</Text>
    </Spacing>
  );
}

Subheader.propTypes = {
  text: PropTypes.string.isRequired,
};
