import { useEffect, useState } from 'react';

export default function useClient() {
  const [client, setClient] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setClient(true);
    }
  }, []);
  return client;
}
