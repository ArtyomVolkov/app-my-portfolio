import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ReceiptIcon from '@mui/icons-material/Receipt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const TRANSACTION_HISTORY = {
  title: 'Transaction History',
  data: [
    {
      title: 'Income $1500',
      color: '#26c226',
      date: '10.08.2022 17:56',
      icon: AttachMoneyIcon
    },
    {
      title: 'Outcome $1000',
      color: '#ff5757',
      date: '26.08.2022 13:18',
      icon: PointOfSaleIcon
    },
    {
      title: 'Tax payment $150.35',
      color: '#2e8bee',
      date: '31.08.2022 12:00',
      icon: ReceiptIcon
    },
    {
      title: 'Deposit income $132.18',
      color: '#e86f00',
      date: '31.08.2022 14:18',
      icon: RequestQuoteIcon
    },
    {
      title: 'Shop payments $93.12',
      color: '#e623c0',
      date: '10.08.2022 17:56',
      icon: ShoppingCartIcon
    }
  ]
};