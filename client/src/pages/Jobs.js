import React from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../features/job/jobApi";
import Loading from "../components/reusable/Loading";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { data, isLoading } = useGetJobsQuery();
  const jobs = data?.data || {};
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  
  if (isLoading) {
    return <Loading />;
  }

  const openJobs = jobs?.filter((job) => job?.status === "open");
  const closeJobs = jobs?.filter((job) => job?.status === "close");

  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">
          Find Jobs{" "}
          {role === "employer" && (
            <>
              - Open Jobs: <span>{openJobs?.length}</span> & Close Jobs:{" "}
              <span>{closeJobs?.length}</span>
            </>
          )}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-5">
        {jobs?.map((job) => (
          <JobCard key={job?._id} jobData={job} />
        ))}
      </div>
    </div>
  );
};

export default Jobs;
