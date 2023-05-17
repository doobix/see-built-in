import Job from './Job';
import JobSkeleton from './JobSkeleton';
import { useEffect, useState } from 'react';
import { useQuery } from './hooks/use-query';
import { useData } from './hooks/use-data';
import { convertCategoryTitle } from './utils/convert-category-title';
import './App.css';

function App() {
  const [category, setCategory] = useState('frontend');
  const query = useQuery();
  const [builtinData, isLoading] = useData(category);

  // Get category from query param
  useEffect(() => {
    if (query.get('cat') === 'hr') {
      setCategory('hr');
    } else {
      setCategory('frontend');
    }
  }, [query]);

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
