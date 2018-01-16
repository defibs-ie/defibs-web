import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Spacing, Text, colors } from 'react-elemental';

import { Header, Subheader } from '../page';

export default function AboutPage(props) {
  const { contributors } = props;
  return (
    <Spacing top left right bottom style={{ textAlign: 'justify', hyphens: 'manual' }}>
      <Header text="About defibs.ie" />
      <Subheader
        text="We're building a map of all the publicly-accessible defibrillators in Ireland."
      />
      <Spacing top bottom>
        <Text color={colors.gray70} size="epsilon">
          What's the story?
        </Text>
        <Spacing top size="tiny">
          <Text>
            Automated external de­fibrillators (AEDs) are pretty handy.
            That's why we install them in the places where we work, shop, and socialize.
            They're like pizza cutters: when you need one, nothing else will do.
            It's a good idea to know where your nearest AED is,
            but they can be hard to find, especially when you need them the most.
          </Text>
        </Spacing>
        <Spacing top size="tiny">
          <Text>
            It seems like it would be a pretty good idea to have a map that you
            could look at on your smartphone to show you the nearest AED.
            So, with your help, we're making one.
          </Text>
        </Spacing>
      </Spacing>
      <Spacing top bottom>
        <Text color={colors.gray70} size="epsilon">
          Is this an official thing?
        </Text>
        <Spacing top size="tiny">
          <Text>
            Nope, not at all. Information on this website is provided by
            helpful people on the Internet who agree that a map of Irish AEDs
            is a good idea. While we do our best to confirm the information
            we're given, AEDs are sometimes stolen, de­commissioned, or simply
            left to deteriorate without our knowledge.
          </Text>
          <Spacing top size="tiny">
            <Text>
              It's your responsibility to know where your nearest AED is when
              you're at home, at work, or elswhere.  If we can help, we're
              happy.
            </Text>
          </Spacing>
        </Spacing>
      </Spacing>
      <Spacing top bottom>
        <Text color={colors.gray70} size="epsilon">
          Why would you do something like this?
        </Text>
        <Spacing top size="tiny">
          <Text>
            We wanted it, and it wasn't there. Now it is.
            We've done more pointless things in our lives, believe us.
          </Text>
        </Spacing>
      </Spacing>
      <Spacing top bottom>
        <Text color={colors.gray70} size="epsilon">
          There's a defib missing from your map!
        </Text>
        <Spacing top size="tiny">
          <Text>
            Very likely. Would you like to fix that?  If you have a smartphone
            with Internet access, you can head to our
            {' '}
            <Link to="/submit">submission page</Link>
            {' '}
            and make defibs.ie better.
          </Text>
        </Spacing>
      </Spacing>
      <Spacing top bottom>
        <Text color={colors.gray70} size="epsilon">
          This sounds amazing! How can I help?
        </Text>
        <Spacing top size="tiny">
          <Text>
            Thanks! It's not really a big deal, though.
            You can help out by
            {' '}
            <Link to="/submit">
              submitting a missing de­fibril­lator location
            </Link>.
            {' '}
            Nobody's getting rich out of this; when the time comes to pass around the cap
            to keep the lights on, we'll let you know.
          </Text>
        </Spacing>
      </Spacing>
      <Spacing top bottom>
        <Text color={colors.gray70} size="epsilon">
            Who's to blame?
        </Text>
        <Spacing top size="tiny">
          <Text>
            defibs.ie is supported by the people who think it's a good idea.
            We're grateful to the good folks at
            {' '}
            <a href="http://digitalfix.ie/" target="_blank" rel="noopener noreferrer">
              Digital Fix
            </a>
            {' '}
              for IT support and whatnot.
          </Text>
        </Spacing>
      </Spacing>
      {false && (
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
      )}
    </Spacing>
  );
}

AboutPage.propTypes = {
  contributors: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

AboutPage.defaultProps = {
  contributors: [],
};
