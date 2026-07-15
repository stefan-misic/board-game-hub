import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import Logo from '../../assets/Logo.svg';
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
  const navigate = useNavigate();
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const { t: tl } = useTranslation('layout');

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const navigationButtons = [
    {
      icon: designerIcons.global,
      link: '/designers',
      text: tl('designers')
    }
  ];
  
  return (
    <StyledLayout>
      <StyledHeader>
        <Box>
          {!isTablet && (
            <Tooltip title={tl('toggleNavigation')}>
              <IconButton onClick={() => setIsNavigationOpen(!isNavigationOpen)}>
                {buttonIcons.menu}
              </IconButton>
            </Tooltip>
          )}
          <img onClick={() => navigate('/designers')} src={Logo} />
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
          $open={isNavigationOpen}
          open={isNavigationOpen}
          variant='permanent'
        >
          <List>
            {navigationButtons.map((navButton, i) => (
              <ListItem key={i}>
                <ListItemButton onClick={() => navigate(navButton.link)}>
                  {!isTablet ? (
                    <>
                      <ListItemIcon>
                        {navButton.icon}
                      </ListItemIcon>
                      <ListItemText primary={navButton.text} />
                    </>
                  ) : (
                    <Tooltip title={navButton.text}>
                      <ListItemIcon>
                        {navButton.icon}
                      </ListItemIcon>
                    </Tooltip>
                  )}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </StyledDrawer>

        <StyledContent $short={isNavigationOpen}>
          {children}
        </StyledContent>
      </StyledBody>
    </StyledLayout>
  );
};

export default Layout;