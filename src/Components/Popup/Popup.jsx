import React from 'react';
import { useStyles } from './PopupTheme';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export const Popup = ({ open, close, children }) => {
  const classes = useStyles();

  return (
    <>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className={classes.paper}>{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
};
