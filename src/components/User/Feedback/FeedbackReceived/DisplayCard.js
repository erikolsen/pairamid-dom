import React, { useState } from "react";
import FeedbackCardEdit from "./FeedbackCardEdit";
import FeedbackCard from "./FeedbackCard";

const DisplayCard = ({
  feedback,
  groups,
  updateFeedback,
  deleteFeedback,
  duplicateFeedback,
}) => {
  const [editing, setEditing] = useState({ inProgress: false, updated: false });

  if (editing.inProgress || feedback.updated) {
    return (
      <FeedbackCardEdit
        updateFeedback={updateFeedback}
        feedback={feedback}
        groups={groups}
        setEditing={setEditing}
        deleteFeedback={deleteFeedback}
        duplicateFeedback={duplicateFeedback}
      />
    );
  } else {
    return (
      <FeedbackCard
        feedback={feedback}
        groups={groups}
        updated={editing.updated}
        setEditing={setEditing}
      />
    );
  }
};

export default DisplayCard;
