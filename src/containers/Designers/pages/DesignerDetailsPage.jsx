import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import config from '../../../config';
import {
  PageContainer,
  StyledAvatar,
  StyledLabel,
  StyledValue
} from '../../../global_styled_components';
import useIcons from '../../../hooks/useIcons';
import { readDesignerService } from '../../../services/designers.services';
import { setIsLoading } from '../../../store/global.slice';

const DesignerDetailsPage = () => {
  const dispatch = useDispatch();
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const navigate = useNavigate();
  const { id } = useParams();
  const { t: tb } = useTranslation('buttons');
  const { t: td } = useTranslation('designers');

  const { data: designerDetails, isLoading: designerDetailsIsLoading } = useQuery({
    queryKey: ['designer-details', id],
    queryFn: () => readDesignerService(id)
  });

  useEffect(() => {
    if (designerDetailsIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [designerDetailsIsLoading]);

  return (
    <PageContainer elevation={4}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
          <Stack alignItems='center' direction='column'>
            <StyledAvatar alt={td('avatar')} src={`${config.appwriteConfig.apiEndpoint}/storage/buckets/${config.appwriteConfig.bucketId}/files/${designerDetails?.image_id}/preview?project=${config.appwriteConfig.projectId}`} />
          </Stack>
        </Grid>
        <Grid container size={{ sm: 12, md: 8, lg: 6, xl: 4 }} spacing={2}>
          <Grid size={12}>
            <StyledLabel>{td('displayName')}</StyledLabel>
            <StyledValue>{designerDetails?.display_name || '-'}</StyledValue>
          </Grid>
          <Grid size={12}>
            <StyledLabel>{td('name')}</StyledLabel>
            <StyledValue>{designerDetails?.name || '-'}</StyledValue>
          </Grid>
          <Grid size={12}>
            <StyledLabel>{td('type')}</StyledLabel>
            <Stack direction='row' gap={1}>
              {designerDetails?.type ? designerIcons[designerDetails.type] : designerIcons.other}
              <StyledValue>{td(designerDetails?.type) || '-'}</StyledValue>
            </Stack>
          </Grid>
          <Grid container>
            <Button
              onClick={() => navigate(`/designers/${id}/update`)}
              size='large'
              startIcon={buttonIcons.update}
              variant='contained'
            >
              {tb('update')}
            </Button>
            <Button
              onClick={() => navigate('/designers')}
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

export default DesignerDetailsPage;
