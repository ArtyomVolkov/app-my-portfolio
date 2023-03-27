import { getPlaylists } from '../../api/user';

import { usePlaylistsData } from '../../store/playlists';

export const usePlayListsActions = () => {
  const { playlists, setPlaylists, setLoading } = usePlaylistsData();

  const onFetchPlaylists = async () => {
    if (playlists.length) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await getPlaylists();

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
