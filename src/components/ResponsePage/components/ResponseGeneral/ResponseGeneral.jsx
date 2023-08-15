import React from "react";
import styles from "../../../Vacancy/components/ResponseBlock/ResponseBlock.module.css";
import { Author } from "../../../shared/Proof/components/Author";
import { useNavigate } from "react-router-dom";
import { Status } from "../../../shared/Proof/components/ProofTitle/components/Status/Status";
import { useHistory } from "../../../../service/hooks/useHistory";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmationMessage } from "../../../shared/Proof/components/ConfirmationMessage";
import { useState } from "react";
import { vacancyAPI } from "../../../../api/vacancyAPI";
import { useDispatch } from "react-redux";
import { setSystemMessage } from "../../../../redux/reducers/systemMessages";
import { deleteResponseItem } from "../../../../redux/reducers/dataList";

export const ResponseGeneral = ({
  vacancy_submission,
  submission_response,
  withControll,
}) => {
  const navigate = useNavigate();
  const currentPath = useHistory();
  const dispatch = useDispatch();
  const [openConfirm, setOpenConfirm] = useState(false);

  const deleteResponse = async () => {
    try {
      await vacancyAPI.deleteSubmission(
        vacancy_submission.id,
        submission_response.id,
      );
      dispatch(deleteResponseItem(vacancy_submission.id));
      setOpenConfirm(false);
    } catch (error) {
      dispatch(setSystemMessage(true, error.message, "error"));
    }
  };

  return (
    <div className={`${styles.reponseContainer} ${styles.responseGeneral}`}>
      <div className={styles.authorBlock}>
        <Author
          {...vacancy_submission.author}
          timestamp={submission_response.sent}
        />
        {withControll && submission_response.status === "SENT" && (
          <Tooltip
            title="Delete response"
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            <IconButton>
              <DeleteIcon color="action" />
            </IconButton>
          </Tooltip>
        )}
      </div>
      <div
        className={styles.vacancyTitle}
        onClick={() =>
          navigate(`/vacancy/${vacancy_submission.id}`, {
            state: [currentPath],
          })
        }
      >
        <p>{vacancy_submission.title}</p>
        <Status status={submission_response.status} />
      </div>
      <ConfirmationMessage
        action={"DELETE"}
        buttonHandler={deleteResponse}
        confirmMessage={openConfirm}
        handleConfim={setOpenConfirm}
      />
    </div>
  );
};
