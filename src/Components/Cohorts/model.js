import { createStore, createEvent } from 'effector';

export const addCohort = createEvent();
export const deleteCohort = createEvent();
export const patchCohort = createEvent();
export const $cohorts = createStore([
  {
    id: 1001,
    faculty: 'Историко-филологический',
    cohort_number: 101,
  },
  {
    id: 1002,
    faculty: 'Физико-математический',
    cohort_number: 102,
  },
])
  .on(addCohort, (oldData, data) => [...oldData, data])
  .on(deleteCohort, (oldData, data) => [
    ...oldData.filter((item) => item.id !== data),
  ])
  .on(patchCohort, (oldData, data) => [
    ...oldData.map((item) => (item.id === data.id ? data : item)),
  ]);

export const setCohortData = createEvent();
export const resetCohortData = createEvent();
export const $cohortData = createStore({
  id: Math.round(Math.random() * 100000),
  faculty: '',
  cohort_number: '',
})
  .on(setCohortData, (_, data) => data)
  .reset(resetCohortData);

// $cohortData.watch(data => console.log(data))

export const setCohortsNumbers = createEvent();
export const $cohortsNumbers = createStore([101, 201, 301, 401, 501])
  .on(setCohortsNumbers, (oldData, num) => [...oldData, num]);
