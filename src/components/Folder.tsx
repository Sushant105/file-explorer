import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

const FolderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }
`;

const FolderIcon = styled.img`
  width: 80px;
  height: 80px;
`;

const FolderName = styled.div`
  color: white;
  font-size: 14px;
  margin-top: 5px;
`;

const ContextMenuWrapper = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 100%; /* Place it directly below the folder */
  left: 50%;
  transform: translateX(-50%); /* Center it under the folder */
  background: #333;
  padding: 5px;
  border-radius: 5px;
  display: ${(props) => (props.visible ? "flex" : "none")};
  flex-direction: column;
  z-index: 10;
  color: white;
  width: 120px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);

  button {
    background: none;
    border: none;
    color: white;
    padding: 8px;
    cursor: pointer;
    text-align: left;
    width: 100%;

    &:hover {
      background: #444;
    }
  }
`;

interface FolderProps {
  id: string;
  name: string;
  icon: string;
  onOpen: () => void;
  onDelete: () => void;
  onRename: () => void;
  onMove: (draggedId: string, targetId: string) => void;
}

const Folder: React.FC<FolderProps> = ({ id, name, icon, onOpen, onDelete, onRename, onMove }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FOLDER",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "FOLDER",
    drop: (draggedItem: { id: string }) => {
      if (draggedItem.id !== id) {
        onMove(draggedItem.id, id);
      }
    },
  });

  // Context menu state
  const [menuVisible, setMenuVisible] = useState(false);
  const folderRef = useRef<HTMLDivElement | null>(null);

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setMenuVisible(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (folderRef.current && !folderRef.current.contains(event.target as Node)) {
      setMenuVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={folderRef} style={{ position: "relative" }}>
      <FolderContainer
        ref={(node) => drag(drop(node))}
        style={{ opacity: isDragging ? 0.5 : 1 }}
        onContextMenu={handleContextMenu} // Right-click event
      >
        <FolderIcon src={icon} alt={name} onClick={onOpen} />
        <FolderName>{name}</FolderName>
      </FolderContainer>

      <ContextMenuWrapper visible={menuVisible}>
        <button onClick={onOpen}>📂 Open</button>
        <button onClick={onRename}>✏ Rename</button>
        <button onClick={onDelete}>🗑 Delete</button>
      </ContextMenuWrapper>
    </div>
  );
};

export default Folder;
