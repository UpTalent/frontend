import React, { useState } from "react";
import { ResponseFull } from "../ResponseFull";
import { SponsorForm } from "../../ResponseForm/SponsorForm";
import { TalentForm } from "../../ResponseForm/TalentForm";
import styles from "../../ResponseBlock.module.css";

export const Submission = ({ talentSubmission, isTalent, canRespond }) => {
  const [talentResponse, setTalentReponse] = useState(talentSubmission);
  const [sponsorResponse, setSponsorResponse] = useState(null);
  const [status, setStatus] = useState(talentSubmission?.status);
  return (
    <>
      {!talentResponse && isTalent ? (
        <TalentForm {...{ canRespond, setTalentReponse }} />
      ) : (
        <ResponseFull {...{ ...talentResponse, status }} additionalStyle={styles.talentResponse}
        />
      )}
      {status !== "SENT" && sponsorResponse ? (
        <ResponseFull
          {...sponsorResponse}
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
