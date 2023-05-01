import Job from './Job';
import './App.css';
import { useEffect, useState } from 'react';
import { useQuery } from './hooks/use-query';

const urls = {
  frontend: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=149&subcategories=&experiences=1%2C1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=2&per_page=100&page=1&search=frontend&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true",
  // hr: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=150&subcategories=&experiences=1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=&per_page=100&page=1&search=&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&elite=true&national=true",
  hr: "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=150&subcategories=&experiences=1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=&per_page=100&page=1&search=&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true",
}

function App() {
  const [builtinData, setBuiltinData] = useState({});
  const [category, setCategory] = useState('frontend');
  const query = useQuery();

  useEffect(() => {
    if (query.get('cat') === 'hr') {
      setCategory('hr');
    } else {
      setCategory('frontend');
    }
  }, [query]);

  useEffect(() => {
    getData();
  }, [category]);

  async function getData() {
    const url = urls[category];
    const data = await fetch(url).then((res) => res.json()).then(data => data);
    setBuiltinData(data);
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
    <div className="App">
      <div>({jobs.length} jobs)</div>
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
