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
import useIcons, { DesignerIcons } from '../../../hooks/useIcons';
import { deleteDesignerService, DesignerRow, readDesignersService } from '../../../services/designers.services';
import { setHasMessage, setIsLoading } from '../../../store/global.slice';
import { selectIsCurrentUserAdmin } from '../../../store/user.slice';

const DesignersListPage = () => {
  const dispatch = useDispatch();
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isCurrentUserAdmin = useSelector(selectIsCurrentUserAdmin);
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState<boolean>(false);
  const [interactedEntry, setInteractedEntry] = useState<DesignerRow | null>(null);
  const { t: tb } = useTranslation('buttons');
  const { t: tde } = useTranslation('designers');
  const { t: tdi } = useTranslation('dialogs');

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { data: designersList, isLoading: designersListIsLoading } = useQuery({
    queryKey: ['designers-list'],
    queryFn: () => readDesignersService()
  });

  useEffect(() => {
    if (designersListIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [designersListIsLoading, dispatch]);

  const { mutate: deleteDesignerMutation } = useMutation({
    mutationFn: () => {
      if (!interactedEntry?.$id) {
        throw new Error('No entry selected');
      }

      dispatch(setIsLoading(true));
      return deleteDesignerService(interactedEntry?.$id);
    },
    onSuccess: () => {
      setIsDeletionDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['designers-list'] });
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: tde('designerDeleted'), messageType: 'success' }));
      setInteractedEntry(null);
    },
    onError: (error) => {
      setIsDeletionDialogOpen(false);
      dispatch(setIsLoading(false));
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setHasMessage({ hasMessage: true, message: errorMessage, messageType: 'error' }));
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
              onClick={() => navigate('/designers/create')}
              startIcon={buttonIcons.create}
              variant='contained'
            >
              {tb('create')}
            </Button>
          )}
        </Box>
      </ListHeader>

      {designersList?.rows?.map((designer) => (
        <ListEntry key={designer?.$id}>
          <Box>
            {!isTablet && (<StyledAvatar
              alt={tde('avatar')}
              $size='list'
              src={designer.image_id ?
                `${config.appwriteConfig.apiEndpoint}/storage/buckets/${config.appwriteConfig.bucketId}/files/${designer.image_id}/view?project=${config.appwriteConfig.projectId}`
                : ''
              }
            />)}
            <Stack>
              <StyledLabel $size='list'>{tde('displayName')}</StyledLabel>
              <StyledValue $size='list'>{designer?.display_name || '-'}</StyledValue>
            </Stack>
            {!isTablet && (<Stack>
              <StyledLabel $size='list'>{tde('type')}</StyledLabel>
              <Stack direction='row' gap={1}>
                {designer.type && designer.type in designerIcons ? designerIcons[designer.type as keyof DesignerIcons] : designerIcons.other}
                <StyledValue $size='list'>{tde(designer?.type) || '-'}</StyledValue>
              </Stack>
            </Stack>)}
          </Box>

          <Box>
            <Tooltip title={tb('view')}>
              <IconButton
                color='primary'
                onClick={() => navigate(`/designers/${designer?.$id}`)}
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
                    onClick={() => navigate(`/designers/${designer?.$id}/update`)}
                    size='small'
                  >
                    {buttonIcons.updateList}
                  </IconButton>
                </Tooltip>
                <Tooltip title={tb('delete')}>
                  <IconButton
                    color='error'
                    onClick={() => {
                      setInteractedEntry(designer);
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

      {!designersList?.rows?.length && (
        <ListEntry $empty>{tde('noEntries')}</ListEntry>
      )}

      <ConfirmationDialog
        confirmationButton={
          <Button
            color='error'
            onClick={() => deleteDesignerMutation()} 
            startIcon={buttonIcons.deleteConfirm}
            variant='contained'
          >
            {tb('deleteConfirm')}
          </Button>
        }
        dialogContent={tdi('deletionContent', { entryName: interactedEntry?.display_name })}
        dialogTitle={tdi('deletionTitle')}
        isOpen={isDeletionDialogOpen}
        setIsOpen={setIsDeletionDialogOpen}
      />
    </PageContainer>
  );
};

export default DesignersListPage;
