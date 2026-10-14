import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import {
  PageContainer,
  StyledAvatar,
  StyledLabel,
  StyledValue
} from '../../../global_styled_components';
import { getCountries, getStorageImageUrl } from '../../../helpers/utils';
import useIcons from '../../../hooks/useIcons';
import { readPublisherService } from '../../../services/publishers.services';
import { StoreDispatch, StoreState } from '../../../store';
import { setIsLoading } from '../../../store/global.slice';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const PublisherDetailsPage = () => {
  const countries = getCountries();
  const dispatch = useDispatch<StoreDispatch>();
  const { buttons: buttonIcons, publishers: publisherIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isCurrentUserAdmin = useSelector<StoreState, boolean>(selectIsCurrentUserAdmin);
  const { t: tb } = useTranslation('buttons');
  const { t: tp } = useTranslation('publishers');

  const { data: publisherDetails, isLoading: publisherDetailsIsLoading } = useQuery({
    queryKey: ['publisher-details', id],
    queryFn: () => readPublisherService(id ?? ''),
    enabled: !!id
  });

  useEffect(() => {
    if (publisherDetailsIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [publisherDetailsIsLoading, dispatch]);

  const publisherCountry = publisherDetails?.country ? countries?.find((country) => country.id === publisherDetails.country) : null;

  return (
    <PageContainer elevation={4}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
          <Stack alignItems='center' direction='column'>
            <StyledAvatar
              alt={tp('avatar')}
              src={publisherDetails?.image_id ? getStorageImageUrl(publisherDetails?.image_id): ''}
            />
          </Stack>
        </Grid>

        <Grid container size={{ sm: 12, md: 8, lg: 6, xl: 4 }} spacing={2}>
          <Grid size={12}>
            <StyledLabel>{tp('name')}</StyledLabel>
            <StyledValue>{publisherDetails?.name || '-'}</StyledValue>
          </Grid>
          <Grid size={12}>
            <StyledLabel>{tp('country')}</StyledLabel>
            <Stack alignItems='center' direction='row' gap={1}>
              {publisherCountry ? (
                <img alt={publisherCountry.name} src={publisherCountry.flagUrl} style={{ height: 14, width: 20 }} />
              ) : null}
              <StyledValue>{publisherCountry ? publisherCountry.name : '-'}</StyledValue>
            </Stack>
          </Grid>
          <Grid size={12}>
            <StyledLabel>{tp('type')}</StyledLabel>
            <Stack direction='row' gap={1}>
              {publisherDetails?.type ? publisherIcons[publisherDetails.type] : publisherIcons.other}
              <StyledValue>{publisherDetails?.type ? tp(publisherDetails.type) : '-'}</StyledValue>
            </Stack>
          </Grid>
          
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
