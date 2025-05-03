import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography  from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import MenuItem from '@mui/material/MenuItem';
import Select  from '@mui/material/Select';

import { mergeClassNames } from '@utils/common';

import { TWine } from '@pages/apps/wine-collection/app/dto';

import styles from './style.module.scss';

const AddNewWineModal = ({ onClose, onSubmit }) => {
  const snackbar = useSnackbar();
  const [submitting, setSubmitting] = useState(false);
  const [formFields, setFormFields] = useState<Partial<TWine>>({
    brand: '',
    fullName: '',
    imageURL: '',
    color: '',
    rate: 0,
    grape: '',
    year: '',
    alcohol: '',
    match: '',
    aroma: '',
    taste: '',
    price: '',
    description: '',
    country: ''
  });

  const onChangeFormField = (name, value) => {
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const onSubmitForm = async () => {
    setSubmitting(true);
    const error = await onSubmit(formFields);
    setSubmitting(false);

    if (error) {
      snackbar.enqueueSnackbar({
        variant: 'error',
        message: error
      });
      return;
    }
    onClose();
    snackbar.enqueueSnackbar({
      variant: 'success',
      message: 'Wine was successfully added to your collection',
    });
  };

  return (
    <div className={mergeClassNames([styles.wineAppNewWineModal, submitting && styles.loading])}>
      <div className={styles.header}>
        <span className={styles.title}>Add new wine</span>
      </div>
      <div className={styles.body}>
        <form className={styles.formFields}>
          <div>
            <Typography>Rating</Typography>
            <Rating
              value={formFields.rate}
              max={10} precision={1}
              onChange={(e, value) => onChangeFormField('rate', value )}
            />
          </div>
          <TextField
            label="Brand"
            size="small"
            value={formFields.brand}
            onChange={(e) => onChangeFormField('brand', e.target.value)}
          />
          <TextField
            label="Full Name"
            size="small"
            value={formFields.fullName}
            onChange={(e) => onChangeFormField('fullName', e.target.value)}
          />
          <FormControl size="small">
            <InputLabel>Color</InputLabel>
            <Select
              value={formFields.color}
              size="small"
              label="Type"
              onChange={(e) => onChangeFormField('color', e.target.value)}
            >
              <MenuItem value="red">
                Red
              </MenuItem>
              <MenuItem value="white">
                White
              </MenuItem>
              <MenuItem value="sparkling">
                Sparkling
              </MenuItem>
              <MenuItem value="rose">
                Rose
              </MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Country"
            size="small"
            value={formFields.country}
            onChange={(e) => onChangeFormField('country', e.target.value)}
          />
          <TextField
            label="Image URL"
            size="small"
            value={formFields.imageURL}
            onChange={(e) => onChangeFormField('imageURL', e.target.value)}
          />
          <TextField
            label="Grape"
            size="small"
            value={formFields.grape}
            onChange={(e) => onChangeFormField('grape', e.target.value)}
          />
          <TextField
            label="Year"
            size="small"
            type="number"
            value={formFields.year}
            onChange={(e) => onChangeFormField('year', e.target.value)}
          />
          <TextField
            label="Alcohol"
            size="small"
            value={formFields.alcohol}
            slotProps={{
              input: {
                endAdornment: <span>%</span>
              }
            }}
            onChange={(e) => onChangeFormField('alcohol', e.target.value)}
          />
          <TextField
            label="Match"
            size="small"
            value={formFields.match}
            onChange={(e) => onChangeFormField('match', e.target.value)}
          />
          <TextField
            label="Aroma"
            size="small"
            multiline
            maxRows={3}
            value={formFields.aroma}
            onChange={(e) => onChangeFormField('aroma', e.target.value)}
          />
          <TextField
            label="Taste"
            size="small"
            multiline
            maxRows={3}
            value={formFields.taste}
            onChange={(e) => onChangeFormField('taste', e.target.value)}
          />
          <TextField
            label="Price"
            size="small"
            value={formFields.price}
            onChange={(e) => onChangeFormField('price', e.target.value)}
          />
          <TextField
            label="Description"
            size="small"
            multiline
            minRows={3}
            maxRows={5}
            value={formFields.description}
            onChange={(e) => onChangeFormField('description', e.target.value)}
          />
        </form>
      </div>
      <div className={styles.actions}>
        <Button variant="outlined" onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={onSubmitForm}
          loading={submitting}
          disabled={!formFields.brand || !formFields.fullName || !formFields.color}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default AddNewWineModal;