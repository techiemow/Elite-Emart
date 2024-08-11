import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  width: 100%;
  height: 80px; /* Adjust the height as needed */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333; 
  color: white;
  font-size: 24px;
  cursor: pointer;
`;

const HomeNavbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <NavbarContainer onClick={handleClick}>
      EliteeMart
    </NavbarContainer>
  );
};

export default HomeNavbar;
