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

  
};

export default JobCard;
