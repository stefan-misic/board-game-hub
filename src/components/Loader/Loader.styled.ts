import Backdrop from '@mui/material/Backdrop';
import { Theme } from '@mui/material/styles';
import styled from 'styled-components';

export const StyledBackdrop = styled(Backdrop)`
    && {
        color: ${(props) => (props.theme as Theme).palette.text.contrast};
        z-index: 100;
    }
`;
