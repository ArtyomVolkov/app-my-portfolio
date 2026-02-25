import Breadcrumbs from '@shared/components/breadcrumbs';
import ThemeSwitcher from '@shared/components/theme-switcher';

import styles from './style.module.scss';

const Header = () => (
  <header className={styles.appHeader}>
    <Breadcrumbs />
    <ThemeSwitcher />
  </header>
);

export default Header;
