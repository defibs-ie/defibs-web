import React from 'react';
import { Spacing, Text, colors } from 'react-elemental';

export default function AboutPage(props) {
  const { contributors } = props;
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
      <Spacing top>
        <Text size="epsilon">Hall of Fame</Text>
        <table style={{ width: '100%' }}>
          <tbody>
            {contributors.map(contributor => (
              <tr key={contributor.name}>
                <td>
                  <Text>{contributor.name}</Text>
                </td>
                <td>
                  <Text>{contributor.defib_count}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Spacing>
    </Spacing>
  );
}
