import { useEffect, useState } from 'react';

const urls = {
  frontend: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=149&subcategories=&experiences=1%2C1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=2&per_page=100&page=1&search=frontend&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true",
  hr: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=150&subcategories=&experiences=1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=&per_page=100&page=1&search=&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true",
}

export function useData(category) {
  const [builtinData, setBuiltinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

    // Fetch Built In data
    useEffect(() => {
      let shouldGetData = true;
  
      const getData = async () => {
        const url = urls[category];
        const response = await fetch(url);
        const data = await response.json();
        setIsLoading(true);

        if (shouldGetData) {
          setBuiltinData(data);
          setIsLoading(false);
        }
      }
  
      getData();
  
      return () => shouldGetData = false;
    }, [category]);

    return [builtinData, isLoading];
}
