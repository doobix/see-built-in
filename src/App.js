import Job from './Job';
import './App.css';
import { useState } from 'react';

function App() {
  const [builtinData, setBuiltinData] = useState({});
  const url = "https://api.builtin.com/services/job-retrieval/legacy-jobs?categories=149&subcategories=&experiences=1%2C1-3%2C3-5%2C3%2C5&industry=&company_sizes=&regions=&locations=&working_option=2&per_page=500&page=1&search=frontend&sortStrategy=recency&job_locations=&company_locations=&jobs_board=true&national=true";
  async function getData() {
    const data = await fetch(url).then((res) => res.json()).then(data => data);
    setBuiltinData(data);
  }
  getData();

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
      <h1>Built In Jobs (Frontend)</h1>
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
