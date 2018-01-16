import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-elemental';

export default function Header({ text }) {
  return <Text size="beta" bold>{text}</Text>;
}

Header.propTypes = {
  text: PropTypes.string.isRequired,
};
