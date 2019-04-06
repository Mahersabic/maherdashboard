import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { AppNavbarBrand } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {
    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: 'Logo' }}
          minimized={{ src: logo, width: 30, height: 30, alt: 'Logo' }}
        />
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
