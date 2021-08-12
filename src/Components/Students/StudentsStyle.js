import { makeStyles } from '@material-ui/core/styles';

export const StudentStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 750,
  },
  control: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  controlGroup: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gap: '10px',
    alignItems: 'center',
  },
  controlLabel: {
    fontSize: '14px',
    alignSelf: 'center',
  },
  addButton: {
    fontSize: '14px',
  },
  selectEmpty: {
    fontSize: '14px',
    padding: '2px',
  },
  selectMenu: {
    fontSize: '14px',
  },
  tableRow: {
    // transition: '.3s',
    // '&:hover': {
    //   opacity: '.4',
    // },
  },
}));