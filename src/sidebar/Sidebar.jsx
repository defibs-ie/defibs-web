import React from 'react';
import PropTypes from 'prop-types';
import { Spacing } from 'react-elemental';

import Heading from './Heading';
import SidebarList from './SidebarList';

export const SIDEBAR_WIDTH = '230px';

const SIDEBAR_ITEM_LIST = [
  { value: 'home', label: 'Home', href: '/' },
  { value: 'about', label: 'About', href: '/about' },
];

export default function Sidebar(props) {
  const { selected } = props;

  return (
    <Spacing size="small" top padding>
      <Spacing size="small" bottom>
        <Heading text="defibs.ie" />
        <SidebarList items={SIDEBAR_ITEM_LIST} selected={selected} />
      </Spacing>
    </Spacing>
  );
}

Sidebar.propTypes = {
  selected: PropTypes.string.isRequired,
};
