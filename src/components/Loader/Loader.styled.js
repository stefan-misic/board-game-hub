import Backdrop from '@mui/material/Backdrop';
import styled from 'styled-components';

export const StyledBackdrop = styled(Backdrop)`
    && {
        color: ${({ theme }) => theme.palette.text.contrast};
        z-index: 100;
    }
`;
