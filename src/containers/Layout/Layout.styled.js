import Box from '@mui/material/Box';
import styled from 'styled-components';

export const StyledLayout = styled(Box)`
    background-color: ${({ theme }) => theme.palette.background.main};
    height: 100%;
    padding: 1.5rem;
    width: 100%;
`;
