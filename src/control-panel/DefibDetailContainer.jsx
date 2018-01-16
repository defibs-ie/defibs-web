import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spacing, Text } from 'react-elemental';
import TabContainer from './TabContainer';

function DefibDetailContainer(props) {
  const { defib, isCompact } = props;
  return (
    <Spacing>
      <Spacing bottom>
        <Text size="epsilon" bold>
          {defib.address}
        </Text>
      </Spacing>
      <Spacing bottom>
        <Text size="kilo" bold>Notes</Text>
        <Text>
          {defib.notes}
        </Text>
      </Spacing>
      <Spacing bottom>
        {isCompact ? <TabContainer defib={defib} /> : renderPhoto(defib)}
      </Spacing>
    </Spacing>
  );
}

function renderPhoto(defib) {
  if (defib.image) {
    return (
      <img
        alt="Photograph of this defibrillator"
        src={defib.image}
        style={{ width: '100%' }}
      />
    );
  }
  return null;
}

function mapState({ screen }) {
  return {
    isCompact: screen.isCompact,
  };
}

DefibDetailContainer.propTypes = {
  defib: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isCompact: PropTypes.bool.isRequired,
};

export default connect(mapState, {})(DefibDetailContainer);
