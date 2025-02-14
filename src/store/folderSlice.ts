// src/store/folderSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Folder } from "../types/types";
import { v4 as uuidv4 } from "uuid";

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<{ parentId?: string }>) => {
      const newFolder: Folder = { id: uuidv4(), name: "New Folder", children: [] };
      
      if (action.payload.parentId) {
        const addRecursively = (folders: Folder[]) => {
          folders.forEach(folder => {
            if (folder.id === action.payload.parentId) {
              folder.children.push(newFolder);
            } else {
              addRecursively(folder.children);
            }
          });
        };
        addRecursively(state.folders);
      } else {
        state.folders.push(newFolder);
      }
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      const deleteRecursively = (folders: Folder[]): Folder[] => {
        return folders.filter(folder => {
          if (folder.id === action.payload) return false;
          folder.children = deleteRecursively(folder.children);
          return true;
        });
      };
      state.folders = deleteRecursively(state.folders);
    },
    renameFolder: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      const renameRecursively = (folders: Folder[]) => {
        folders.forEach(folder => {
          if (folder.id === action.payload.id) {
            folder.name = action.payload.newName;
          } else {
            renameRecursively(folder.children);
          }
        });
      };
      renameRecursively(state.folders);
    },
  },
});

export const { addFolder, deleteFolder, renameFolder } = folderSlice.actions;
export default folderSlice.reducer;
