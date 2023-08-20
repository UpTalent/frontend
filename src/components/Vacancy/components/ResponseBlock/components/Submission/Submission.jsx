import React, { useState } from "react";
import { ResponseFull } from "../ResponseFull";
import { SponsorForm } from "../../ResponseForm/SponsorForm";
import { TalentForm } from "../../ResponseForm/TalentForm";
import styles from "../../ResponseBlock.module.css";

export const Submission = ({ talentSubmission, isTalent, canRespond, vacancyAuthor}) => {
  const [talentResponse, setTalentReponse] = useState(talentSubmission);
  const [sponsorResponse, setSponsorResponse] = useState(
    talentSubmission?.feedback_info,
  );
  const [status, setStatus] = useState(talentSubmission?.status);

  return (
    <>
      {!talentResponse && isTalent ? (
        <TalentForm {...{ canRespond, setTalentReponse }} />
      ) : (
        <ResponseFull
          {...{ ...talentResponse, status, isTalent }}
          additionalStyle={styles.talentResponse}
        />
      )}
      {status !== "SENT" && sponsorResponse ? (
        <ResponseFull
          {...{...sponsorResponse, status: null, isTalent}}
          author={vacancyAuthor}
          additionalStyle={styles.SponsorFeedback}
        />
      ) : (
        !isTalent && (
          <SponsorForm
            responseId={talentResponse.id}
            responseStatus={status}
            setResponseStatus={setStatus}
            setSponsorResponse={setSponsorResponse}
          />
        )
      )}
    </>
  );
};
