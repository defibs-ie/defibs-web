import React, { Fragment } from 'react';
import { Link, Spacing, Text } from 'react-elemental';

import Github from 'react-icons/lib/fa/github';
import Twitter from 'react-icons/lib/fa/twitter';

import { Header, Subheader } from '../page';

export default function Contact() {
  return (
    <Fragment>
      <Header text="Contact us" />
      <Subheader text="Found a problem? Want to talk?" />
      <Spacing top>
        <Text>
          We're working on a contact form.
          For the time being, shout at us on Twitter. We're
          <Link href="https:twitter.com/defibs_ie/">defibs_ie</Link>.
        </Text>
      </Spacing>
      <Spacing top>
        <Link href="https://twitter.com/defibs_ie" type="plain" target="_blank">
          <Twitter size={30} />
        </Link>
        <Link href="https://github.com/defibs-ie" type="plain" target="_blank">
          <Github size={30} />
        </Link>
      </Spacing>
    </Fragment>
  );
}
