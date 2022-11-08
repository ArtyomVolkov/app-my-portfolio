import React from 'react';

import Main from '@components/main';
import History from '@shared/components/history';

import { TRANSACTION_HISTORY } from '@shared/mock-data/widgets';

const WidgetsPage = () => {
  return (
    <Main>
      <History
        title={TRANSACTION_HISTORY.title}
        data={TRANSACTION_HISTORY.data}
      />
    </Main>
  );
}

export default WidgetsPage;
