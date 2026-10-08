import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

interface StyledContentProps {
  $short?: boolean;
}

interface StyledDrawerProps {
  $open?: boolean;
}

interface StyledLayoutProps {
  $type?: 'authentication' | 'default';
}

export const StyledBody = styled(Box)`
    display: flex;
    height: calc(100% - 60px - 1rem);
    margin: 0 auto;
    max-width: 1440px;
    position: relative;
    width: 100%;
`;

export const StyledContent = styled(Box)<StyledContentProps>`
    flex-grow: 1;
    margin-left: ${({ $short }) => $short ? 'calc(240px + 1rem)' : 'calc(60px + 1rem)'};
    width: 100%;
    transition: ${(props) => props.$short ?
    (props.theme as Theme).transitions.create(['margin-left'], {
      duration: (props.theme as Theme).transitions.duration.enteringScreen,
      easing: (props.theme as Theme).transitions.easing.sharp
    })
    : (props.theme as Theme).transitions.create(['margin-left'], {
      duration: (props.theme as Theme).transitions.duration.leavingScreen,
      easing: (props.theme as Theme).transitions.easing.sharp
    })};

    @media (max-width: ${(props) => (props.theme as Theme).breakpoints.values.md}px) {
        margin-left: calc(60px + 1rem);
    }
`;

export const StyledDrawer = styled(Paper)<StyledDrawerProps>`
    && {
        bottom: 0;
        box-shadow: ${(props) => (props.theme as Theme).shadows[4]};
        left: 0;
        position: absolute;
        top: 0;

        &.MuiPaper-root {
            overflow-x: hidden;
            transition: ${(props) => props.$open ?
    (props.theme as Theme).transitions.create(['width'], {
      duration: (props.theme as Theme).transitions.duration.enteringScreen,
      easing: (props.theme as Theme).transitions.easing.sharp
    })
    : (props.theme as Theme).transitions.create(['width'], {
      duration: (props.theme as Theme).transitions.duration.leavingScreen,
      easing: (props.theme as Theme).transitions.easing.sharp
    })};
            width: ${({ $open }) => $open ? '240px' : '60px'};

            @media (max-width: ${(props) => (props.theme as Theme).breakpoints.values.md}px) {
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
                            opacity: ${({ $open }) => $open ? 1 : 0};
                            transition: ${(props) => props.$open ?
    (props.theme as Theme).transitions.create(['opacity'], {
      duration: (props.theme as Theme).transitions.duration.enteringScreen,
      easing: (props.theme as Theme).transitions.easing.sharp
    })
    : (props.theme as Theme).transitions.create(['opacity'], {
      duration: (props.theme as Theme).transitions.duration.leavingScreen,
      easing: (props.theme as Theme).transitions.easing.sharp
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

export const StyledLayout = styled(Box)<StyledLayoutProps>`
    background-color: ${(props) => (props.theme as Theme).palette.background.main};
    display: ${({ $type }) => {
    switch ($type) {
    case 'authentication':
      return 'flex';
    default:
      return 'block';
    }
  }};
    flex-direction: column;
    height: 100%;
    justify-content: center;
    padding: 1.5rem;
    width: 100%;
`;
