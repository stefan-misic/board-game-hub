import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import {
  PageContainer,
} from '../../../global_styled_components';
import useIcons from '../../../hooks/useIcons';
import { StoreState } from '../../../store';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const PublisherDetailsPage = () => {
  const { buttons: buttonIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isCurrentUserAdmin = useSelector<StoreState, boolean>(selectIsCurrentUserAdmin);
  const { t: tb } = useTranslation('buttons');

  return (
    <PageContainer elevation={4}>
      <Grid container spacing={2}>

        <Grid container size={{ sm: 12, md: 8, lg: 6, xl: 4 }} spacing={2}>
          
          <Grid container>
            {isCurrentUserAdmin && (
              <Button
                onClick={() => navigate(`/publishers/${id}/update`)}
                size='large'
                startIcon={buttonIcons.update}
                variant='contained'
              >
                {tb('update')}
              </Button>
            )}
            <Button
              onClick={() => navigate('/publishers')}
              size='large'
              startIcon={buttonIcons.cancel}
              variant='outlined'
            >
              {tb('cancel')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PublisherDetailsPage;
