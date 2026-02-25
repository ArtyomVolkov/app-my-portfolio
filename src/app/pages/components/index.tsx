import Main from '@app/layout/main';
import NavButton from '@shared/components/buttons/navigation';

import CategoryIcon from '@mui/icons-material/Category';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';

import styles from './style.module.scss';

const ComponentsPage = () => {
  return (
    <Main className={styles.componentsPage}>
      <NavButton
        path="/components/shapes"
        title="3D Shapes"
        icon={<CategoryIcon className="icon" />}
      />
      <NavButton
        path="/components/ui-kit"
        title="UI-Kit"
        icon={<ReceiptLongRoundedIcon className="icon" />}
      />
    </Main>
  );
};

export default ComponentsPage;
