import Job from './Job';
import JobSkeleton from './JobSkeleton';
import { useEffect, useState } from 'react';
import { useQuery } from './hooks/use-query';
import { convertCategoryTitle } from './utils/convert-category-title';
import './App.css';

const urls = {
  frontend: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=149&subcategories=&experiences=1%2C1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=2&per_page=100&page=1&search=frontend&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true",
  hr: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=150&subcategories=&experiences=1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=&per_page=100&page=1&search=&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true",
}

function App() {
  const [builtinData, setBuiltinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('frontend');
  const query = useQuery();

  // Get category from query param
  useEffect(() => {
    if (query.get('cat') === 'hr') {
      setCategory('hr');
    } else {
      setCategory('frontend');
    }
  }, [query]);

  // Fetch Built In data
  useEffect(() => {
    let shouldGetData = true;

    const getData = async () => {
      setIsLoading(true);
      const url = urls[category];
      const response = await fetch(url);
      const data = await response.json();

      if (shouldGetData) {
        setBuiltinData(data);
        setIsLoading(false);
      }
    }

    getData();

    return () => shouldGetData = false;
  }, [category]);

  if (isLoading) {
    return (
      <div>
        <div className="jobs">
          {Array.from({length: 10}, (_, index) => <JobSkeleton key={index} />)}
        </div>
      </div>
    );
  }

  // Change companies to a map
  const companies = builtinData.companies || [];
  const companyMap = {};
  companies.forEach((company) => {
    companyMap[company.id] = {
      title: company.title,
      logo: company.logo,
    };
  });

  // Sort jobs by date
  const jobs = (builtinData.jobs || []).sort((a, b) => {
    const aDate = new Date(a.sort_job);
    const bDate = new Date(b.sort_job);
    if (aDate > bDate) {
      return -1;
    } else if (aDate < bDate) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <div>({jobs.length} {convertCategoryTitle(category)} jobs)</div>
      <div className="jobs">
        {jobs.map((job, index) => (
          <Job
            key={index}
            companyName={companyMap[job.company_id].title}
            title={job.title}
            date={job.sort_job}
            url={job.how_to_apply}
            logo={companyMap[job.company_id].logo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
