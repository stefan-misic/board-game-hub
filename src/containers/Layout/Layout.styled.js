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
    margin-left: ${({ $short, theme }) => $short ? 'calc(240px + 1rem)' : 'calc(60px + 1rem)'};
    width: 100%;
    transition: ${({ $short, theme }) => $short ?
    theme.transitions.create(['margin-left'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    })
    : theme.transitions.create(['margin-left'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })};

    @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
        margin-left: calc(60px + 1rem);
    }
`;

export const StyledDrawer = styled(Paper)`
    && {
        bottom: 0;
        box-shadow: ${({ theme }) => theme.shadows[4]};
        left: 0;
        position: absolute;
        top: 0;

        &.MuiPaper-root {
            overflow-x: hidden;
            transition: ${({ $open, theme }) => $open ?
    theme.transitions.create(['width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    })
    : theme.transitions.create(['width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })};
            width: ${({ $open, theme }) => $open ? '240px' : '60px'};

            @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
                width: 60px;

                .MuiList-root {
                    .MuiListItem-root {
                        .MuiButtonBase-root {
                            .MuiListItemText-root {
                                opacity: 0;
                            }
                        }
                    }
                }
            }

            .MuiList-root {
                padding: 0;

                .MuiListItem-root {
                    padding: 0;

                    .MuiButtonBase-root {
                        height: 56px;
                        padding: 12px 16px;

                        .MuiListItemIcon-root {
                            margin-right: 8px;
                            min-width: auto;
                        }

                        .MuiListItemText-root {
                            opacity: ${({ $open, theme }) => $open ? 1 : 0};
                            transition: ${({ $open, theme }) => $open ?
    theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.sharp
    })
    : theme.transitions.create(['opacity'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp
    })};
                        }
                    }
                }
            }
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

        .MuiBox-root {
            align-items: center;
            display: flex;

            & > * {
                margin-right: 1rem;

                &:last-child {
                    margin-right: 0;
                }
            }

            img {
                height: 40px;
                width: 40px;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }
`;

export const StyledLayout = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background.main};
    height: 100%;
    padding: 1.5rem;
    width: 100%;
`;
