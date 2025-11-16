import PropTypes from 'prop-types';

const Layout = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

Layout.PropTypes = {
  children: PropTypes.node
};

export default Layout;