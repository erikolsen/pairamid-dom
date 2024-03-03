import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import { API_URL } from "../../constants";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import FeedbackReceived from "./Feedback/FeedbackReceived";

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.access_token) {
    return { Authorization: `Bearer ${currentUser.access_token}` };
  } else {
    return {};
  }
}

const User = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`${API_URL}/users/${userId}`, { headers: authHeader() })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log('error', error)
        if (error.response.status === 401) {
          history.push("/login");
        }
      });
  }, [setUser, userId, history]);

  const updateFeedback = (newFeedback) => {
    let updatedUser = { ...user };
    updatedUser.feedbackReceived = user.feedbackReceived.map((fb) =>
      fb.id === newFeedback.id ? newFeedback : fb
    );
    setUser(updatedUser);
  };

  const deleteFeedback = (id) => {
    axios.delete(`${API_URL}/feedbacks/${id}`).then((response) => {
      let updatedUser = { ...user };
      updatedUser.feedbackReceived = user.feedbackReceived.filter(
        (fb) => fb.id !== response.data
      );
      setUser(updatedUser);
    });
  };

  const duplicateFeedback = (feedback) => {
    axios
      .post(`${API_URL}/feedbacks/${feedback.id}/duplicate`)
      .then((response) => {
        let updatedUser = { ...user };
        const oldFeedbacks = user.feedbackReceived;
        const insertIndex = oldFeedbacks.indexOf(feedback) + 1;
        updatedUser.feedbackReceived = [
          ...oldFeedbacks.slice(0, insertIndex),
          { ...response.data, updated: true },
          ...oldFeedbacks.slice(insertIndex),
        ];
        setUser(updatedUser);
      });
  };

  if (!user) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8">
      <Header />
      <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-100">
        <section>
          <header className="border-b-2 border-gray-border flex flex-wrap justify-between items-baseline py-1 mb-4">
            <div className="w-full flex justify-between items-center">
              <h1>{user.fullName || user.username}</h1>
            </div>
          </header>
          <div className="pb-8">
            <FeedbackReceived
              user={user}
              updateFeedback={updateFeedback}
              deleteFeedback={deleteFeedback}
              duplicateFeedback={duplicateFeedback}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default User;
