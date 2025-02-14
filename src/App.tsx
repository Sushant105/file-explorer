// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Sidebar from "./components/Sidebar";
import FileExplorer from "./components/FileExplorer";
import GlobalStyles from "./styles/GlobalStyles";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppContainer>
        <Sidebar />
        <FileExplorer />
      </AppContainer>
    </Provider>
  );
};

export default App;
