import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';
import {
  ListEntry,
  ListHeader,
  PageContainer,
  StyledAvatar,
  StyledLabel,
  StyledValue
} from '../../../global_styled_components';
import { createErrorMessage, getStorageImageUrl } from '../../../helpers/utils';
import useIcons from '../../../hooks/useIcons';
import { deleteGameService, GameRow, readGamesService } from '../../../services/games.services';
import { StoreDispatch, StoreState } from '../../../store';
import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const GamesListPage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { buttons: buttonIcons } = useIcons();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isCurrentUserAdmin = useSelector<StoreState, boolean>(selectIsCurrentUserAdmin);
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState<boolean>(false);
  const [interactedEntry, setInteractedEntry] = useState<GameRow | null>(null);
  const { t: tb } = useTranslation('buttons');
  const { t: tdi } = useTranslation('dialogs');
  const { t: tg } = useTranslation('games');

  const theme = useTheme();
  const isLargeLaptop = useMediaQuery(theme.breakpoints.down('xl'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { data: gamesList, isLoading: gamesListIsLoading } = useQuery({
    queryKey: ['games-list'],
    queryFn: () => readGamesService()
  });
    
  useEffect(() => {
    if (gamesListIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, gamesListIsLoading]);

  const { mutate: deleteGameMutation } = useMutation({
    mutationFn: () => {
      if (!interactedEntry?.$id) {
        throw new Error('No entry selected');
      }

      dispatch(setIsLoading(true));
      return deleteGameService(interactedEntry?.$id);
    },
    onSuccess: () => {
      setIsDeletionDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['games-list'] });
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: tg('gameDeleted'), messageType: 'success' }));
      setInteractedEntry(null);
    },
    onError: (error) => {
      setIsDeletionDialogOpen(false);
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: createErrorMessage(error), messageType: 'error' }));
      setInteractedEntry(null);
    }
  });

  return (
    <PageContainer elevation={4}>
      <ListHeader>
        <Box></Box>

        <Box>
          {isCurrentUserAdmin && (
            <Button
              onClick={() => navigate('/games/create')}
              startIcon={buttonIcons.create}
              variant='contained'
            >
              {tb('create')}
            </Button>
          )}
        </Box>
      </ListHeader>

      {gamesList?.rows?.map((game) => (
        <ListEntry key={game?.$id}>
          <Box>
            {!isTablet && (
              <StyledAvatar
                alt={tg('avatar')}
                $size='list'
                src={game.image_id ? getStorageImageUrl(game.image_id) : ''}
              />
            )}
            <Stack>
              <StyledLabel $size='list'>{tg('name')}</StyledLabel>
              <StyledValue $size='list'>{game?.name || '-'}</StyledValue>
            </Stack>
            {!isMobile && (
              <>
                <Stack>
                  <StyledLabel $size='list'>{tg('designers')}</StyledLabel>
                  <StyledValue $size='list'>{game?.designers?.length ? game?.designers?.map((designer) => designer?.display_name).join(', ') : '-'}</StyledValue>
                </Stack>
                <Stack>
                  <StyledLabel $size='list'>{tg('publisher')}</StyledLabel>
                  <StyledValue $size='list'>{game?.publisher?.name || '-'}</StyledValue>
                </Stack>
              </>
            )}
            {!isLargeLaptop && (
              <Stack>
                <StyledLabel $size='list'>{tg('year')}</StyledLabel>
                <StyledValue $size='list'>{game?.year || '-'}</StyledValue>
              </Stack>
            )}
            {!isSmallLaptop && (
              <Stack>
                <StyledLabel $size='list'>{tg('rating')}</StyledLabel>
                <StyledValue $size='list'>{game?.rating || '-'}</StyledValue>
              </Stack>
            )}
          </Box>
              
          <Box>
            <Tooltip title={tb('view')}>
              <IconButton
                color='primary'
                onClick={() => navigate(`/games/${game?.$id}`)}
                size='small'
              >
                {buttonIcons.view}
              </IconButton>
            </Tooltip>
            {isCurrentUserAdmin && (
              <>
                <Tooltip title={tb('update')}>
                  <IconButton
                    color='primary'
                    onClick={() => navigate(`/games/${game?.$id}/update`)}
                    size='small'
                  >
                    {buttonIcons.updateList}
                  </IconButton>
                </Tooltip>
                <Tooltip title={tb('delete')}>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setInteractedEntry(game);
                      setIsDeletionDialogOpen(true);
                    }}
                    size='small'
                  >
                    {buttonIcons.deleteList}
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </ListEntry>
      ))}
            
      {!gamesList?.rows?.length && (
        <ListEntry $empty>{tg('noEntries')}</ListEntry>
      )}
            
      <ConfirmationDialog
        confirmationButton={
          <Button
            color='error'
            onClick={() => deleteGameMutation()} 
            startIcon={buttonIcons.deleteConfirm}
            variant='contained'
          >
            {tb('deleteConfirm')}
          </Button>
        }
        dialogContent={tdi('deletionContent', { entryName: interactedEntry?.name })}
        dialogTitle={tdi('deletionTitle')}
        isOpen={isDeletionDialogOpen}
        setIsOpen={setIsDeletionDialogOpen}
      />
    </PageContainer>
  );
};

export default GamesListPage;
