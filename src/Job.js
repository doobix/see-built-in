import "./Job.css";

import { roundSalary } from "./utils/round-salary";

function Job({ companyName, title, date, url, logo, salaryMin, salaryMax }) {
  const imgUrl =
    "https://builtin.com/cdn-cgi/image/fit=scale-down,sharpen=0.3,f=auto,q=100,w=64,h=64/sites/www.builtin.com/files/";

  return (
    <div className="Job">
      <div className="logo">
        <a href={url} target="_blank" rel="noreferrer">
          <img src={imgUrl + logo} alt={companyName} />
        </a>
      </div>
      <div className="data">
        <div>
          <b>{companyName}</b>
        </div>
        <div className="date">{date}</div>
        {salaryMin || salaryMax ? (
          <div className="salary">
            Salary: ${roundSalary(salaryMin)}K - ${roundSalary(salaryMax)}K
          </div>
        ) : null}
        <div>
          <a href={url} target="_blank" rel="noreferrer">
            {title}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Job;
