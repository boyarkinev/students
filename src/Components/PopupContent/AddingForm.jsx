import { useEffect, useState } from 'react';

import { Button, TextField } from '@material-ui/core';
import { PopupContentStyle } from './PopupContentStyle';

export const AddingForm = (props) => {
  const { close, formData, handleChange, data, handlePushData, children } =
    props;

  const classes = PopupContentStyle();

  const [valid, setValid] = useState(false);

  useEffect(() => {
    const obj = new Map(Object.entries(data));
    for (let item of obj.values()) {
      setValid(!!item);
    }
  }, [data]);

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      {formData.map((label, i) => (
        <TextField
          required
          key={Object.values(label)}
          value={data[Object.keys(label)]}
          className={classes.field}
          id={Object.values(label).toString()}
          label={Object.values(label)}
          onChange={handleChange}
        />
      ))}
      {children}
      <div className={classes.buttonsGroup}>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handlePushData}
          disabled={!valid}>
          OK
        </Button>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={close}>
          Отменить
        </Button>
      </div>
    </form>
  );
};
