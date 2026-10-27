import AddTaskIcon from '@mui/icons-material/AddTask';
import AnimationIcon from '@mui/icons-material/Animation';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import CasinoIcon from '@mui/icons-material/Casino';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GradeIcon from '@mui/icons-material/Grade';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Task';
import UndoIcon from '@mui/icons-material/Undo';
import { ReactElement } from 'react';

interface ButtonIcons {
  [key: string]: ReactElement; 
  add: ReactElement;
  cancel: ReactElement;
  close: ReactElement;
  create: ReactElement;
  createConfirm: ReactElement;
  delete: ReactElement;
  deleteConfirm: ReactElement;
  deleteList: ReactElement;
  menu: ReactElement;
  update: ReactElement;
  updateList: ReactElement;
  updateConfirm: ReactElement;
  view: ReactElement;
}

interface DesignerIcons {
  [key: string]: ReactElement; 
  essential: ReactElement;
  global: ReactElement;
  other: ReactElement;
  top: ReactElement;
}

interface GameIcons {
  [key: string]: ReactElement;
  edition: ReactElement;
  expansion: ReactElement;
  global: ReactElement;
  sequel: ReactElement;
  system: ReactElement;
}

interface PublisherIcons {
  [key: string]: ReactElement; 
  essential: ReactElement;
  global: ReactElement;
  other: ReactElement;
}

interface UseIcons {
  buttons: ButtonIcons;
  designers: DesignerIcons;
  games: GameIcons,
  publishers: PublisherIcons;
}
const useIcons = (): UseIcons => {
  const designers: DesignerIcons = {
    essential: <GradeIcon sx={{ color: 'icon.orange' }} />,
    global: <EmojiPeopleIcon />,
    other: <EmojiPeopleIcon sx={{ color: 'icon.yellow' }} />,
    top: <HotelClassIcon sx={{ color: 'icon.red' }} />
  };
  const games: GameIcons = {
    edition: <ContentCopyIcon sx={{ color: 'icon.red' }} />,
    expansion: <AspectRatioIcon sx={{ color: 'icon.orange' }} />,
    global: <CasinoIcon />,
    sequel: <AnimationIcon sx={{ color: 'icon.yellow' }} />,
    system: <CasinoIcon sx={{ color: 'icon.purple' }} />
  };
  const publishers: PublisherIcons = {
    essential: <GradeIcon sx={{ color: 'icon.orange' }} />,
    global: <LocalLibraryIcon />,
    other: <EmojiPeopleIcon sx={{ color: 'icon.yellow' }} />
  };

  const buttons: ButtonIcons = {
    add: <ControlPointIcon fontSize='small' />,
    cancel: <UndoIcon />,
    close: <CloseIcon fontSize='small' />,
    create: <AssignmentAddIcon />,
    createConfirm: <AddTaskIcon />,
    delete: <DeleteIcon />,
    deleteConfirm: <DeleteForeverIcon />,
    deleteList: <HighlightOffOutlinedIcon fontSize='small' />,
    menu: <MenuIcon />,
    update: <EditDocumentIcon />,
    updateList: <EditNoteOutlinedIcon fontSize='small' />,
    updateConfirm: <TaskIcon />,
    view: <ContentPasteSearchIcon fontSize='small' />
  };

  return {
    designers,
    games,
    publishers,

    buttons
  };
};

export default useIcons;
