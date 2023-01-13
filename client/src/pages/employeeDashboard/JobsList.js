import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/reusable/Loading";
import {
  useGetJobsQuery,
  useUpdateStatusMutation,
} from "../../features/job/jobApi";

const JobsList = () => {
  const { data, isLoading } = useGetJobsQuery();
  const jobs = data?.data || {};
  const [updateStatus, { isLoading: isUpdating, isSuccess }] =
    useUpdateStatusMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdating) {
      toast.loading("Status updating...", { id: "updateStatus" });
    }
    if (isUpdating) {
      toast.success("Status updated", { id: "updateStatus" });
    }
  }, [isUpdating, isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div class="flex flex-col justify-center items-center h-full w-full ">
      {isLoading ? (
        "Loading..."
      ) : (
        <div class="w-full max-w-7xl mx-auto rounded-lg  bg-white shadow-lg border border-gray-200">
          <header class="px-5 py-4 border-b border-gray-100">
            <div class="font-semibold text-gray-800">Jobs: {jobs?.length}</div>
          </header>

          <div class="overflow-x-auto p-3">
            <table class="table-auto w-full">
              <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 text-left">
                    <input type="checkbox" class="w-5 h-5" value="id-1" />
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Company Name</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Position</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Employment Type</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Applicants</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-left">Status</div>
                  </th>
                  <th class="p-2">
                    <div class="font-semibold text-center">Action</div>
                  </th>
                </tr>
              </thead>

              <tbody class="text-sm divide-y divide-gray-100">
                {jobs?.map(
                  ({
                    companyName,
                    position,
                    employmentType,
                    applicants,
                    status,
                    _id,
                  }) => (
                    <tr key={_id} className="hover:bg-slate-50 transition-all">
                      <td class="p-2">
                        <input type="checkbox" class="w-5 h-5" value="id-1" />
                      </td>
                      <td class="p-2">
                        <div class="font-medium text-gray-800">
                          {companyName}
                        </div>
                      </td>
                      <td class="p-2">
                        <div class="text-left capitalize">{position}</div>
                      </td>
                      <td class="p-2">
                        <div class="text-left font-medium text-indigo-500">
                          {employmentType}
                        </div>
                      </td>
                      <td class="p-2">
                        <div class="text-left flex items-center gap-x-4">
                          <span className="font-medium">
                            {applicants?.length}
                          </span>
                          <hr className="border" />
                          {applicants?.length ? (
                            <button
                              onClick={() =>
                                navigate(`/dashboard/candidate/${_id}`)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                class="w-8 h-8 hover:text-indigo-600 rounded-full hover:bg-gray-100 p-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                class="w-8 h-8 hover:text-indigo-600 rounded-full hover:bg-gray-100 p-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                      <td class="p-2">
                        <div class="text-left font-medium text-indigo-500">
                          {status}
                        </div>
                      </td>
                      <td class="p-2">
                        <div class="flex justify-center gap-4">
                          <button
                            onClick={() => navigate(`/job-details/${_id}`)}
                            title="detail about this position"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              class="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z"
                              />
                            </svg>
                          </button>
                          {status === "open" ? (
                            <button
                              onClick={() =>
                                updateStatus({ _id: _id, status: "close" })
                              }
                              title="make this position status close"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                class="w-8 h-8 hover:text-red-600 rounded-full hover:bg-gray-100 p-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                updateStatus({ _id: _id, status: "open" })
                              }
                              title="make this position status open"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                class="w-8 h-8 hover:text-green-600 rounded-full hover:bg-gray-100 p-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M4.5 12.75l6 6 9-13.5"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsList;
