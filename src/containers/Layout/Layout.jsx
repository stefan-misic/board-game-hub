import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledAvatar } from '../../global_styled_components';
import useIcons from '../../hooks/useIcons';
import {
  StyledBody,
  StyledContent,
  StyledDrawer,
  StyledHeader,
  StyledLayout
} from './Layout.styled';

const Layout = ({ children }) => {
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const { t: tl } = useTranslation('layout');

  const navigationButtons = [
    {
      icon: designerIcons.other,
      text: tl('designers')
    }
  ];
  
  return (
    <StyledLayout>
      <StyledHeader>
        <Box>
          <Tooltip title={tl('toggleNavigation')}>
            <IconButton onClick={() => setIsNavigationOpen(!isNavigationOpen)}>
              {buttonIcons.menu}
            </IconButton>
          </Tooltip>
        </Box>

        <Box>
          <StyledAvatar
            alt={''}
            $size='list'
            src={''}
          />
        </Box>
      </StyledHeader>

      <StyledBody>
        <StyledDrawer
          $isOpen={isNavigationOpen}
          open={isNavigationOpen}
          variant='permanent'
        >
          <List>
            {navigationButtons.map((navButton, i) => (
              <ListItem key={i}>
                <ListItemButton>
                  <ListItemIcon sx={{ minWidth: 0, mr: isNavigationOpen ? 3 : 'auto', justifyContent: 'center' }}>
                    {navButton.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={navButton.text}
                    sx={{ opacity: isNavigationOpen ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </StyledDrawer>

        <StyledContent $isOpen={isNavigationOpen}>
          {children}
        </StyledContent>
      </StyledBody>
    </StyledLayout>
  );
};

export default Layout;