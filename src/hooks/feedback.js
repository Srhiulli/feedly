import { useLazyQuery } from "@apollo/client";
import { GET_FEEDBACK_BY_USER_ID } from "../graphql/queries/feedback";

export const useFeedback = () => {
  const [getFeedback, { data: feedbackData, error: feedbackError }] =
    useLazyQuery(GET_FEEDBACK_BY_USER_ID);

  const getFeedbackByUserId = async (user_id) => {
    try {
      const result = await getFeedback({
        variables: { user_id },
      });
      return { feedback: result.data?.feedbackByUserId };
    } catch (error) {
      return { error: error.message };
    }
  };

  return { getFeedbackByUserId, feedbackData, feedbackError };
};