import React from 'react';

import { LayoutContainer } from '../layout';
import Contact from './Contact';

function ContactContainer() {
  return (
    <LayoutContainer selectedSidebarItem="contact">
      <Contact />
    </LayoutContainer>
  );
}

export default ContactContainer;
