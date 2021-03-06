import React from 'react';
import { object } from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import createNewAuditStyles from './CreateNew.style';

const propTypes = {
  classes: object.isRequired,
};

const CreateNewAuditComponent = props => {
  const { classes } = props;

  return (
    <div className={classnames(classes.content)}>
      Create New Audit contents goes here
    </div>
  );
};

CreateNewAuditComponent.propTypes = propTypes;

export default withStyles(createNewAuditStyles)(CreateNewAuditComponent);
