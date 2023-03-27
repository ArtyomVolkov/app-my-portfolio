import { create } from 'zustand';

import { ILoading } from '../shared/interfaces/music-store';

interface ISearch extends ILoading {
  search: string,
  searchType: string,
  setSearch: (value: string) => void,
  setSearchType: (type: string) => void,
  getState: () => ({
    loading: boolean,
    search: string,
    searchType: string,
  }),
}

export const useSearchData = create<ISearch>((set, get) => ({
  loading: false,
  search: '',
  searchType: 'all',
  setLoading: (loading) => {
    set((state) => ({
      ...state,
      loading,
    }));
  },
  setSearch: (value) => {
    set((state) => ({
      ...state,
      search: value,
    }));
  },
  setSearchType: (value) => {
    set((state) => ({
      ...state,
      searchType: value,
    }));
  },
  getState: () => {
    const state = get();

    return {
      loading: state.loading,
      search: state.search,
      searchType: state.searchType,
    }
  }
}));
