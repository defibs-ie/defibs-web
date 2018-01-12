import React from 'react';
import { Spacing, Text, colors } from 'react-elemental';

export default function Subheader({ text }) {
  return (
    <Spacing top>
      <Text color={colors.gray70} size="delta">{text}</Text>
    </Spacing>
  );
}
