const searchWineFilter = (search, filter, wineList) => {
  let data = wineList ? [...wineList] : [];
  const filterKeys = filter ? Object.keys(filter) : [];

  if (search) {
    data = data.filter((item) => {
      return item.fullName.trim().toLowerCase().includes(search.trim().toLowerCase())
        || item.brand.trim().toLowerCase().includes(search.trim().toLowerCase());
    });
  }
  if (!filterKeys?.length) {
    return data;
  }
  filterKeys.forEach((key) => {
    const filterItem = filter[key];

    if (!filterItem || !filterItem.length) {
      return;
    }
    data = data.filter((item) => {
      if (!item[key]) {
        return;
      }
      if (key === 'rate' || key === 'year') {
        return item[key] >= filterItem[0] && item[key] <= filterItem[1];
      }
      if (key === 'price') {
        const price = Number(item[key].split(' ')[0]);

        return price >= filterItem[0] && price <= filterItem[1];
      }
      if (key === 'match') {
        const matches = item[key].split(',');

        return matches.some((item) => filterItem.includes(item.trim().toLowerCase()));
      }
      if (Array.isArray(filterItem)) {
        return filterItem.includes(item[key].toLowerCase());
      }
    });
  });

  return data;
};

const hasAnyFilter = (search, filters) => {
  return search?.length > 0
    || filters && Object.keys(filters)?.filter((item) => filters[item]?.length > 0).length > 0;
};

const getFilterCount = (filters) => {
  if (!filters || !Object.keys(filters).length) {
    return 0;
  }
  return Object.keys(filters).filter((item) => filters[item]).length;
}

export default {
  getFilterCount,
  searchWineFilter,
  hasAnyFilter,
}