import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';

import { StoreState } from '../../store';
import { selectIsLoading } from '../../store/global.slice';
import { StyledBackdrop } from './Loader.styled';

const Loader = () => {
  const isVisible = useSelector<StoreState, boolean>(selectIsLoading);

  return (
    <StyledBackdrop open={isVisible}>
      <CircularProgress color='inherit' />
    </StyledBackdrop>
  );
};

export default Loader;
