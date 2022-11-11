import React from 'react';

import Main from '@components/main';
import NavButton from '@shared/components/buttons/navigation';

import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';

const WidgetsPage = () => {
  return (
    <Main>
      <NavButton
        path="/widgets/history"
        title="History"
        icon={<HistoryRoundedIcon className="icon"/>}
      />
    </Main>
  );
}

export default WidgetsPage;
