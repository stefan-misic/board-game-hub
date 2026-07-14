import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export const ListHeader = styled(Stack)`
    && {
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 1rem;
        width: 100%;

        .MuiBox-root {
            align-items: center;
            display: flex;

            & > * {
                margin-right: 1rem;

                &:last-of-type {
                    margin-right: 0;
                }
            }
        }
    }
`;

export const ListEntry = styled(Paper)`
    && {
        align-items: center;
        display: flex;
        height: 64px;
        justify-content: ${({ $empty , theme}) => {
    switch ($empty) {
    case true:
      return 'center';
    default:
      return 'space-between';
    }
  }};
        margin-bottom: 1rem;
        overflow-x: auto;
        padding: 0.5rem;
        width: 100%;

        &:last-of-type {
            margin-bottom: 0;
        }

        .MuiBox-root {
            align-items: center;
            display: flex;

            & > * {
                margin-right: 1rem;

                &:last-of-type {
                    margin-right: 0;
                }
            }
        }

        .MuiStack-root {
            width: 150px;

            p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            svg {
                height: 0.875em;
                width: 0.875em;
            }
        }
    }
`;

export const PageContainer = styled(Paper)`
    && {
        height: 100%;
        overflow-y: auto;
        padding: 1.5rem;
        width: 100%;
    }
`;

export const StyledAvatar = styled(Avatar)`
    && {
        border: 1px solid ${({ theme }) => theme.palette.border};
        height: ${({ $size , theme}) => {
    switch ($size) {
    case 'list':
      return '32px';
    default:
      return '100px';
    }
  }};
        width: ${({ $size , theme}) => {
    switch ($size) {
    case 'list':
      return '32px';
    default:
      return '100px';
    }
  }};

        img {
            object-fit: fill;
        }
    }
`;

export const StyledLabel = styled(Typography)`
    && {
        color: ${({ theme }) => theme.palette.text.label};
        font-size: ${({ $size , theme}) => {
    switch ($size) {
    case 'list':
      return '0.625rem';
    default:
      return '0.75rem';
    }
  }};
    }
`;

export const StyledValue = styled(Typography)`
    && {
        font-size: ${({ $size , theme}) => {
    switch ($size) {
    case 'list':
      return '0.875rem';
    default:
      return '1rem';
    }
  }};
    }
`;
