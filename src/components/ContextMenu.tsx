// src/components/ContextMenu.tsx
import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  padding: 8px;
  border-radius: 5px;
`;

interface ContextMenuProps {
  x: number;
  y: number;
  onCreateFolder: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onCreateFolder }) => {
  return (
    <Menu style={{ top: y, left: x }}>
      <button onClick={onCreateFolder}>Create Folder</button>
    </Menu>
  );
};

export default ContextMenu;
