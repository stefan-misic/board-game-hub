import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import config from '../../../config';
import {
  ListEntry,
  ListHeader,
  PageContainer,
  StyledAvatar,
  StyledLabel,
  StyledValue
} from '../../../global_styled_components';
import useIcons from '../../../hooks/useIcons';
import { readDesignersService } from '../../../services/designers.services';
import { setIsLoading } from '../../../store/global.slice';

const DesignersListPage = () => {
  const dispatch = useDispatch();
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const navigate = useNavigate();
  const { t: tb } = useTranslation('buttons');
  const { t: td } = useTranslation('designers');

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
  }, [designersListIsLoading]);

  return (
    <PageContainer elevation={4}>
      <ListHeader>
        <Box></Box>
        <Box>
          <Button
            onClick={() => navigate('/designers/create')}
            startIcon={buttonIcons.create}
            variant='contained'
          >
            {tb('create')}
          </Button>
        </Box>
      </ListHeader>
      {designersList?.rows?.map((designer) => (
        <ListEntry key={designer?.$id}>
          <Box>
            <StyledAvatar
              alt={td('avatar')}
              $size='list'
              src={`${config.appwriteConfig.apiEndpoint}/storage/buckets/${config.appwriteConfig.bucketId}/files/${designer.image_id}/preview?project=${config.appwriteConfig.projectId}`}
            />
            <Stack>
              <StyledLabel $size='list'>{td('displayName')}</StyledLabel>
              <StyledValue $size='list'>{designer?.display_name || '-'}</StyledValue>
            </Stack>
            <Stack>
              <StyledLabel $size='list'>{td('type')}</StyledLabel>
              <Stack direction='row' gap={1}>
                {designer?.type ? designerIcons[designer.type] : designerIcons.other}
                <StyledValue $size='list'>{td(designer?.type) || '-'}</StyledValue>
              </Stack>
            </Stack>
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
            <Tooltip title={tb('update')}>
              <IconButton
                color='primary'
                onClick={() => navigate(`/designers/${designer?.$id}/update`)}
                size='small'
              >
                {buttonIcons.updateList}
              </IconButton>
            </Tooltip>
          </Box>
        </ListEntry>
      ))}
    </PageContainer>
  );
};

export default DesignersListPage;
