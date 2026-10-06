import { useTranslation } from 'react-i18next';

import { PageContainer } from '../../../global_styled_components';

const UnauthorizedPage = () => {
  const { t } = useTranslation('authorization');

  return (
    <PageContainer elevation={4}>
      {t('permissionRequired')}
    </PageContainer>
  );
};

export default UnauthorizedPage;
