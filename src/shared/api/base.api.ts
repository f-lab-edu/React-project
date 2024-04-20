const stringify = (query?: Record<string, string | number>): string => {
  if (!query) return '';

  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    params.append(key, String(value));
  }

  return params.toString();
};

export const fetchGET = async (
  path: string,
  queryString?: Record<string, string | number>,
  headerOptions?: Record<string, string>,
) => {
  const header = {
    headers: {
      'Content-Type': 'application/json',
      ...headerOptions,
    },
  };

  const query = stringify(queryString);
  const url = process.env.API_URL;
  const requestUrl = `${url}/${path}${query ? `?${query}` : ''}`;

  const response = await fetch(requestUrl, header);

  if (!response.ok) {
    throw new Error('Error: response.ok');
  }

  return await response.json();
};
