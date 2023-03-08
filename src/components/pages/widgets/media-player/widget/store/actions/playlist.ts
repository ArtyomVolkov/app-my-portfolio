import { getPlaylist } from '../../api/user';

import { useAuthData } from '../../store';
import { usePlaylistData } from '../../store/playlist';

export const usePlayListActions = () => {
  const { token } = useAuthData();
  const { playlist, setPlaylist, setLoading, setPlaylistTracks } = usePlaylistData();

  const onFetchPlaylist = async (playlistId) => {
    if (!playlistId || playlistId === playlist?.id) {
      return;
    }
    setLoading(true);

    try {
      const data = await getPlaylist(token, playlistId);

      setLoading(false);
      setPlaylist({
        id: data.id,
        public: data.public,
        name: data.name,
        images: data.images,
        followers: data.followers,
        owner: data.owner,
        tracks: {
          total: data.tracks.total,
        }
      });
      const tracks = data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        album: track.album,
        artists: track.artists,
        duration_ms: track.duration_ms
      }));
      setPlaylistTracks(tracks);
    } catch (e) {
      setLoading(false);
    }
  };

  return {
    onFetchPlaylist,
  }
};
