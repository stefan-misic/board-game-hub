import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  ListHeader,
  PageContainer,
} from '../../../global_styled_components';
import useIcons from '../../../hooks/useIcons';
import { StoreState } from '../../../store';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const PublishersListPage = () => {
  const { buttons: buttonIcons } = useIcons();
  const navigate = useNavigate();
  const isCurrentUserAdmin = useSelector<StoreState, boolean>(selectIsCurrentUserAdmin);
  const { t: tb } = useTranslation('buttons');

  return (
    <PageContainer elevation={4}>
      <ListHeader>
        <Box></Box>

        <Box>
          {isCurrentUserAdmin && (
            <Button
              onClick={() => navigate('/publishers/create')}
              startIcon={buttonIcons.create}
              variant='contained'
            >
              {tb('create')}
            </Button>
          )}
        </Box>
      </ListHeader>
    </PageContainer>
  );
};

export default PublishersListPage;
