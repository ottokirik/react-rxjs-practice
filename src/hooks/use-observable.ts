import { Dispatch, SetStateAction, useEffect } from 'react';
import { Observable } from 'rxjs';

export const useObservable = <T>(
  observable: Observable<T>,
  setter: Dispatch<SetStateAction<T>>
) => {
  useEffect(() => {
    const subscription = observable.subscribe((result) => setter(result));

    return () => subscription.unsubscribe();
  }, [observable, setter]);
};
