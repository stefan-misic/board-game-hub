import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import ConfirmationDialog from '../../../components/ConfirmationDialog/ConfirmationDialog';
import config from '../../../config';
import {
  ListEntry,
  ListHeader,
  PageContainer,
  StyledAvatar,
  StyledLabel,
  StyledValue
} from '../../../global_styled_components';
import { createErrorMessage, getCountries } from '../../../helpers/utils';
import useIcons from '../../../hooks/useIcons';
import { deletePublisherService, PublisherRow, readPublishersService } from '../../../services/publishers.services';
import { StoreDispatch, StoreState } from '../../../store';
import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const PublishersListPage = () => {
  const countries = getCountries();
  const dispatch = useDispatch<StoreDispatch>();
  const { buttons: buttonIcons, publishers: publisherIcons } = useIcons();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isCurrentUserAdmin = useSelector<StoreState, boolean>(selectIsCurrentUserAdmin);
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState<boolean>(false);
  const [interactedEntry, setInteractedEntry] = useState<PublisherRow | null>(null);
  const { t: tb } = useTranslation('buttons');
  const { t: tdi } = useTranslation('dialogs');
  const { t: tp } = useTranslation('publishers');

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { data: publishersList, isLoading: publishersListIsLoading } = useQuery({
    queryKey: ['publishers-list'],
    queryFn: () => readPublishersService()
  });

  useEffect(() => {
    if (publishersListIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [publishersListIsLoading, dispatch]);

  const { mutate: deletePublisherMutation } = useMutation({
    mutationFn: () => {
      if (!interactedEntry?.$id) {
        throw new Error('No entry selected');
      }

      dispatch(setIsLoading(true));
      return deletePublisherService(interactedEntry?.$id);
    },
    onSuccess: () => {
      setIsDeletionDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['publishers-list'] });
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: tp('publisherDeleted'), messageType: 'success' }));
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
              onClick={() => navigate('/publishers/create')}
              startIcon={buttonIcons.create}
              variant='contained'
            >
              {tb('create')}
            </Button>
          )}
        </Box>
      </ListHeader>

      {publishersList?.rows?.map((publisher) => {
        const publisherCountry = publisher?.country ? countries?.find((country) => country.id === publisher.country) : null;

        return (
          <ListEntry key={publisher?.$id}>
            <Box>
              {!isTablet && (
                <StyledAvatar
                  alt={tp('avatar')}
                  $size='list'
                  src={publisher.image_id ?
                    `${config.appwriteConfig.apiEndpoint}/storage/buckets/${config.appwriteConfig.bucketId}/files/${publisher.image_id}/view?project=${config.appwriteConfig.projectId}`
                    : ''
                  }
                />
              )}
              <Stack>
                <StyledLabel $size='list'>{tp('name')}</StyledLabel>
                <StyledValue $size='list'>{publisher?.name || '-'}</StyledValue>
              </Stack>
              {!isTablet && (
                <Stack>
                  <StyledLabel $size='list'>{tp('country')}</StyledLabel>
                  <Stack alignItems='center' direction='row' gap={1}>
                    {publisherCountry ? (
                      <img alt={publisherCountry.name} src={publisherCountry.flagUrl} style={{ height: 14, width: 20 }} />
                    ) : null}
                    <StyledValue $size='list'>{publisherCountry ? publisherCountry.name : '-'}</StyledValue>
                  </Stack>
                </Stack>
              )}
              {!isTablet && (
                <Stack>
                  <StyledLabel $size='list'>{tp('type')}</StyledLabel>
                  <Stack direction='row' gap={1}>
                    {publisher?.type ? publisherIcons[publisher.type] : publisherIcons.other}
                    <StyledValue $size='list'>{publisher?.type ? tp(publisher.type) : '-'}</StyledValue>
                  </Stack>
                </Stack>
              )}
            </Box>
        
            <Box>
              <Tooltip title={tb('view')}>
                <IconButton
                  color='primary'
                  onClick={() => navigate(`/publishers/${publisher?.$id}`)}
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
                      onClick={() => navigate(`/publishers/${publisher?.$id}/update`)}
                      size='small'
                    >
                      {buttonIcons.updateList}
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={tb('delete')}>
                    <IconButton
                      color='error'
                      onClick={() => {
                        setInteractedEntry(publisher);
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
        );})}
      
      {!publishersList?.rows?.length && (
        <ListEntry $empty>{tp('noEntries')}</ListEntry>
      )}
      
      <ConfirmationDialog
        confirmationButton={
          <Button
            color='error'
            onClick={() => deletePublisherMutation()} 
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

export default PublishersListPage;
