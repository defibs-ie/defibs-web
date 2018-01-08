import React from 'react';
import { Spacing, Text } from 'react-elemental';

export default function DefibDetailContainer(props) {
  const { defib } = props;
  console.info(defib);
  return (
  <Spacing>
    <Spacing bottom>
      <Text size="epsilon" bold>
        {defib.address}
      </Text>
    </Spacing>
    <Text size="kilo" bold>Notes</Text>
    <Text>
      {defib.notes}
    </Text>
  </Spacing>
  );
}
