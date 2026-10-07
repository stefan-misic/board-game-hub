import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Theme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

interface ListEntryProps {
  $empty?: boolean;
}

interface SizeProps {
  $size?: 'list' | 'default';
}

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

export const ListEntry = styled(Paper)<ListEntryProps>`
    && {
        align-items: center;
        display: flex;
        height: 64px;
        justify-content: ${({ $empty }) => {
    switch ($empty) {
    case true:
      return 'center';
    default:
      return 'space-between';
    }
  }};
        margin-bottom: 1rem;
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

            @media (max-width: ${(props) => (props.theme as Theme).breakpoints.values.md}px) {
                width: 100px;
            }

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
        margin: 0;
        overflow-x: auto;
        overflow-y: auto;
        padding: 1.5rem;
        width: 100%;
    }

    &.authentication-page {
        height: auto;
        min-height: 525px;
        margin: 0 auto;
        max-width: 440px;
    }
`;

export const StyledAvatar = styled(Avatar)<SizeProps>`
    && {
        border: 1px solid ${(props) => (props.theme as Theme).palette.border};
        height: ${({ $size }) => {
    switch ($size) {
    case 'list':
      return '32px';
    default:
      return '100px';
    }
  }};
        width: ${({ $size }) => {
    switch ($size) {
    case 'list':
      return '32px';
    default:
      return '100px';
    }
  }};
    }
`;

export const StyledLabel = styled(Typography)<SizeProps>`
    && {
        color: ${(props) => (props.theme as Theme).palette.text.label};
        font-size: ${({ $size }) => {
    switch ($size) {
    case 'list':
      return '0.625rem';
    default:
      return '0.75rem';
    }
  }};
    }
`;

export const StyledValue = styled(Typography)<SizeProps>`
    && {
        font-size: ${({ $size }) => {
    switch ($size) {
    case 'list':
      return '0.875rem';
    default:
      return '1rem';
    }
  }};
    }
`;
