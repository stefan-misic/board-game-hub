import PropTypes from 'prop-types';

import { StyledLayout } from './Layout.styled';

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
};

Layout.PropTypes = {
  children: PropTypes.node
};

export default Layout;