import React from "react";
import styles from "./ResponseBlock.module.css";
import { useSelector } from "react-redux";
import { getRole } from "../../../../redux/reducers/authentification";
import { Submission } from "./components/Submission/Submission";

export const ResponseBlock = ({
  canRespond,
  talentSubmission,
  sponsorSubmissions,
  vacancyAuthor,
}) => {
  const userRole = useSelector(getRole);

  const talentBlock = (
    <div className={styles.responseContainer}>
      <Submission
        isTalent={true}
        {...{ talentSubmission, canRespond, vacancyAuthor }}
      />
    </div>
  );

  const sponsorBlock = Boolean(sponsorSubmissions?.length) && (
    <>
      <hr />
      <h3>Responses to this vacancy:</h3>
      {sponsorSubmissions?.map((response, index) => (
        <div className={styles.responseContainer} key={index}>
          <Submission
            isTalent={false}
            talentSubmission={response}
            vacancyAuthor={vacancyAuthor}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className={styles[`${userRole}Block`]}>
      {userRole === "talent" ? talentBlock : sponsorBlock}
    </div>
  );
};
