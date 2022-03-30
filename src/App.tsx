import { ChangeEvent, useState } from 'react';
import { useObservable } from './hooks/use-observable';
import {
  searchSubject,
  searchResultObservable,
} from './observables/search-subject';

import './styles.css';

export default function App() {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [searchString, setSearchString] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setSearchString(value);
    searchSubject.next(value);
  };

  useObservable<string[]>(searchResultObservable, setSearchResults);

  return (
    <div className="App">
      <h1>React/RxJS пример</h1>
      <h2>Поиск репозиториев по имени пользователя</h2>
      <input
        placeholder="Введите имя пользователя"
        type="text"
        value={searchString}
        onChange={handleSearchChange}
      />
      {searchResults.map((result) => (
        <div key={result}>{result}</div>
      ))}
    </div>
  );
}
