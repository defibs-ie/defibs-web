import React, { Fragment } from 'react';
import { Spacing, Text } from 'react-elemental';
import { Link } from 'react-router-dom';

import { Header, Subheader } from '../page';

export default function Contact() {
  return (
    <Fragment>
      <Header text="Contact us" />
      <Subheader text="Found a problem? Want to talk?" />
    </Fragment>
  );
}
