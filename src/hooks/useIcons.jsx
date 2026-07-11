import AddTaskIcon from '@mui/icons-material/AddTask';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import CloseIcon from '@mui/icons-material/Close';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import GradeIcon from '@mui/icons-material/Grade';
import HotelClassIcon from '@mui/icons-material/HotelClass';
import TaskIcon from '@mui/icons-material/Task';
import UndoIcon from '@mui/icons-material/Undo';

const useIcons = () => {
  const designers = {
    essential: <GradeIcon sx={{ color: 'icon.orange' }} />,
    other: <EmojiPeopleIcon sx={{ color: 'icon.yellow' }} />,
    top: <HotelClassIcon sx={{ color: 'icon.red' }} />
  };

  const buttons = {
    cancel: <UndoIcon />,
    close: <CloseIcon fontSize='small' />,
    create: <AssignmentAddIcon />,
    createConfirm: <AddTaskIcon />,
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
