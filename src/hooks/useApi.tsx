import {
  useState,
  useEffect,
} from 'react';
import { getDocuments } from '../api/api';

export function useApi() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState([]);


  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const result = await getDocuments();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
        console.info('The api request has finished!');
      }
    };
    fetchData();
  }, []);

  return {
    isLoading,
    data,
  };
}