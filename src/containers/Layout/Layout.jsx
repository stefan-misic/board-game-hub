import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { useForm } from 'react-hook-form';

import app from '../../lib/firebase';
import { StyledLayout } from './Layout.styled';

const Layout = ({ children }) => {
  const { handleSubmit, register } = useForm();

  const db = getFirestore(app);

  const handleAppFormSubmit = async (appData) => {
    console.log('appData', appData);
    const appDatabase = collection(db, 'apps');
    const appSnapshot = await getDocs(appDatabase);
    const appList = appSnapshot.docs.map(doc => doc.data());
    console.log('appList', appList);
  };

  return (
    <StyledLayout>
      {children}

      <form onSubmit={handleSubmit(handleAppFormSubmit)}>
        <input {...register('appInput')} />
        <input type="submit" />
      </form>
    </StyledLayout>
  );
};

export default Layout;