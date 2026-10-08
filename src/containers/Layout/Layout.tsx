import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import { MouseEvent, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import Logo from '../../assets/Logo.svg';
import { StyledAvatar } from '../../global_styled_components';
import useIcons from '../../hooks/useIcons';
import { StoreDispatch } from '../../store';
import { setHasMessage, setIsLoading } from '../../store/global.slice';
import { logoutUser } from '../../store/user.slice';
import {
  StyledBody,
  StyledContent,
  StyledDrawer,
  StyledHeader,
  StyledLayout
} from './Layout.styled';

interface NavigationButton {
  icon: ReactNode;
  link: string;
  text: string;
}

interface LayoutProps {
  children: ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch<StoreDispatch>();
  const { buttons: buttonIcons, designers: designerIcons } = useIcons();
  const navigate = useNavigate();
  const [isNavigationOpen, setIsNavigationOpen] = useState<boolean>(true);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { t: ta } = useTranslation('authentication');
  const { t: tl } = useTranslation('layout');

  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const handleLogoutButtonClick = async () => {
    setUserMenuAnchorEl(null);
    dispatch(setIsLoading(true));
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: ta('successfulLoggOut'), messageType: 'success' }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch(setIsLoading(false));
      dispatch(setHasMessage({ hasMessage: true, message: errorMessage, messageType: 'error' }));
    }
  };
  
  const handleUserMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const isUserMenuOpen = Boolean(userMenuAnchorEl);

  const navigationButtons: NavigationButton[] = [
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
          <Tooltip title={tl('userMenu')}>
            <IconButton onClick={handleUserMenuClick}>
              <StyledAvatar
                alt={''}
                $size='list'
                src={''}
              />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={userMenuAnchorEl}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            onClick={handleUserMenuClose}
            onClose={handleUserMenuClose}
            open={isUserMenuOpen}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem dense onClick={handleLogoutButtonClick}>
              {tl('logout')}
            </MenuItem>
          </Menu>
        </Box>
      </StyledHeader>

      <StyledBody>
        <StyledDrawer $open={isNavigationOpen}>
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