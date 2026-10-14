import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { PageContainer } from '../../../global_styled_components';
import { readPublisherService } from '../../../services/publishers.services';
import { StoreDispatch } from '../../../store';
import { setIsLoading } from '../../../store/global.slice';
import PublisherForm from '../components/PublisherForm';

const UpdatePublisherPage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { id } = useParams<{ id: string }>();

  const { data: publisherDetails, isLoading: publisherDetailsIsLoading } = useQuery({
    queryKey: ['publisher-details', id],
    queryFn: () => readPublisherService(id ?? ''),
    enabled: !!id
  });

  useEffect(() => {
    if (publisherDetailsIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, publisherDetailsIsLoading]);

  return (
    <PageContainer elevation={4}>
      <PublisherForm formData={publisherDetails} />
    </PageContainer>
  );
};

export default UpdatePublisherPage;
