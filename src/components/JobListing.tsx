import {JobCard} from './JobCards.js';
import { Spinner } from './Spinner.jsx';
import type { JobListingProps } from './types.ts'
export function JobListing({joblist}: JobListingProps){
    return (
       <div className="results-card">
                 {joblist.map((job) => (
                   <JobCard jobs={job} key={job.id} />
                 )
                 )}
      </div>
    )
}