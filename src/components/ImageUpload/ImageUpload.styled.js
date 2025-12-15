import Avatar from '@mui/material/Avatar';
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
