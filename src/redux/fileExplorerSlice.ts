import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Folder = {
  id: string;
  name: string;
  icon: string;
  parentId: string | null;
  children: Folder[];
};

interface FileExplorerState {
  folders: Folder[];
  currentFolderId: string | null;
}

const initialState: FileExplorerState = {
  folders: [
    {
      id: "1",
      name: "Music",
      icon: "/assets/folder-icon.png",
      parentId: null,
      children: [],
    },
    {
      id: "2",
      name: "Pictures",
      icon: "/assets/folder-icon.png",
      parentId: null,
      children: [],
    },
    {
      id: "3",
      name: "Visual Studio Code",
      icon: "/assets/vscode-icon.png",
      parentId: null,
      children: [],
    },
  ],
  currentFolderId: null,
};

const findFolder = (folders: Folder[], folderId: string): Folder | null => {
  for (const folder of folders) {
    if (folder.id === folderId) return folder;
    const found = findFolder(folder.children, folderId);
    if (found) return found;
  }
  return null;
};

const fileExplorerSlice = createSlice({
  name: "fileExplorer",
  initialState,
  reducers: {
    openFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
    },
    
    createFolder: (state, action: PayloadAction<{ parentId: string | null; name: string }>) => {
      const { parentId, name } = action.payload;
      const newFolder: Folder = {
        id: Math.random().toString(),
        name,
        icon: "/assets/folder-icon.png",
        parentId,
        children: [],
      };

      if (parentId === null) {

        state.folders = [...state.folders, newFolder];
      } else {
        const parentFolder = findFolder(state.folders, parentId);
        if (parentFolder) {
          parentFolder.children = [...parentFolder.children, newFolder];
        }
      }
    },

    deleteFolder: (state, action: PayloadAction<string>) => {
      const removeFolder = (folders: Folder[], folderId: string): Folder[] => {
        return folders
          .filter((folder) => folder.id !== folderId)
          .map((folder) => ({
            ...folder,
            children: removeFolder(folder.children, folderId),
          }));
      };
      state.folders = removeFolder(state.folders, action.payload);
    },

    renameFolder: (state, action: PayloadAction<{ folderId: string; newName: string }>) => {
      const renameFolder = (folders: Folder[]) => {
        folders.forEach((folder) => {
          if (folder.id === action.payload.folderId) {
            folder.name = action.payload.newName;
          } else {
            renameFolder(folder.children);
          }
        });
      };
      renameFolder(state.folders);
    },
    
    moveFolder: (state, action: PayloadAction<{ draggedId: string; targetId: string }>) => {
      const moveFolder = (folders: Folder[], draggedId: string, targetId: string): Folder[] => {
        let draggedFolder: Folder | null = null;

        const updatedFolders = folders.filter((folder) => {
          if (folder.id === draggedId) {
            draggedFolder = folder;
            return false;
          }
          folder.children = moveFolder(folder.children, draggedId, targetId);
          return true;
        });

        if (draggedFolder) {
          const targetFolder = updatedFolders.find((folder) => folder.id === targetId);
          if (targetFolder) {
            targetFolder.children.push(draggedFolder);
          }
        }

        return updatedFolders;
      };

      state.folders = moveFolder(state.folders, action.payload.draggedId, action.payload.targetId);
    },
    setCurrentFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
    },
  },
});

export const { openFolder, createFolder, deleteFolder, renameFolder, moveFolder } = fileExplorerSlice.actions;
export default fileExplorerSlice.reducer;

