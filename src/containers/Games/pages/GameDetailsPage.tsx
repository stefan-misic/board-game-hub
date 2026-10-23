import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
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
import { getCategories, getStorageImageUrl } from '../../../helpers/utils';
import useIcons from '../../../hooks/useIcons';
import { readGameService } from '../../../services/games.services';
import { StoreDispatch, StoreState } from '../../../store';
import { setIsLoading } from '../../../store/global.slice';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const GameDetailsPage = () => {
  const categories = getCategories();
  const dispatch = useDispatch<StoreDispatch>();
  const { buttons: buttonIcons, games: gameIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isCurrentUserAdmin = useSelector<StoreState, boolean>(selectIsCurrentUserAdmin);
  const { t: tb } = useTranslation('buttons');
  const { t: tg } = useTranslation('games');

  const { data: gameDetails, isLoading: gameDetailsIsLoading } = useQuery({
    queryKey: ['game-details', id],
    queryFn: () => readGameService(id ?? ''),
    enabled: !!id
  });

  useEffect(() => {
    if (gameDetailsIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, gameDetailsIsLoading]);

  const gameCategory = gameDetails?.category ? categories?.find((category) => category.id === gameDetails.category) : null;

  return (
    <PageContainer elevation={4}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
          <Stack alignItems='center' direction='column'>
            <StyledAvatar
              alt={tg('avatar')}
              src={gameDetails?.image_id ? getStorageImageUrl(gameDetails?.image_id): ''}
            />
          </Stack>
        </Grid>

        <Grid container size={{ sm: 12, md: 8, lg: 6, xl: 4 }} spacing={2}>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
            <StyledLabel>{tg('name')}</StyledLabel>
            <StyledValue>{gameDetails?.name || '-'}</StyledValue>
          </Grid>
          {gameDetails?.system_id && (
            <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
              <StyledLabel>{tg('system')}</StyledLabel>
              <StyledValue>{gameDetails?.system_id || '-'}</StyledValue>
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
            <StyledLabel>{tg('designer')}</StyledLabel>
            <StyledValue>{gameDetails?.designer?.display_name || '-'}</StyledValue>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
            <StyledLabel>{tg('publisher')}</StyledLabel>
            <StyledValue>{gameDetails?.publisher?.name || '-'}</StyledValue>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <StyledLabel>{tg('year')}</StyledLabel>
            <StyledValue>{gameDetails?.year || '-'}</StyledValue>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
            <StyledLabel>{tg('playerCount')}</StyledLabel>
            <StyledValue>{gameDetails?.player_count?.length === 2 ? `${gameDetails?.player_count?.[0]} - ${gameDetails?.player_count?.[1]}` : '-'}</StyledValue>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <StyledLabel>{tg('type')}</StyledLabel>
            <Stack direction='row' gap={1}>
              {gameDetails?.type ? gameIcons[gameDetails.type] : gameIcons.other}
              <StyledValue>{gameDetails?.type ? tg(gameDetails.type) : '-'}</StyledValue>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <StyledLabel>{tg('category')}</StyledLabel>
            <StyledValue>{gameCategory ? tg(gameCategory?.name) : '-'}</StyledValue>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <StyledLabel>{tg('rating')}</StyledLabel>
            <Rating max={10} readOnly={true} value={gameDetails?.rating || null} />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <StyledLabel>{tg('isOwned')}</StyledLabel>
            <StyledValue>{gameDetails?.is_owned ? tg('yes') : tg('no')}</StyledValue>
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
            <StyledLabel>{tg('lastPlayed')}</StyledLabel>
            <StyledValue>{gameDetails?.last_played || '-'}</StyledValue>
          </Grid>
          
          <Grid container>
            {isCurrentUserAdmin && (
              <Button
                onClick={() => navigate(`/games/${id}/update`)}
                size='large'
                startIcon={buttonIcons.update}
                variant='contained'
              >
                {tb('update')}
              </Button>
            )}
            <Button
              onClick={() => navigate('/games')}
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

export default GameDetailsPage;
