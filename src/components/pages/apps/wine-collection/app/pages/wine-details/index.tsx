import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Rating from '@mui/material/Rating';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';

import DeleteWineModal from '@pages/apps/wine-collection/app/components/modals/delete-wine';
import NoData from '@pages/apps/wine-collection/app/components/no-data';

import { useStore } from '@pages/apps/wine-collection/app/store';
import { useAppModal } from '@pages/apps/wine-collection/app/store/app-modal';
import { TWine } from '@pages/apps/wine-collection/app/dto';

import { mergeClassNames } from '@utils/common';

import styles from './style.module.scss'

const WineDetails = () => {
  const { actions, wineDetails } = useStore((store) => store);
  const { openModal, closeModal } = useAppModal((store) => store);
  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const params = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [formFields, setFormFields] = useState<TWine>({
    id: '',
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

  useEffect(() => {
    fetchWineData().then();
  }, [params.id]);

  useEffect(() => {
    if (wineDetails) {
      setFormFields({...wineDetails })
    }
  }, [wineDetails]);

  const fetchWineData = async () => {
    setLoading(true);
    const error = await actions.getWine(params.id);
    setLoading(false);

    if (error) {
      snackbar.enqueueSnackbar({
        variant: 'error',
        message: error,
        autoHideDuration: 3000
      });
      return;
    }
  };

  const onChangeFormField = (name, value) => {
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const onSave = async () => {
    setSubmitting(true);
    const error = await actions.onUpdateWine(formFields);
    setSubmitting(false);

    if (error) {
      snackbar.enqueueSnackbar({
        variant: 'error',
        message: error
      });
      return;
    }
    snackbar.enqueueSnackbar({
      variant: 'success',
      message: 'Wine was successfully updated'
    });
    navigate(-1);
  };

  const onDelete = async () => {
    setSubmitting(true);
    const error = await actions.onDeleteWine(wineDetails.id);
    setSubmitting(false);

    if (error) {
      snackbar.enqueueSnackbar({
        variant: 'error',
        message: error
      });
      return;
    }
    closeModal('delete-wine-modal')
    navigate(-1);
    snackbar.enqueueSnackbar({
      variant: 'success',
      message: 'Wine was successfully deleted'
    });
  }

  const onDeleteWine = () => {
    openModal({
      name: 'delete-wine-modal',
      props: {},
      content: (
        <DeleteWineModal
          data={wineDetails}
          onConfirm={onDelete}
          onClose={() => closeModal('delete-wine-modal')}
        />
      ),
    });
  };

  const renderDetails = () => {
    if (loading) {
      return (
        <div className={styles.skeleton}>
          <div className={styles.imageBox}>
            <ImageOutlinedIcon className={styles.image} />
          </div>
          <div className={styles.details}>
            <div className={styles.formFields}>
              <div className={styles.rating}>
                <span className={styles.label} />
                <span className={styles.stars} />
              </div>
              {
                Array(14).fill(1).map((item, index) => (
                  <div className={styles.fieldBox} key={index} />
                ))
              }
            </div>
            <div className={styles.actions}>
              <div className={mergeClassNames([styles.button, styles.delete])} />
              <div className={mergeClassNames([styles.button, styles.save])} />
            </div>
          </div>
        </div>
      )
    }
    if (!wineDetails) {
      return (
        <NoData
          title="No wine data"
          subtitle="Sorry we couldn't find a wine."
        />
      );
    }
    return (
      <>
        <div className={styles.imageBox}>
          <IconButton className={styles.backButton} onClick={() => navigate(-1)}>
            <ArrowBackRoundedIcon />
          </IconButton>
          <img src={wineDetails.imageURL} alt={wineDetails.fullName} />
        </div>
        <div className={mergeClassNames([styles.details, submitting && styles.submitting])}>
          <form className={styles.formFields}>
            <div>
              <span className={styles.fieldLabel}>Rating</span>
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
          <div className={styles.actions}>
            <Button variant="contained" color="error" onClick={onDeleteWine}>Delete</Button>
            <Button variant="contained" onClick={onSave} loading={submitting}>Save</Button>
          </div>
        </div>
      </>
    )
  };

  return (
    <section className={styles.wineAppWineDetails}>
      {renderDetails()}
    </section>
  );
};

export default WineDetails;