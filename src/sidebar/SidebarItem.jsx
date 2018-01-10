import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Spacing, Text, colors } from 'react-elemental';

class SidebarItem extends Component {
  constructor(props) {
    super(props);
    this.state = { isHover: false };
    this.handleHoverChange = this.handleHoverChange.bind(this);
  }

  handleHoverChange(isHover) {
    this.setState({ isHover });
  }

  render() {
    const { label, href, isSelected } = this.props;
    const { isHover } = this.state;

    const backgroundColor = (() => {
      if (isSelected) {
        return colors.gray5;
      }

      if (isHover) {
        return '#2c363b';
      }

      return '#1f2629';
    })();

    return (
      <Link to={href} style={{ textDecoration: 'none' }}>
        <Spacing
          size="small"
          top
          bottom
          padding
          style={{
            backgroundColor,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={() => this.handleHoverChange(true)}
          onMouseLeave={() => this.handleHoverChange(false)}
        >
          <Spacing left right padding>
            <Text
              color={isSelected ? colors.gray70 : colors.gray15}
            >
              {label}
            </Text>
          </Spacing>
        </Spacing>
      </Link>
    );
  }
}

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
};

SidebarItem.defaultProps = {
  isSelected: false,
};

export default withRouter(SidebarItem);
