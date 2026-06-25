import {JobCard} from './JobCards.jsx';
import { Spinner } from './Spinner.jsx';
export function JobListing({joblist}){
    return (
       <div className="results-card">
                 {joblist.map((job) => (
                   <JobCard jobs={job} key={job.id} />
                 )
                 )}
      </div>
    )
}