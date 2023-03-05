import { getTopItems } from '@pages/widgets/media-player/widget/api/user';
import { useAuthData } from '@pages/widgets/media-player/widget/store';

export const useUserActions = () => {
  const { token } = useAuthData();

  const onFetchTopItems = async () => {
    return await getTopItems(token, 'tracks');
  }

  return {
    onFetchTopItems,
  }
};
