import { createStore, createEvent } from 'effector';

export const addStudent = createEvent();
export const deleteStudent = createEvent();
export const $students = createStore([
  {
    last_name: 'Иванов',
    first_name: 'Иван',
    mid_name: 'Иванович',
    date_of_birth: '01.02.2005',
    cohort: 111,
  },
  {
    last_name: 'Петров',
    first_name: 'Петр',
    mid_name: 'Петрович',
    date_of_birth: '02.03.2004',
    cohort: 212,
  },
])
  .on(addStudent, (oldData, data) => [...oldData, data])
  .on(deleteStudent, (oldData, data) => [
    ...oldData.filter((item) => item.last_name !== data),
  ]);