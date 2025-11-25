import Box from '@mui/material/Box';
import styled from 'styled-components';

export const PageContainer = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background.container};
    border: 1px solid ${({ theme }) => theme.palette.border};
    border-radius: 6px;
    box-shadow: ${({ theme }) => theme.palette.shadow};
    height: 100%;
    padding: 1.5rem;
    width: 100%;
`;
