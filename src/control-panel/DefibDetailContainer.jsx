import React from 'react';
import { Spacing, Text } from 'react-elemental';

export default function DefibDetailContainer(props) {
  const { defib } = props;
  return (
  <Spacing>
    <Text size="epsilon" bold>Notes</Text>
    <Text>
      {defib.notes}
    </Text>
  </Spacing>
  );
}
