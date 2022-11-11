import React from 'react';

import Main from '@components/main';
import Transaction from '@pages/widgets/history/transaction';

import { TRANSACTION_HISTORY } from '@shared/mock-data/widgets';

const HistoryWidget = () => {
  return (
    <Main>
      <Transaction
        title={TRANSACTION_HISTORY.title}
        data={TRANSACTION_HISTORY.data}
      />
    </Main>
  );
}

export default HistoryWidget;
