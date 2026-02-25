import { useNavigate } from 'react-router';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import Main from '@app/layout/main';
import Typography from '@shared/components/ui-kit/typography';
import Divider from '@shared/components/ui-kit/divider';
import Button from '@shared/components/ui-kit/button';

import styles from './style.module.scss';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <Main className={styles.Page404}>
      <section className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h3">404</Typography>
          <Divider
            title={<Typography variant="h4">Page Not Found</Typography>}
          />
        </div>
        <div className={styles.body}>
          <Typography variant="h5">
            The page you are looking for does not exist.
          </Typography>
          <Typography variant="p">Try checking the URL for errors.</Typography>
        </div>
        <div className={styles.navButtons}>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            color="primary"
            startIcon={<ArrowBackRoundedIcon />}
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="solid"
            color="primary"
            startIcon={<HomeRoundedIcon />}
          >
            Home Page
          </Button>
        </div>
      </section>
    </Main>
  );
};

export default Page404;
