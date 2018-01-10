import React from 'react';
import PropTypes from 'prop-types';
import SidebarItem from './SidebarItem';
import { SIDEBAR_WIDTH } from './Sidebar';

export default function SidebarList(props) {
  const { items, selected } = props;
  return (
    <div style={{ width: SIDEBAR_WIDTH }}>
      {items.map(({ value, label, href }) => (
        <SidebarItem
          key={value}
          label={label}
          href={href}
          isSelected={value === selected}
        />
      ))}
    </div>
  );
}

SidebarList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
  selected: PropTypes.string.isRequired,
};
