import { getTopItems } from '../../api/user';

import { useAuthData } from '../../store';
import { useUserData } from '../../store/user';

import { useSharedActions } from './shared';
import { getImageSrc } from '../../utils/common';

export const useUserActions = () => {
  const { token } = useAuthData();
  const { user, topTracks, setLoading, setTopArtists } = useUserData();
  const { onSetActiveTrack } = useSharedActions();

  const onFetchTopTracks = async () => {
    if (topTracks) {
      return;
    }
    setLoading(true);

    try {
      const artists = await getTopItems(token, 'artists');

      setTopArtists(artists.items.map((item) => ({
        id: item.id,
        name: item.name,
        genres: item.genres,
        image: getImageSrc(item.images)
      })));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const onSetPlayTrack = async (trackURI) => {
    await onSetActiveTrack(`${user.uri}:top:tracks`, topTracks, trackURI); //`${user.uri}:top:tracks`
  };

  return {
    onFetchTopTracks,
    onSetPlayTrack
  }
};
