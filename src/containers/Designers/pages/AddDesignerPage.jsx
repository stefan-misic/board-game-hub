import { PageContainer } from '../../../global_styled_components';

import Grid from '@mui/material/Grid';

const AddDesignerPage = () => {
  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid size={2}>
        image
        </Grid>
        <Grid container size={10} spacing={1}>
          <Grid size={12}>
            display name
          </Grid>
          <Grid size={12}>
            name
          </Grid>
          <Grid size={12}>
            is essential
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AddDesignerPage;
