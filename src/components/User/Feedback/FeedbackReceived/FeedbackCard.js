import React from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuoteLeft,
  faQuoteRight,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import Faded from "../../../shared/Faded";

const FeedbackTagGiven = ({ tag }) => {
  const selectedStyle = "border border-gray-dark";
  const selectedText = "text-gray-dark";
  return (
    <li
      title={tag.description}
      className={`cursor-pointer py-1 px-5 mr-2 rounded-full flex items-center justify-center ${selectedStyle} my-1`}
    >
      <p className={`${selectedText} font-bold text-2xs`}>
        {tag.name.toUpperCase()}
      </p>
    </li>
  );
};

const FeedbackCard = ({ feedback, updated, setEditing, received }) => {
  const updatedNotification = updated ? (
    <Faded duration={10} isOut={true}>
      <p className="ml-4 text-green font-bold">Updated</p>
    </Faded>
  ) : (
    <div />
  );

  if (!feedback) return null;
  return (
    <div className="col-span-1 bg-white shadow-lg rounded-lg">
      <div className="h-full relative p-4">
        <div className="flex justify-between">
          {!received && <p className="mb-2 mr-4 text-sm">
            To: {feedback.recipient.fullName}
          </p>}
          {updatedNotification}
          <p className="mb-2 mr-4 text-sm">
            {format(new Date(feedback.createdAt), "MM/dd/yyyy")}
          </p>
        </div>
        <div className="mx-4">
          <FontAwesomeIcon icon={faQuoteLeft} size="xs" />
          <p className="text-sm mx-4">{feedback.message}</p>
          <span className="flex justify-end items-center">
            <FontAwesomeIcon icon={faQuoteRight} size="xs" />
            <FontAwesomeIcon className="mx-2" icon={faMinus} size="xs" />
            <span className="font-bold text-sm">{feedback.authorName}</span>
          </span>
        </div>
        <div className="mx-8 mt-1">
          <ul className="flex flex-wrap">
            {feedback.tags.map((tag) => (
              <FeedbackTagGiven key={tag.id} tag={tag} />
            ))}
          </ul>
        </div>
        <div className="h-10" />
        {received && <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-center">
            <p
              onClick={() => setEditing({ inProgress: true, updated: false })}
              className={`mx-4 border-t border-gray-border w-full py-2 col-span-1 cursor-pointer font-bold text-xs text-center`}
            >
              Edit
            </p>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default FeedbackCard;
