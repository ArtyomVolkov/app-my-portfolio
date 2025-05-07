import React, { useMemo, useState } from 'react';

import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import { useStore } from '../../../store';

import styles from './style.module.scss';

const INITIAL_FILTERS = {
  country: [],
  color: [],
  match: [],
  rate: [0, 10],
  year: [1900, new Date().getFullYear()],
  price: [100, 5000]
};

const FILTER_OPTIONS = {
  country: [
    { value: 'italy', label: '🇮🇹 Italy'},
    { value: 'spain', label: '🇪🇸 Spain'},
    { value: 'france', label: '🇫🇷 France'},
    { value: 'hungary', label: '🇭🇺 Hungary'},
    { value: 'usa', label: '🇺🇸 USA'},
    { value: 'australia', label: '🇦🇺 Australia'},
    { value: 'new zealand', label: '🇳🇿 New Zealand'},
    { value: 'ukraine', label: '🇺🇦 Ukraine'},
  ],
  color: [
    { value: 'red', label: 'Red'},
    { value: 'white', label: 'White'},
    { value: 'sparkling', label: 'Sparkling'},
    { value: 'rose', label: 'Rose'},
  ],
  match: [
    { value: 'hard cheeses', label: 'Hard cheeses'},
    { value: 'white fish', label: 'White fish'},
    { value: 'meet', label: 'Meet'},
    { value: 'wildfowl', label: 'Wildfowl'},
    { value: 'seafood', label: 'Seafood'},
  ],
};

const SLIDER_MARKS = {
  rate: Array(11).fill(0).map((item, index) => ({ value: index, label: index })),
  year: [
    { value: 1900, label: '1900' },
    { value: 1920, label: '1920' },
    { value: 1940, label: '1940' },
    { value: 1960, label: '1960' },
    { value: 1980, label: '1980' },
    { value: 2000, label: '2000' },
    { value: new Date().getFullYear(), label: new Date().getFullYear() }
  ],
  price: [
    { value: 100, label: '100' },
    { value: 5000, label: '5000' },
  ]
};

const FilterWineModal = ({ onClose }) => {
  const { actions, wineList } = useStore((store) => store);
  const [form, setForm] = useState<{ [key: string]: any }>({
    country: wineList.filters?.country,
    color: wineList.filters?.color,
    match: wineList.filters?.match,
    rate: wineList.filters?.rate,
    year: wineList.filters?.year,
    price: wineList.filters?.price
  });

  const hasAnyFilter = useMemo(() => {
    return Object.keys(form)?.filter((item) => form[item]?.length > 0);
  }, [form]);

  const onChangeFormField = (name, value) => {
    setForm({
      ...form,
      [name]: value
    });
  };

  const onClearFilters = () => {
    setForm({});
    actions.onUpdateWineListFilter({});
  };

  const onApplyFilters = () => {
    actions.onUpdateWineListFilter({
      ...form
    });
  };

  return (
    <div className={styles.wineAppFilterWineModal}>
      <div className={styles.header}>
        <span className={styles.title}>Filter wine</span>
      </div>
      <div className={styles.body}>
        <div className={styles.formFields}>
          <div className={styles.filterItem}>
            <FormControl size="small" className={styles.formControl}>
              <InputLabel>Country</InputLabel>
              <Select
                value={form.country || INITIAL_FILTERS.country}
                size="small"
                label="Country"
                multiple
                onChange={(e) => onChangeFormField('country', e.target.value)}
              >
                {
                  FILTER_OPTIONS.country.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className={styles.filterItem}>
            <FormControl size="small" className={styles.formControl}>
              <InputLabel>Color</InputLabel>
              <Select
                value={form.color || INITIAL_FILTERS.color}
                size="small"
                label="Color"
                multiple
                onChange={(e) => onChangeFormField('color', e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" className={styles.matchChip} />
                    ))}
                  </Box>
                )}
              >
                {
                  FILTER_OPTIONS.color.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className={styles.filterItem}>
            <FormControl size="small"  className={styles.formControl}>
              <InputLabel>Match</InputLabel>
              <Select
                value={form.match || INITIAL_FILTERS.match}
                size="small"
                label="Match"
                multiple
                onChange={(e) => onChangeFormField('match', e.target.value)}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" className={styles.matchChip} />
                    ))}
                  </Box>
                )}
              >
                {
                  FILTER_OPTIONS.match.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                      {item.label}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.rangeField}>
              <Typography gutterBottom>
                Rating
              </Typography>
              <Slider
                className={styles.slider}
                valueLabelDisplay="auto"
                disableSwap
                onChange={(e, value) => onChangeFormField('rate', value)}
                min={0}
                max={10}
                step={0.5}
                value={form.rate || INITIAL_FILTERS.rate}
                marks={SLIDER_MARKS.rate}
              />
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.rangeField}>
              <Typography gutterBottom>
                Year
              </Typography>
              <Slider
                className={styles.slider}
                valueLabelDisplay="auto"
                disableSwap
                onChange={(e, value) => onChangeFormField('year', value)}
                min={SLIDER_MARKS.year[0].value}
                max={SLIDER_MARKS.year[SLIDER_MARKS.year.length-1].value}
                step={1}
                marks={SLIDER_MARKS.year}
                value={form.year || INITIAL_FILTERS.year}
              />
            </div>
          </div>
          <div className={styles.filterItem}>
            <div className={styles.rangeField}>
              <Typography gutterBottom>Price (UAH)</Typography>
              <Slider
                className={styles.slider}
                valueLabelDisplay="auto"
                disableSwap
                onChange={(e, value) => onChangeFormField('price', value)}
                min={SLIDER_MARKS.price[0].value}
                max={SLIDER_MARKS.price[1].value}
                step={10}
                marks={SLIDER_MARKS.price}
                value={form.price || INITIAL_FILTERS.price}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.secondary}>
          <Button variant="outlined" color="inherit" onClick={onClose}>Close</Button>
        </div>
        <div className={styles.primary}>
          <Button
            variant="outlined"
            color="error"
            onClick={onClearFilters}
            disabled={!hasAnyFilter}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={onApplyFilters}
            disabled={!hasAnyFilter}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterWineModal;