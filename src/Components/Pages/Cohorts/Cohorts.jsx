import { Styles } from '../Styles';

import { useState } from 'react';
import { useStore } from 'effector-react';

import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Divider, Table } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  $cohorts,
  addCohort,
  deleteCohort,
  $cohortData,
  setCohortData,
  resetCohortData,
  patchCohort,
  $cohortsNumbers,
} from './model';

import { Popup } from '../..';
import { DeleteDataWarning, AddingForm } from '../..';
import { cohortsFormData } from '../../../constants/constants';

export const Cohorts = () => {
  const classes = Styles();
  
  const cohorts = useStore($cohorts);
  const cohortData = useStore($cohortData);
  const cohortsNumbers = useStore($cohortsNumbers);

  const [cohortId, setCohortId] = useState(null);
  const [button, setButton] = useState(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (btn) => {
    setOpen(true);
    setButton(btn)
  };

  const handleClose = () => {
    setOpen(false);
    resetCohortData();
  };

  const handleDeleteData = () => {
    deleteCohort(cohortId);
    setOpen(false);
  }

  const handleFormChange = ({ target }) => {
    switch (target.id) {
      case 'Факультет':
        setCohortData({ ...cohortData, faculty: target.value });
        break;
      case 'Номер группы':
        setCohortData({ ...cohortData, cohort_number: target.value });
        break;
      default:
        return;
    }
  };

  const handleDataSend = () => {
    setCohortData({ ...cohortData, id: Math.round(Math.random()*100000)})
    addCohort(cohortData);
    setOpen(false);
    resetCohortData();
  };

  const handleDataPatch = () => {
    patchCohort(cohortData);
    setOpen(false);
    resetCohortData();
  };

  const handleSelectChange = ({ target }) => {
    setCohortData({ ...cohortData, cohort_number: +target.value });
  };

  return (
    <div className={classes.root}>
      <div className={classes.control}>
        <div className={classes.controlGroup}></div>
        <Button
          className={classes.addButton}
          variant='outlined'
          color='primary'
          onClick={() => {
            handleOpen('add');
          }}>
          Добавить
        </Button>
      </div>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {cohortsFormData.map((header) => (
                <TableCell align='center' key={Object.keys(header)}>
                  {Object.values(header)}
                </TableCell>
              ))}
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cohorts.map((cohort) => (
              <TableRow className={classes.tableRow} key={cohort.id}>
                <TableCell align='center'>{cohort.cohort_number}</TableCell>
                <TableCell align='center'>{cohort.faculty}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => {
                      handleOpen('edit');
                      setCohortData(cohort);
                      setOpen(true);
                    }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => {
                      handleOpen('delete');
                      setCohortId(cohort.id);
                    }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popup open={open} close={handleClose}>
        {button === 'delete' && (
          <DeleteDataWarning
            close={handleClose}
            accept={handleDeleteData}
            text='Данные группы будут удалены. Продолжить?'
          />
        )}
        {(button === 'add' || button === 'edit') && (
          <AddingForm
            close={handleClose}
            formData={[{faculty: 'Факультет'}]}
            handleChange={handleFormChange}
            data={cohortData}
            setData={setCohortData}
            handlePushData={button === 'add' ? handleDataSend : handleDataPatch}
          >
            <FormControl required className={classes.formControl}>
              <InputLabel>Номер группы</InputLabel>
              <Select value={cohortData.cohort_number} onChange={handleSelectChange}>
                {cohortsNumbers.map((cohort) => (
                  <MenuItem value={cohort} key={cohort}>
                    {cohort}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </AddingForm>
        )}
      </Popup>
    </div>
  );
};
