import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  from,
  catchError,
  of,
  tap,
} from 'rxjs';

import { getUserRepos } from '../services/api.github.service';

export const searchSubject = new BehaviorSubject('');

export const searchResultObservable = searchSubject.pipe(
  map((value) => value.trim()),
  filter((value) => value.length > 3),
  debounceTime(500),
  distinctUntilChanged(),
  switchMap((value) => from(getUserRepos(value))),
  catchError((err) => of([])),
  tap((value) => console.log(value)),
  map((value) => value.map((item) => `${item.full_name}`))
);
