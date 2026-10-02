import Box from '@mui/material/Box';
import styled from 'styled-components';

export const StyledAuthentication = styled(Box)`
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;

    img {
        height: 80px;
        margin-bottom: 2rem;
        width: 80px;
    }

    .MuiButton-root {
        margin-top: 1rem;
        width: 100%;
    }

    .MuiTextField-root {
        margin-bottom: 1rem;
    }

    .MuiTypography-root {
        margin-bottom: 2rem;
    }
`;
