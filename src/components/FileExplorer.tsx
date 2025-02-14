import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { openFolder, createFolder, deleteFolder, renameFolder, moveFolder } from "../redux/fileExplorerSlice";
import Folders from "./Folder";
import styled from "styled-components";

const ExplorerContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: #1e1e1e;
`;
// Define Folder as a Type
export type Folder = {
  id: string;
  name: string;
  icon: string;
  parentId: string | null;
  children: Folder[];
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
`;

const Button = styled.button`
  margin: 5px;
  padding: 8px;
  background: #444;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background: #666;
  }
`;


const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.fileExplorer.folders);
const currentFolderId = useSelector((state: RootState) => state.fileExplorer.currentFolderId);

const findCurrentFolder = (folders: Folder[], parentId: string | null): Folder[] => {
  if (!parentId) return folders; // If parentId is null, return root folders
  const stack: Folder[] = [...folders];

  while (stack.length > 0) {
    const folder = stack.pop();
    if (!folder) continue;
    if (folder.id === parentId) return folder.children;
    stack.push(...folder.children);
  }
  return [];
};

  const handleMoveFolder = (draggedId: string, targetId: string) => {
    dispatch(moveFolder({ draggedId, targetId }));
  };

  const currentFolders = findCurrentFolder(folders, currentFolderId);

  return (
    <ExplorerContainer>
      {currentFolderId && (
        <Button onClick={() => dispatch(openFolder(""))}>🔙 Back</Button>
      )}
      <Button onClick={(handleCreateFolder) => dispatch(createFolder({ parentId: currentFolderId , name: "New Folder" }))}>
        ➕ Create Folder
      </Button>

      <GridContainer>
        {currentFolders.map((folder) => (
          <Folders
            key={folder.id}
            id={folder.id}
            name={folder.name}
            icon={folder.icon}
            onOpen={() => dispatch(openFolder(folder.id))}
            onDelete={() => dispatch(deleteFolder(folder.id))}
            onRename={() => {
              const newName = prompt("Enter new folder name", folder.name);
              if (newName) dispatch(renameFolder({ folderId: folder.id, newName }));
            }}
            onMove={handleMoveFolder}
          />
        ))}
      </GridContainer>
    </ExplorerContainer>
  );
};

export default FileExplorer;
