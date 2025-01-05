import { QueryClient } from 'react-query';

// Create and export a global instance
const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  
export default queryClient;
