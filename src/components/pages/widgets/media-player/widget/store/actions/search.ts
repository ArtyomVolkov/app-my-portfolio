import { searchData } from '../../api/search';
import { getImageSrc, getTrackArtists } from '../../utils/common';

import { useSearchData } from '../../store/search';

export const useSearchActions = () => {
  const { setLoading, setSearch, setSearchType, getState, setAllResult } = useSearchData();

  const onSearch = async () => {
    const { loading, search, searchType } = getState();

    if (loading || !search) {
      return;
    }

    setLoading(true);
    const { data } = await searchData(search, searchType === 'all' ? 'album,artist,playlist,track' : searchType);

    if (searchType === 'all') {
      setAllResult({
        albums: {
          data: data.albums.items.map((item: { [key: string]: any }) => ({
            id: item.id,
            name: item.name,
            image: getImageSrc(item.images),
            releaseDate: item.release_date,
            totalTracks: item.total_tracks,
          }))
        },
        artists: {
          data: data.artists.items.map((item) => ({
            id: item.id,
            name: item.name,
            followers: item.followers.total,
            image: getImageSrc(item.images)
          }))
        },
        playlists: {
          data: data.playlists.items.map((item) => ({
            id: item.id,
            name: item.name,
            image: getImageSrc(item.images),
            totalTracks: item.tracks.total,
          }))
        },
        tracks: {
          data: data.tracks.items.map((item) => ({
            id: item.id,
            name: item.name,
            duration_ms: item.duration_ms,
            album: item.album.name,
            artists: getTrackArtists(item.artists),
            image: getImageSrc(item.album.images, 100),
            uri: item.uri,
          }))
        },
      });
    }
    setLoading(false);
  };

  const onChangeSearch = (e) => {
    const { search } = getState();

    if (search !== e.target.value) {
      setSearch(e.target.value);
    }
  };

  const onChangeSearchType = (type) => {
    const { searchType } = getState();

    if (searchType !== type) {
      setSearchType(type);
    }
  };

  return {
    onSearch,
    onChangeSearch,
    onChangeSearchType,
  };
};
