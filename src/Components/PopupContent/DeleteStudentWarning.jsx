import Button from '@material-ui/core/Button';
import { PopupContentStyle } from './PopupContentStyle';

export const DeleteStudentWarning = ({ close, accept }) => {
  const classes = PopupContentStyle();
  return (
    <>
      <p>Данные студента будут удалены. Продолжить?</p>
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
