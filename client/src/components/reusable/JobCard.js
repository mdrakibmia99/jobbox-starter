import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useUpdateStatusMutation } from "../../features/job/jobApi";

const JobCard = ({ jobData }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    _id,
    position,
    companyName,
    location,
    employmentType,
    applicants,
    status,
  } = jobData || {};
  const {
    user: { role },
  } = useSelector((state) => state.auth);
  const [updateStatus] = useUpdateStatusMutation();

  return (
    <div
      key={_id}
      className="border border-gray-300 shadow-xl p-5 rounded-2xl text-primary"
    >
      <div className="flex justify-between  text-primary">
        <div>
          <p className="text-xl">{position}</p>
          <small className="text-primary/70 ">
            by{" "}
            <span className="font-semibold hover:text-primary cursor-pointer hover:underline transition-all">
              {companyName}
            </span>
          </small>
        </div>
        <p>{location}</p>
      </div>
      
    </div>
  );
};

export default JobCard;
