import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import {
  PageContainer,
  StyledAvatar,
  StyledLabel,
  StyledValue
} from '../../../global_styled_components';
import useIcons from '../../../hooks/useIcons';
import { readDesignerService } from '../../../services/designers.services';
import { previewFileService } from '../../../services/storage.services';
import { setIsLoading } from '../../../store/global.slice';

const DesignerDetailsPage = () => {
  const dispatch = useDispatch();
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const { id } = useParams();
  const { t: tb } = useTranslation('buttons');
  const { t: td } = useTranslation('designers');

  const { data: designerDetails, isLoading: designerDetailsIsLoading } = useQuery({
    queryKey: ['designer-details', id],
    queryFn: () => readDesignerService(id)
  });
  const { data: designerImage, isLoading: designerImageIsLoading } = useQuery({
    queryKey: ['designer-image', designerDetails?.image_id],
    queryFn: () => designerDetails?.image_id ? previewFileService(designerDetails?.image_id) : ''
  });

  useEffect(() => {
    if (designerDetailsIsLoading || designerImageIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [designerDetailsIsLoading, designerImageIsLoading]);

  return (
    <PageContainer elevation={4}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 12, md: 2 }}>
          <Stack alignItems='center' direction='column'>
            <StyledAvatar alt={td('avatar')} src={designerImage} />
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
              size='large'
              startIcon={buttonIcons.update}
              variant='contained'
            >
              {tb('update')}
            </Button>
            <Button
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
