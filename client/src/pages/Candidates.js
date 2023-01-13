import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCandidateReplyMutation,
  useEmployerQueryMutation,
  useGetJobQuery,
} from "../features/job/jobApi";
import Loading from "../components/reusable/Loading";
import { useFetchAllUserQuery } from "../features/auth/authApi";
import { useSelector } from "react-redux";
import { BsArrowRightShort, BsArrowReturnRight } from "react-icons/bs";

const Candidates = () => {
  const { id } = useParams();
  const { data: jobData, isLoading: isJobFetching } = useGetJobQuery(id);
  const job = jobData?.data || {};
  const { data: usersData, isLoading: isAllUserFetching } =
    useFetchAllUserQuery(null, { pollingInterval: 500 });
  const users = usersData?.data || [];
  const { user } = useSelector((state) => state.auth);
  const [employerQuery] = useEmployerQueryMutation();
  const [candidateReply] = useCandidateReplyMutation();
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");

  if (isJobFetching || isAllUserFetching) {
    return <Loading />;
  }

  const applicantIds = [];
  job?.applicants?.map((applicant) => applicantIds?.push(applicant.id));

  const candidates = users?.filter((user) => applicantIds?.includes(user?._id));

  function handleQuestion(userId, userEmail) {
    employerQuery({
      userId: userId,
      jobId: id,
      email: userEmail,
      question: question,
    });
  }

  function handleReply(id) {
    candidateReply({ userId: id, reply: reply });
  }

  return (
    <div className="flex justify-center items-center overflow-auto p-10">
      {candidates?.map(
        ({
          _id,
          email,
          firstName,
          lastName,
          gender,
          country,
          address,
          city,
          postcode,
          term,
          role,
          queries,
        }) => (
          <div
            key={_id}
            className="bg-secondary/20 shadow-lg p-10 rounded-2xl flex flex-wrap gap-3 max-w-3xl justify-between"
          >
            <h1 className="w-full text-2xl text-primary mb-5">
              {firstName + " " + lastName}
            </h1>
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                value={firstName}
                disabled
                className="cursor-not-allowed"
                type="text"
                id="firstName"
              />
            </div>
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                value={lastName}
                disabled
                className="cursor-not-allowed"
                type="text"
                id="lastName"
              />
            </div>
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="cursor-not-allowed"
              />
            </div>
            <div className="flex flex-col w-full max-w-xs">
              <h1 className="mb-3">Gender</h1>
              <div className="flex gap-3">
                <div>
                  <input
                    type="radio"
                    id="male"
                    checked={gender === "male"}
                    disabled
                    className="cursor-not-allowed"
                    value="male"
                  />
                  <label className="ml-2 text-lg" for="male">
                    Male
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="female"
                    checked={gender === "female"}
                    disabled
                    className="cursor-not-allowed"
                    value="female"
                  />
                  <label className="ml-2 text-lg" for="female">
                    Female
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="other"
                    checked={gender === "other"}
                    disabled
                    className="cursor-not-allowed"
                    value="other"
                  />
                  <label className="ml-2 text-lg" for="other">
                    Other
                  </label>
                </div>
              </div>
            </div>
            <hr className="w-full mt-2 bg-black" />
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-3" for="country">
                Country
              </label>
              <input
                value={country}
                disabled
                className="cursor-not-allowed"
                type="text"
                id="country"
              />
            </div>
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-2" htmlFor="address">
                Street Address
              </label>
              <input
                value={address}
                disabled
                className="cursor-not-allowed"
                type="text"
                id="address"
              />
            </div>
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-2" htmlFor="city">
                City
              </label>
              <input
                value={city}
                disabled
                className="cursor-not-allowed"
                type="text"
                id="city"
              />
            </div>
            <div className="flex flex-col w-full max-w-xs">
              <label className="mb-2" htmlFor="postcode">
                Postal Code
              </label>
              <input
                value={postcode}
                disabled
                className="cursor-not-allowed"
                type="text"
                id="postcode"
              />
            </div>

            <div className="flex justify-between items-center w-full mt-3">
              <div className="flex  w-full max-w-xs">
                <input
                  checked={term}
                  disabled={term}
                  type="checkbox"
                  id="terms"
                  className="cursor-not-allowed mr-3"
                />
                <label for="terms">I agree to terms and conditions</label>
              </div>
              <div className="flex flex-col w-full max-w-xs">
                <label className="mb-2" htmlFor="role">
                  Role
                </label>
                <input
                  value={role}
                  disabled
                  className="cursor-not-allowed"
                  type="text"
                  id="role"
                />
              </div>
            </div>
            <div className="w-full">
              <div>
                <h1 className="text-xl font-semibold text-primary mb-5">
                  General Q&A
                </h1>
                <div className="text-primary my-2">
                  {queries?.map(({ question, email, reply, id }) => (
                    <div key={_id}>
                      <small>{email}</small>
                      <p className="text-lg font-medium">{question}</p>
                      {reply?.map((item) => (
                        <p className="flex items-center gap-2 relative left-5">
                          <BsArrowReturnRight /> {item}
                        </p>
                      ))}

                      {user?.role === "candidate" && (
                        <div className="flex gap-3 my-5">
                          <input
                            placeholder="Reply"
                            type="text"
                            className="w-full"
                            onChange={(event) => setReply(event.target.value)}
                          />
                          <button
                            className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                            type="button"
                            onClick={() => handleReply(_id)}
                          >
                            <BsArrowRightShort size={30} />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {user?.role === "employer" && (
                  <div className="flex gap-3 my-5">
                    <input
                      placeholder="Ask a question..."
                      type="text"
                      className="w-full"
                      onBlur={(event) => setQuestion(event.target.value)}
                    />
                    <button
                      className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                      type="submit"
                      onClick={() => handleQuestion(_id, email)}
                    >
                      <BsArrowRightShort size={30} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Candidates;
