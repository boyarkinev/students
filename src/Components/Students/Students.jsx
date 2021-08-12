import { useState } from 'react';
import { useStore } from 'effector-react';

import { StudentStyles } from './StudentsStyle';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import {
  $students,
  addStudent,
  deleteStudent,
  $studentData,
  resetStudentData,
  setStudentData,
  patchStudent,
} from './model';
import { setCohortsNumbers } from '../Cohorts/model';

import { Popup } from '../';
import { DeleteDataWarning, AddingForm } from '../';
import { studentsFormData } from '../../constants/constants';

export const Students = () => {
  const classes = StudentStyles();
  
  const students = useStore($students);
  const studentData = useStore($studentData);

  const [filter, setFilter] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [button, setButton] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = ({ target }) => {
    setFilter(target.value);
    target.value === 'Группа' &&
      students.sort((prev, next) => prev.cohort_number - next.cohort_number);
    target.value === 'Фамилия' &&
      students.sort((prev, next) => {
        if (prev.last_name > next.last_name) return 1;
        if (prev.last_name < next.last_name) return -1;
        return 0;
      });
  };

  const handleOpen = (btn) => {
    setOpen(true);
    setButton(btn)
  };

  const handleClose = () => {
    setOpen(false);
    resetStudentData();
  };

  const handleDeleteData = () => {
    deleteStudent(studentId);
    setOpen(false);
  }

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
      case 'Группа №':
        setStudentData({ ...studentData, cohort_number: target.value });
        break;
      default:
        return;
    }
  };

  const handleDataSend = () => {
    setStudentData({ ...studentData, id: Math.round(Math.random()*100000)})
    addStudent(studentData);
    setCohortsNumbers(studentData.cohort_number)
    setOpen(false);
    resetStudentData();
  };

  const handleDataPatch = () => {
    patchStudent(studentData);
    setOpen(false);
    resetStudentData();
  };

  return (
    <div className={classes.root}>
      <div className={classes.control}>
        <div className={classes.controlGroup}>
          <FormControl className={classes.formControl}>
            <Select
              value={filter}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}>
              <MenuItem className={classes.selectMenu} value={''}>
                Сортировать
              </MenuItem>
              <MenuItem className={classes.selectMenu} value={'Фамилия'}>
                По фамилии
              </MenuItem>
              <MenuItem className={classes.selectMenu} value={'Группа'}>
                По группе
              </MenuItem>
            </Select>
          </FormControl>
        </div>
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
              {studentsFormData.map((header) => (
                <TableCell
                  align={
                    Object.keys(header).toString() === 'cohort_number' ||
                    Object.keys(header).toString() === 'date_of_birth'
                      ? 'center'
                      : 'left'
                  }
                  key={Object.keys(header)}>
                  {Object.values(header)}
                </TableCell>
              ))}
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student, i) => (
              <TableRow className={classes.tableRow} key={i}>
                <TableCell align='left'>{student.last_name}</TableCell>
                <TableCell align='left'>{student.first_name}</TableCell>
                <TableCell align='left'>{student.mid_name}</TableCell>
                <TableCell align='center'>{student.date_of_birth}</TableCell>
                <TableCell align='center'>{student.cohort_number}</TableCell>
                <TableCell align='center'>
                  <IconButton
                    aria-label='edit'
                    onClick={() => {
                      handleOpen('edit');
                      setStudentData(student);
                      setOpen(true);
                    }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label='delete'
                    onClick={() => {
                      handleOpen('delete');
                      setStudentId(student.last_name);
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
            text='Данные студента будут удалены. Продолжить?'
          />
        )}

        {(button === 'add' || button === 'edit') && (
          <AddingForm
            close={handleClose}
            formData={studentsFormData}
            handleChange={handleFormChange}
            data={studentData}
            setData={setStudentData}
            handlePushData={button === 'add' ? handleDataSend : handleDataPatch}
          />
        )}
      </Popup>
    </div>
  );
};
