import { getPlaylist } from '../../api/user';

import { useAuthData } from '../../store';
import { usePlaylistData } from '../../store/playlist';

import { getImageSrc, getTrackArtists } from '../../utils/common';

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
        image: getImageSrc(data.images),
        followers: data.followers.total,
        owner: data.owner.display_name,
        totalTracks: data.tracks.total
      });
      const tracks = data.tracks.items.map(({ track }) => ({
        id: track.id,
        name: track.name,
        image: getImageSrc(track.album.images),
        album: track.album.name,
        artists: getTrackArtists(track.artists),
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
