import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import DesignerForm from '../components/DesignerForm';
import { PageContainer } from '../../../global_styled_components';
import { readDesignerService } from '../../../services/designers.services';
import { StoreDispatch } from '../../../store';
import { setIsLoading } from '../../../store/global.slice';

const UpdateDesignerPage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { id } = useParams<{ id: string }>();

  const { data: designerDetails, isLoading: designerDetailsIsLoading } = useQuery({
    queryKey: ['designer-details', id],
    queryFn: () => readDesignerService(id ?? ''),
    enabled: !!id
  });

  useEffect(() => {
    if (designerDetailsIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [designerDetailsIsLoading, dispatch]);

  return (
    <PageContainer elevation={4}>
      <DesignerForm formData={designerDetails} />
    </PageContainer>
  );
};

export default UpdateDesignerPage;
