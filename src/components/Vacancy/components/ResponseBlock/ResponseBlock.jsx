import React, { useState } from "react";
import styles from "./ResponseBlock.module.css";
import { useSelector } from "react-redux";
import { getRole } from "../../../../redux/reducers/authentification";
import { Submission } from "./components/Submission/Submission";

export const ResponseBlock = ({
  canRespond,
  talentSubmission,
  sponsorSubmissions,
}) => {
  const userRole = useSelector(getRole);

  const talentBlock = (
    <Submission isTalent={true} {...{ talentSubmission, canRespond }} />
  );

  const sponsorBlock = Boolean(sponsorSubmissions?.length) && (
    <>
      <hr />
      <h3>Responses to this vacancy:</h3>
      {sponsorSubmissions?.map((response, index) => (
        <div className={styles.sponsorContainer} key={index}>
          <Submission isTalent={false} talentSubmission={response} />
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
