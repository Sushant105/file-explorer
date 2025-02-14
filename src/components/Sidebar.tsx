// src/components/Sidebar.tsx
import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background: #262626;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h4`
  color: #9a9a9a;
  margin-bottom: 10px;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  color: white;
  padding: 8px;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #333;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SectionTitle>Favourites</SectionTitle>
      <SidebarItem>
        <img src="./assets/airdrop-icon.png" alt="AirDrop Icon" />
        AirDrop
      </SidebarItem>
      <SidebarItem>
        <img src="./assets/recent-icon.png" alt="Recents Icon" />
        Recents
      </SidebarItem>
      <SidebarItem>
        <img src="./assets/app-icon.png" alt="Applications Icon" />
        Applications
      </SidebarItem>
      <SidebarItem>
        <img src="./assets/desktop-icon.png" alt="Desktop Icon" />
        Desktop
      </SidebarItem>
      <SidebarItem>
        <img src="./assets/document-icon.png" alt="Documents Icon" />
        Documents
      </SidebarItem>
      <SidebarItem style={{ background: "#444" }}>
        <img src="./assets/download-icon.png" alt="Downloads Icon" />
        Downloads
      </SidebarItem>

      <SectionTitle>Locations</SectionTitle>
      <SidebarItem>
        <img src="./assets/cloud-icon.png" alt="iCloud Drive Icon" />
        iCloud Drive
      </SidebarItem>

      <SectionTitle>Tags</SectionTitle>
      <SidebarItem style={{ color: "red" }}>Red</SidebarItem>
      <SidebarItem style={{ color: "orange" }}>Orange</SidebarItem>
      <SidebarItem style={{ color: "yellow" }}>Yellow</SidebarItem>
      <SidebarItem style={{ color: "green" }}>Green</SidebarItem>
      <SidebarItem style={{ color: "blue" }}>Blue</SidebarItem>
      <SidebarItem style={{ color: "purple" }}>Purple</SidebarItem>
      <SidebarItem style={{ color: "gray" }}>Grey</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
