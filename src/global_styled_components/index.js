import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export const StyledAvatar = styled(Avatar)`
    && {
        border: 1px solid ${({ theme }) => theme.palette.border};
        height: 100px;
        margin-bottom: 1rem;
        width: 100px;

        img {
            object-fit: fill;
        }
    }
`;

export const StyledLabel = styled(Typography)`
    && {
        color: ${({ theme }) => theme.palette.text.label};
        font-size: 0.75rem;
    }
`;

export const StyledValue = styled(Typography)`
    && {
        font-weight: 500;
    }
`;

export const PageContainer = styled(Paper)`
    && {
        height: 100%;
        margin: 0 auto;
        max-width: 1440px;
        padding: 1.5rem;
        width: 100%;
    }
`;
