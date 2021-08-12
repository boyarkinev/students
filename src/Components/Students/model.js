import { createStore, createEvent } from 'effector';

export const addStudent = createEvent();
export const deleteStudent = createEvent();
export const patchStudent = createEvent();
export const $students = createStore([
  {
    id: 1234,
    last_name: 'Иванов',
    first_name: 'Иван',
    mid_name: 'Иванович',
    date_of_birth: '01.02.2005',
    cohort_number: 103,
  },
  {
    id: 5678,
    last_name: 'Петров',
    first_name: 'Петр',
    mid_name: 'Петрович',
    date_of_birth: '02.03.2004',
    cohort_number: 102,
  },
])
  .on(addStudent, (oldData, data) => [...oldData, data])
  .on(deleteStudent, (oldData, data) => [
    ...oldData.filter((item) => item.last_name !== data),
  ])
  .on(patchStudent, (oldData, data) =>
    [...oldData.map((item) => item.id === data.id ? data : item)]
  );

// $students.watch(data => console.log(data))

export const setStudentData = createEvent();
export const resetStudentData = createEvent();
export const $studentData = createStore(
  {
    id: null,
    last_name: '',
    first_name: '',
    mid_name: '',
    date_of_birth: '',
    cohort_number: '',
  }
)
.on(setStudentData, (_, data) => data)
.reset(resetStudentData);

// $studentData.watch(data => console.log(data))