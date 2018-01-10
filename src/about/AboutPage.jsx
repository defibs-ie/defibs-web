import React from 'react';
import { Spacing, Text, colors } from 'react-elemental';

export default function AboutPage() {
  return (
    <Spacing top left right bottom>
      <Text size="beta" bold>
        About defibs.ie
      </Text>
      <Text color={colors.gray70} size="epsilon">
        We're building a map of all the defibrillators in Ireland.
      </Text>
      <Spacing top>
        <Text>
          You could probably help us, if we had finished coding the submission form.
        </Text>
      </Spacing>
    </Spacing>
  );
}
