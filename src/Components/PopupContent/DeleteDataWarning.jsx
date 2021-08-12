import Button from '@material-ui/core/Button';
import { PopupContentStyle } from './PopupContentStyle';

export const DeleteDataWarning = ({ close, accept, text }) => {
  const classes = PopupContentStyle();
  return (
    <>
      <p>{text}</p>
      <div className={classes.buttonsGroup}>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={accept}>
          Удалить
        </Button>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={close}>
          Отмена
        </Button>
      </div>
    </>
  );
};
