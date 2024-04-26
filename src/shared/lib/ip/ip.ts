export const getIp = async () => {
  // instead user
  const response = await fetch('https://ipinfo.io/?callback=callback');
  const data = await response.text();

  const ipRegex = /"ip":"(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"/;
  const match = ipRegex.exec(data);

  return match ? match[1] : '127.0.0.1';
};
