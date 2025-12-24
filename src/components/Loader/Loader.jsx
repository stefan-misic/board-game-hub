import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import { selectIsLoading } from '../../store/global.slice';
import { StyledBackdrop } from './Loader.styled';

const Loader = () => {
  const isVisible = useSelector(selectIsLoading);

  return (
    <StyledBackdrop open={isVisible}>
      <CircularProgress color='inherit' />
    </StyledBackdrop>
  );
};

export default Loader;
