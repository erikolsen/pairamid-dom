import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Terms = () => {
  const [showTerms, setShowTerms] = useState(true);
  const acceptTerms = () => {
    setShowTerms(false);
    localStorage.setItem("pairamid-terms", "4/26/2021");
  };
  const termsAccepted = localStorage.getItem("pairamid-terms");
  return (
    showTerms &&
    !termsAccepted && (
      <footer className="z-50 fixed bottom-0 w-screen my-2 p-4">
        <div className="bg-blue-100 shadow-lg rounded-lg border border-black p-4">
          <div className="flex">
            <p>
              By accessing or using Pairamid, you accept responsibility for any
              content submitted and actions taken while using the product. You
              are advised to not share organizationally identifiable
              information. <i>Effective starting: April 26th, 2021</i>
            </p>
            <div
              data-cy="accept-terms"
              className="cursor-pointer"
              onClick={() => acceptTerms()}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </div>
          </div>
        </div>
      </footer>
    )
  );
};

export default Terms;
