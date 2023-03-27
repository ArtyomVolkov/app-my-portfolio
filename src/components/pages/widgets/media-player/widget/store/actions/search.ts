import { searchData } from '../../api/search';

import { useSearchData } from '../../store/search';

export const useSearchActions = () => {
  const { setLoading, setSearch, setSearchType, getState } = useSearchData();

  const onSearch = async () => {
    const { search, searchType } = getState();

    if (!search) {
      return;
    }

    setLoading(true);
    const data = await searchData(search, searchType);
    setLoading(false);
    console.log(data);
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
