import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);



  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
     
    </div>
  );
};

export default Sidebar;
