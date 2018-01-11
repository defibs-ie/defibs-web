import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Spacing, colors, sizes } from 'react-elemental';
import Menu from 'react-icons/lib/md/menu';

import Sidebar, { SIDEBAR_WIDTH } from '../sidebar/Sidebar';

class LayoutContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { isMenuVisible: false };
    this.setMenuVisibility = this.setMenuVisibility.bind(this);
  }

  componentDidMount() {
    window.dispatchEvent(new Event('resize'));
  }

  setMenuVisibility(isMenuVisible) {
    this.setState({ isMenuVisible });
  }

  render() {
    const { children, isCompact, isMap } = this.props;
    const { isMenuVisible } = this.state;

    const baseStyle = {
      backgroundColor: '#1F2629',
      height: '100vh',
      left: 0,
      overflowX: 'hidden',
      overflowY: 'auto',
      position: 'fixed',
      transition: 'all 0.15s ease',
      zIndex: 2,
    };

    const compactStyle = {
      marginLeft: isMenuVisible ? 'inherit' : '-250px',
    };

    const contentMargin = (isCompact && !isMenuVisible) ? '0px' : SIDEBAR_WIDTH;

    const { selectedSidebarItem } = this.props;

    return (
      <div>
        <div style={{
        // maxWidth: '100%',
        position: 'absolute',
        // width: '100%',
        zIndex: 1,
      }}
        >
          <div style={{ ...baseStyle, ...isCompact && compactStyle }}>
            {isCompact && (
            <Spacing top right left>
              <Button
                text="Collapse"
                onClick={() => this.setMenuVisibility(false)}
                style={{
                  width: '100%',
                  ...isMap && { marginTop: '24px' },
                }}
                secondary
              />
            </Spacing>
          )}
            <Sidebar selected={selectedSidebarItem} />
          </div>

          {isCompact && (
          <button
            onClick={() => this.setMenuVisibility(true)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
            }}
          >
            <Spacing
              style={{
                position: 'fixed',
                ...isMap && isCompact && { top: '24px' },
              }}
              top
              left
            >
              <Menu
                style={{
                  color: colors.gray20,
                  cursor: 'pointer',
                  fontSize: sizes.epsilon,
                }}
              />
            </Spacing>
          </button>
        )}

        <div
          style={{
            marginLeft: contentMargin,
            transition: 'all 0.15s ease',
            maxWidth: `calc(100vw - ${contentMargin})`,
            width: '100%',
          }}
          id="outer-thing"
        >
            <Spacing size="huge" left right padding>
              <Spacing size="large" bottom />
              {children}
            </Spacing>
          </div>
        </div>
      </div>
    );
  }
}

LayoutContainer.propTypes = {
  children: PropTypes.node,
  isCompact: PropTypes.bool,
  isMap: PropTypes.bool,
  selectedSidebarItem: PropTypes.string.isRequired,
};

LayoutContainer.defaultProps = {
  children: null,
  isCompact: false,
  isMap: false,
};

function mapState(state) {
  return {
    isCompact: state.context.isCompact,
  };
}

export default connect(mapState)(LayoutContainer);
