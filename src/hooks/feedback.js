import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_FEEDBACK_BY_USER_ID } from "../graphql/queries/feedback";
import { CREATE_FEEDBACK } from "../graphql/mutations/createFeedback";

export const useFeedback = () => {
  const [getFeedback, { data: feedbackData, error: feedbackError }] =
    useLazyQuery(GET_FEEDBACK_BY_USER_ID);
  const [createFeedback, { data: createFeedbackData, error: createFeedbackError }] =
    useMutation(CREATE_FEEDBACK);

  const getFeedbackByUserId = async (user_id) => {
    try {
      const result = await getFeedback({
        variables: { user_id },
      });
      console.log("result", result);
      return { feedback: result.data?.feedbackByUserId };
    } catch (error) {
      return { error: error.message };
    }
  };
const handleCreateFeedback = async (
    user_id,
    created_by,
    title,
    message,
    stars,
    is_public,
    status,
    category,
    response,
    tags
  ) => {
    try {
      const { data } =  await createFeedback({
        variables: {
          user_id,
          created_by,
          title,
          message,
          stars,
          is_public,
          status,
          category,
          response,
          tags,
        },
      });
      if (!data?.createFeedback) {
        return { error: "Erro inesperado" };
      }
      return { feedback: data.createFeedback };
    } catch (error) {
      console.log("error hook", error);
      return { error: error.message };
    }
  };

  return {
    getFeedbackByUserId,
    feedbackData,
    feedbackError,
    handleCreateFeedback,
    createFeedbackData,
    createFeedbackError,
  };
};