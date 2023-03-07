import { getPlaylists, getPlaylist } from '../../api/user';
import { useAuthData } from '../../store';

export const usePlayListsActions = () => {
  const { token } = useAuthData();

  const onFetchPlaylists = async () => {
    return await getPlaylists(token);
  };

  const onFetchPlayList = async (playListId) => {
    return await getPlaylist(token, playListId);
  }

  return {
    onFetchPlaylists,
    onFetchPlayList
  }
};
