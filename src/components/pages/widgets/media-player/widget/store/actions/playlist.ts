import { getPlaylist } from '../../api/user';

import { usePlaylistData } from '../../store/playlist';

import sharedActions from '../../store/actions/shared';
import { getImageSrc, getTrackArtists } from '../../utils/common';

export const usePlayListActions = () => {
  const { tracks, playlist, setPlaylist, setLoading, setPlaylistTracks } = usePlaylistData();

  const onFetchPlaylist = async (playlistId) => {
    if (!playlistId || playlistId === playlist?.id) {
      return;
    }
    setLoading(true);

    try {
      const { data } = await getPlaylist(playlistId);

      setPlaylist({
        id: data.id,
        uri: data.uri,
        public: data.public,
        name: data.name,
        image: getImageSrc(data.images),
        followers: data.followers.total,
        owner: data.owner.display_name,
        totalTracks: data.tracks.total
      });
      const tracks = data.tracks.items.map(({ track }) => ({
        id: track.id,
        uri: track.uri,
        name: track.name,
        image: getImageSrc(track.album.images),
        album: track.album.name,
        artists: getTrackArtists(track.artists),
        duration_ms: track.duration_ms
      }));
      setPlaylistTracks(tracks);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSetPlayTrack = async (trackURI) => {
    await sharedActions.onSetActiveTrack(playlist.uri, tracks, trackURI);
  };

  return {
    onFetchPlaylist,
    onSetPlayTrack,
  }
};
