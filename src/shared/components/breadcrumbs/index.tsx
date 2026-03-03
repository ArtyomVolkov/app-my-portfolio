import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router';

import Breadcrumb, {
  type BreadcrumbOption,
} from '@shared/components/ui-kit/breadcrumb';

import { PATH_MAP } from '@shared/constants/navigation';

type BreadcrumbsProps = {
  className?: string;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ className }) => {
  const navigation = useNavigate();
  const location = useLocation();

  const options = useMemo(() => {
    const paths =
      location.pathname.length === 1 ? [''] : location.pathname.split('/');

    return paths.map((item, index) => {
      if (!item) {
        return {
          label: PATH_MAP.home.label,
          link: '/',
          icon: PATH_MAP.home.icon,
        };
      }
      const path = paths.slice(0, index + 1).join('/');

      if (!PATH_MAP[item]) {
        return {
          label: item,
          link: '',
          icon: null,
        };
      }
      return {
        label: PATH_MAP[item].label,
        link: path,
        icon: PATH_MAP[item].icon,
      };
    });
  }, [location.pathname]);

  const onSelect = (option: BreadcrumbOption) => {
    if (option.link) {
      navigation(option.link);
    }
  };

  return (
    <Breadcrumb
      options={options}
      onSelect={onSelect}
      classes={{ root: className }}
    />
  );
};

export default Breadcrumbs;
