import Skeleton from '@mui/material/Skeleton';
import './Job.css';

function JobSkeleton() {
  return (
    <div className="Job">
      <div className="logo">
        <Skeleton variant="rectangular" width={64} height={64} />
      </div>
      <div className="data">
        <Skeleton width={250} height={18} />
        <Skeleton width={250} height={18} />
        <Skeleton width={250} height={18} />
      </div>
    </div>
  );
}

export default JobSkeleton;
