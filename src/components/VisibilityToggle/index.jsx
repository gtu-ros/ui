import React, { useCallback } from 'react';
import styled from 'styled-components';

const colors = {
  ONLINE: '#4caf50',
  OFFLINE: '#ef5350 ',
  DISABLED: '#757575',
  BLUE: '#03a9f4'
};

const SToggle = styled.label`
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  outline: 0;
  margin: auto;
  padding-bottom: 2px;
  :hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SSpan = styled.span`
  :hover {
    transform: scale(1.2);
  }
`;

function getStyles(status) {
  const size = 10;
  let styles = {
    width: size,
    height: size,
    borderRadius: size / 2
  };

  let color = colors.BLUE;
  switch (status) {
    case 'online':
      color = colors.ONLINE;
      break;
    case 'offline':
      color = colors.OFFLINE;
      break;
    case 'disabled':
      color = colors.DISABLED;
      break;
  }

  return { ...styles, background: color };
}

export default function VisibilityToggle({
  status,
  onAltToggle,
  onShiftToggle,
  onToggle,
  onMouseEnter,
  onMouseLeave
}) {
  // Handle shift + click/enter, option + click/enter, and click/enter.
  const onChange = useCallback(
    (e) => {
      if (onShiftToggle && e.shiftKey) {
        onShiftToggle();
      } else if (onAltToggle && e.altKey) {
        onAltToggle();
      } else {
        onToggle();
      }
    },
    [onAltToggle, onShiftToggle, onToggle]
  );

  return (
    <SToggle
      className="cancel-draggable"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onChange(e);
        }
      }}
      onClick={onChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SSpan style={getStyles(status)} />
    </SToggle>
  );
}
