import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import styles from "../../ResponseBlock.module.css";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ResponseForm } from "../ResponseForm";
import { setSystemMessage } from "../../../../../../redux/reducers/systemMessages";
import { vacancyAPI } from "../../../../../../api/vacancyAPI";
import { getAuthUser } from "../../../../../../redux/reducers/authentification";

export const SponsorForm = ({
  responseId,
  responseStatus,
  setSponsorResponse,
  setResponseStatus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const sposnorInfo = useSelector(getAuthUser);

  const dispatch = useDispatch();
  const { vacancyId } = useParams();

  const fieldNames = {
    label: "Response to talent",
    placeholder:
      responseStatus === "DENIED"
        ? "Tell why this talent is not appropriate for this job"
        : "You can write date/time of interview",
  };

  const handleSubmit = async (responseInfo) => {
    try {
      const requestData = {
        feedback: { ...responseInfo, status: responseStatus },
      };
      setIsFetching(true);
      const { status } = await vacancyAPI.sponsorResponse(
        vacancyId,
        responseId,
        requestData,
      );
      if (status === 200) {
        setSponsorResponse({
          message: responseInfo.message,
          contact_info: responseInfo.contactInfo,
          author: { ...sposnorInfo, avatar: localStorage.getItem("avatar") },
        });
      }
      dispatch(setSystemMessage(true, "Your response was sent successfully!"));
    } catch (error) {
      dispatch(setSystemMessage(true, error.message, "error"));
    }
    setIsFetching(false);
  };

  return (
    <>
      {!isOpen && (
        <div className={styles.sponsorsControlls}>
          <Tooltip
            title="Approve response"
            onClick={() => {
              setResponseStatus("APPROVED");
              setIsOpen(true);
            }}
          >
            <IconButton>
              <DoneAllIcon color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Deny response"
            onClick={() => {
              setResponseStatus("DENIED");
              setIsOpen(true);
            }}
          >
            <IconButton>
              <ClearIcon color="error" />
            </IconButton>
          </Tooltip>
        </div>
      )}

      {isOpen && responseStatus && (
        <div className={styles.sponsorForm}>
          <ResponseForm
            {...{
              fieldNames,
              setIsOpen,
              isFetching,
              handleSubmit,
              action: "REPLY",
              withContacts: responseStatus === "APPROVED",
            }}
          />
        </div>
      )}
    </>
  );
};
