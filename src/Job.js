import './Job.css';

function Job({companyName, title, date, url, logo}) {
  const imgUrl = 'https://builtin.com/cdn-cgi/image/fit=scale-down,sharpen=0.3,f=auto,q=100,w=64,h=64/sites/www.builtin.com/files/';

  return (
    <div className="Job">
      <div className="logo">
        <a href={url} target="_blank"><img src={imgUrl + logo} alt={companyName} /></a>
      </div>
      <div className="data">
        <div>
          <b>{companyName}</b>
        </div>
        <div>
          {date}
        </div>
        <div>
          <a href={url} target="_blank">{title}</a>
        </div>
      </div>
    </div>
  );
}

export default Job;
