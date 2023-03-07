import { getTopItems } from '../../api/user';
import { useAuthData } from '../../store';

export const useUserActions = () => {
  const { token } = useAuthData();

  const onFetchTopItems = async () => {
    return await getTopItems(token, 'tracks');
  };

  return {
    onFetchTopItems,
  }
};
