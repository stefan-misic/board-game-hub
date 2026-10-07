import AddTaskIcon from '@mui/icons-material/AddTask';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GradeIcon from '@mui/icons-material/Grade';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Task';
import UndoIcon from '@mui/icons-material/Undo';
import { ReactElement } from 'react';

export interface ButtonIcons {
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

export interface DesignerIcons {
  essential: ReactElement;
  global: ReactElement;
  other: ReactElement;
  top: ReactElement;
}

interface UseIcons {
  designers: DesignerIcons;
  buttons: ButtonIcons;
}
const useIcons = (): UseIcons => {
  const designers: DesignerIcons = {
    essential: <GradeIcon sx={{ color: 'icon.orange' }} />,
    global: <EmojiPeopleIcon />,
    other: <EmojiPeopleIcon sx={{ color: 'icon.yellow' }} />,
    top: <HotelClassIcon sx={{ color: 'icon.red' }} />
  };

  const buttons: ButtonIcons = {
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

    buttons
  };
};

export default useIcons;
