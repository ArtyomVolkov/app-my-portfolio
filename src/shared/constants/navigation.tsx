import HomeIcon from '@mui/icons-material/Home';
import AccountIcon from '@mui/icons-material/AccountBox';
import ComponentsIcon from '@mui/icons-material/DashboardCustomize';
import WidgetsIcon from '@mui/icons-material/Widgets';
import GameIcon from '@mui/icons-material/SportsEsports';
import CategoryIcon from '@mui/icons-material/Category';
import ExtensionRoundedIcon from '@mui/icons-material/ExtensionRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GridOnRoundedIcon from '@mui/icons-material/GridOnRounded';
import CollectionsIcon from '@mui/icons-material/Collections';
import GradientOutlinedIcon from '@mui/icons-material/GradientOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import MemoryOutlinedIcon from '@mui/icons-material/MemoryOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import LiquorOutlinedIcon from '@mui/icons-material/LiquorOutlined';
import TwoKPlusOutlinedIcon from '@mui/icons-material/TwoKPlusOutlined';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import SpotifyIcon from '@assets/icons/spotify';

type NavigationItem = {
  label: string;
  icon: React.ReactElement;
};

export const NAV_OPTIONS = [
  'profile',
  'apps',
  'games',
  'widgets',
  'components',
];

export const PATH_MAP: Record<string, NavigationItem> = {
  apps: {
    label: 'Apps',
    icon: <AppsOutlinedIcon />,
  },
  ['wine-collection']: {
    label: 'Wine Collection',
    icon: <LiquorOutlinedIcon />,
  },
  home: {
    label: 'Home',
    icon: <HomeIcon />,
  },
  profile: {
    label: 'Profile',
    icon: <AccountIcon />,
  },
  components: {
    label: 'Components',
    icon: <ComponentsIcon />,
  },
  shapes: {
    label: '3D Shapes',
    icon: <CategoryIcon />,
  },
  ['ui-kit']: {
    label: 'UI-Kit',
    icon: <ReceiptLongRoundedIcon />,
  },
  widgets: {
    label: 'Widgets',
    icon: <WidgetsIcon />,
  },
  games: {
    label: 'Games',
    icon: <GameIcon />,
  },
  puzzle: {
    label: 'Puzzle',
    icon: <ExtensionRoundedIcon />,
  },
  sudoku: {
    label: 'Sudoku',
    icon: <AppRegistrationIcon />,
  },
  '2048': {
    label: '2048',
    icon: <TwoKPlusOutlinedIcon />,
  },
  history: {
    label: 'History',
    icon: <HistoryRoundedIcon />,
  },
  gallery: {
    label: 'Gallery',
    icon: <CollectionsIcon />,
  },
  matrix: {
    label: 'Matrix',
    icon: <GradientOutlinedIcon />,
  },
  clock: {
    label: 'Clock',
    icon: <WatchLaterOutlinedIcon />,
  },
  memory: {
    label: 'Memory',
    icon: <MemoryOutlinedIcon />,
  },
  nonogram: {
    label: 'Nonogram',
    icon: <GridOnRoundedIcon />,
  },
  ['spotify-app']: {
    label: 'Spotify App',
    icon: <SpotifyIcon />,
  },
  user: {
    label: 'User',
    icon: <AccountIcon />,
  },
};