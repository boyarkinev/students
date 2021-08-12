import { makeStyles } from '@material-ui/core/styles';

export const PopupContentStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  field: {
    marginBottom: '10px'
  },
  buttonsGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  button: {
    minWidth: '100px',
    fontSize: '12px',
    marginRight: '20px',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    },
    '&:last-of-type': {
      marginRight: '0',
    }
  }
}))