import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import DesignerForm from '../components/DesignerForm';
import { PageContainer } from '../../../global_styled_components';
import { readDesignerService } from '../../../services/designers.services';
import { setIsLoading } from '../../../store/global.slice';

const UpdateDesignerPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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
      <DesignerForm formData={designerDetails} />
    </PageContainer>
  );
};

export default UpdateDesignerPage;
