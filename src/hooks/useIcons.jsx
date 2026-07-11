import AddTaskIcon from '@mui/icons-material/AddTask';
import EditDocumentIcon from '@mui/icons-material/EditDocument';
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
    create: <AddTaskIcon />,
    update: <EditDocumentIcon />,
    updateConfirm: <TaskIcon />
  };

  return {
    designers,

    buttons
  };
};

export default useIcons;
