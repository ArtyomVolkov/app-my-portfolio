import { getPlaylists } from '../../api/user';

import { useAuthData } from '../../store';
import { usePlaylistsData } from '../../store/playlists';

export const usePlayListsActions = () => {
  const { token } = useAuthData();
  const { playlists, setPlaylists, setLoading } = usePlaylistsData();

  const onFetchPlaylists = async () => {
    if (playlists.length) {
      return;
    }
    setLoading(true);

    try {
      const data = await getPlaylists(token);

      setLoading(false);
      setPlaylists(data.items);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchPlaylists,
  }
};
