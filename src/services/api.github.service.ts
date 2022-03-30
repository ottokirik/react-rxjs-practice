const path = 'https://api.github.com/users';

interface IResponse {
  full_name: string;
  name: string;
}

export const getUserRepos = async (name: string): Promise<IResponse[]> => {
  const response = await fetch(`${path}/${name}/repos`, { mode: 'cors' });

  console.log(response);

  if (!response.ok) {
    throw new Error('Ошибка запроса данных');
  }

  return response.json();
};
