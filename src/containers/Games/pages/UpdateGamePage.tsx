import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

import { SearchInputOption } from '../../../components/SearchInput/SearchInput';
import { PageContainer } from '../../../global_styled_components';
import { readGameService } from '../../../services/games.services';
import { StoreDispatch } from '../../../store';
import { setIsLoading } from '../../../store/global.slice';
import GameForm from '../components/GameForm';
import { GameFormValues } from '../components/GameForm.schema';

const UpdateGamePage = () => {
  const dispatch = useDispatch<StoreDispatch>();
  const { id } = useParams<{ id: string }>();
  const [selectedDesigners, setSelectedDesigners] = useState<SearchInputOption[] | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<SearchInputOption | null>(null);

  const { data: gameDetails, isLoading: gameDetailsIsLoading } = useQuery({
    queryKey: ['game-details', id],
    queryFn: () => readGameService(id ?? ''),
    enabled: !!id
  });

  useEffect(() => {
    if (gameDetailsIsLoading) {
      dispatch(setIsLoading(true));
    } else {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, gameDetailsIsLoading]);

  const formData: GameFormValues | null = useMemo(() => {
    if (!gameDetails) return null;

    const { designers, publisher, system, ...rest } = gameDetails;
    const designerIds = designers?.map((designer) => ({ value: designer.$id })) ?? [];

    return {
      ...rest,
      designer_ids: designerIds,
      publisher_id: publisher?.$id ?? '',
      system_id: system?.$id ?? ''
    };
  }, [gameDetails]);

  const selectedPublisher: SearchInputOption | null = useMemo(() => {
    if (!gameDetails) return null;

    return {
      id: gameDetails?.publisher?.$id ?? '',
      imageId: gameDetails?.publisher?.image_id ?? '',
      label: gameDetails?.publisher?.name ?? ''
    };
  }, [gameDetails]);

  return (
    <PageContainer elevation={4}>
      <GameForm
        formData={formData}
        selectedDesigners={selectedDesigners}
        selectedSystem={selectedSystem}
        selectedPublisher={selectedPublisher}
      />
    </PageContainer>
  );
};

export default UpdateGamePage;
