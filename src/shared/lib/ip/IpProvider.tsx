import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIp } from './ip';

type IpContextValue = string;

const IpContext = createContext<IpContextValue>('');

export const IpProvider = ({ children }: { children: ReactNode }) => {
  const [ip, setIp] = useState('');

  const { isLoading, data } = useQuery({
    queryKey: ['ip'],
    queryFn: async () => await getIp(),
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (!isLoading && data) setIp(data);
  }, [isLoading, data]);

  return <IpContext.Provider value={ip}>{children}</IpContext.Provider>;
};

export const useIp = () => useContext(IpContext);
