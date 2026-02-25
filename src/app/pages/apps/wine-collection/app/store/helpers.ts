import type { TWine } from '../dto';

const searchWineFilter = (
  search: string,
  filter: { [key: string]: [] | string },
  wineList: Array<TWine>
) => {
  let data = wineList ? [...wineList] : [];
  const filterKeys = filter ? Object.keys(filter) : [];

  if (search) {
    data = data.filter((item) => {
      return (
        item.fullName
          .trim()
          .toLowerCase()
          .includes(search.trim().toLowerCase()) ||
        item.brand.trim().toLowerCase().includes(search.trim().toLowerCase())
      );
    });
  }
  if (!filterKeys?.length) {
    return data;
  }
  filterKeys.forEach((key) => {
    const filterItem: any = filter[key];

    if (!filterItem || !filterItem.length) {
      return;
    }
    data = data.filter((item) => {
      
      if (!item[key as keyof TWine]) {
        return;
      }
      if (key === 'rate' || key === 'year') {
        return item[key] >= filterItem[0] && item[key] <= filterItem[1];
      }
      if (key === 'price') {
        const price = Number((item[key as keyof TWine] as string).split(' ')[0]);

        return price >= Number(filterItem[0]) && price <= Number(filterItem[1]);
      }
      if (key === 'match') {
        const matches = (item[key as keyof TWine] as string).split(',') as string[];

        return matches.some((opt) =>
          opt.trim().toLowerCase().includes((filterItem as string).trim().toLowerCase())
        );
      }
      if (Array.isArray(filterItem)) {
        return filterItem.includes(item[key as keyof TWine] as string);
      }
    });
  });

  return data;
};

const hasAnyFilter = (
  search: string,
  filters: { [key: string]: [] | string }
) => {
  return (
    search?.length > 0 ||
    (filters &&
      Object.keys(filters)?.filter((item) => filters[item]?.length > 0).length >
        0)
  );
};

const getFilterCount = (filters: { [key: string]: [] | string }) => {
  if (!filters || !Object.keys(filters).length) {
    return 0;
  }
  return Object.keys(filters).filter((item) => filters[item]?.length > 0)
    .length;
};

export default {
  getFilterCount,
  searchWineFilter,
  hasAnyFilter,
};
