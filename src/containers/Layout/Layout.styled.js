import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import styled from 'styled-components';

export const StyledBody = styled(Box)`
    display: flex;
    height: calc(100% - 60px - 1rem);
    margin: 0 auto;
    max-width: 1440px;
    position: relative;
    width: 100%;
`;

export const StyledContent = styled(Box)`
    flex-grow: 1;
    height: 100%;
    margin-left: ${({ $isOpen, theme }) => $isOpen ? '240px' : '65px'};
    transition: ${({ $isOpen, theme }) => $isOpen ?
    theme.transitions.create(['margin-left'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    })
    : theme.transitions.create(['margin-left'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })};
`;

export const StyledDrawer = styled(Paper)`
    && {
        bottom: 0;
        box-sizing: border-box;
        flex-shrink: 0;
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        transition: ${({ $isOpen, theme }) => $isOpen ?
    theme.transitions.create(['width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    })
    : theme.transitions.create(['width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })};
        white-space: nowrap;
        width: ${({ $isOpen, theme }) => $isOpen ? '240px' : '65px'};
        z-index: ${({ theme }) => theme.zIndex.drawer};

        &.MuiPaper-root {
            border-right: 1px solid ${({ theme }) => theme.palette.border};
            height: 100%;
            overflow-x: hidden;
            position: absolute;
            width: ${({ $isOpen, theme }) => $isOpen ? '240px' : '65px'};
        },
    }
`;

export const StyledHeader = styled(Paper)`
    && {
        align-items: center;
        display: flex;
        height: 60px;
        justify-content: space-between;
        margin: 0 auto 1rem;
        max-width: 1440px;
        padding: 0 1.5rem;
        width: 100%;
    }
`;

export const StyledLayout = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background.main};
    height: 100%;
    padding: 1.5rem;
    width: 100%;
`;
