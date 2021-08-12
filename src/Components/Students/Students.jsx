import { useState } from 'react';
import { useStore } from 'effector-react';

import { StudentStyles } from './StudentsStyle';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import { Divider, Table } from '@material-ui/core';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { headers } from '../../data/data';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';

import { $students, deleteStudent } from './model';
import { Popup } from '../';
import { DeleteStudentWarning, AddingForm } from '../';
import { resetStudentData } from '../PopupContent/model';

export const Students = () => {
  const classes = StudentStyles();
  
  const students = useStore($students);
  const [filter, setFilter] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [button, setButton] = useState(null);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const [open, setOpen] = useState(false);

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

  return (
    <div className={classes.root}>
      <div className={classes.control}>
        <div className={classes.controlGroup}>
          <FormLabel className={classes.controlLabel}>Сортировать</FormLabel>
          <FormControl className={classes.formControl}>
            <Select
              value={filter}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}>
              <MenuItem className={classes.selectMenu} value={''}>
                Фамилия
              </MenuItem>
              <MenuItem className={classes.selectMenu} value={20}>
                Группа
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
              {headers.map((header) => (
                <TableCell
                  align={
                    header.id === 'cohort' || header.id === 'date_of_birth'
                      ? 'center'
                      : 'left'
                  }
                  key={header.id}>
                  {header.label}
                </TableCell>
              ))}
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow className={classes.tableRow} key={student.last_name}>
                <TableCell align='left'>{student.last_name}</TableCell>
                <TableCell align='left'>{student.first_name}</TableCell>
                <TableCell align='left'>{student.mid_name}</TableCell>
                <TableCell align='center'>{student.date_of_birth}</TableCell>
                <TableCell align='center'>{student.cohort}</TableCell>
                <TableCell align='center'>
                  <IconButton aria-label='edit'>
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
          <DeleteStudentWarning close={handleClose} accept={handleDeleteData} />
        )}

        {button === 'add' && (
          <AddingForm close={handleClose} setOpen={setOpen} />
        )}
      </Popup>
    </div>
  );
};
