import {useState} from 'react';
import { useStore } from 'effector-react';

import { Button, TextField } from '@material-ui/core';
import { PopupContentStyle } from './PopupContentStyle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import { addStudent } from '../Students/model';
import { $studentData, setStudentData, resetStudentData } from './model';

const cohortsData = [111, 212, 313, 412, 112, 511];

export const AddingForm = ({ close, setOpen }) => {
  const classes = PopupContentStyle();
  const studentData = useStore($studentData);

  const handleFormChange = ({ target }) => {
    switch (target.id) {
      case 'Фамилия':
        setStudentData({ ...studentData, last_name: target.value });
        break;
      case 'Имя':
        setStudentData({ ...studentData, first_name: target.value });
        break;
      case 'Отчество':
        setStudentData({ ...studentData, mid_name: target.value });
        break;
      case 'Дата рождения':
        setStudentData({ ...studentData, date_of_birth: target.value });
        break;
      default:
        return;
    }
  };

  const handleSelectChange = ({ target }) => {
    setStudentData({ ...studentData, cohort: +target.value });
  };

  const handleDataSend = () => {
    addStudent(studentData);
    setOpen(false);
    resetStudentData();
  };

  return (
    <form className={classes.root} noValidate autoComplete='off'>
      {
        [
          {last_name: 'Фамилия'},
          {first_name: 'Имя'},
          {mid_name: 'Отчество'},
          {date_of_birth: 'Дата рождения'}]
          .map((label, i) => (
          <TextField
            key={i}
            required
            value={studentData[Object.keys(label)]}
            className={classes.field}
            id={Object.values(label)}
            label={Object.values(label)}
            onChange={handleFormChange}
            // error={label.error}
            // onBlur={(e) => handleBlur(e, label.error)}
          />
        ))
      }
      <FormControl required className={classes.formControl}>
        <InputLabel>Номер группы</InputLabel>
        <Select value={studentData.cohort} onChange={handleSelectChange}>
          {cohortsData.map((cohort) => (
            <MenuItem value={cohort} key={cohort}>
              {cohort}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className={classes.buttonsGroup}>
        <Button
          // disabled={}
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleDataSend}>
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
