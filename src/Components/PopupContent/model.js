import { createStore, createEvent, createEffect, sample, combine } from 'effector';

export const setStudentData = createEvent();
export const resetStudentData = createEvent();
export const $studentData = createStore(
  {
    last_name: '',
    first_name: '',
    mid_name: '',
    date_of_birth: '',
    cohort: '',
  }
)
.on(setStudentData, (_, data) => data)
.reset(resetStudentData);

// $studentData.watch(data => console.log(data))