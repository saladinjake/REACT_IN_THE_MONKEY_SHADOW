import { useCallback } from "react";
import { useEffect } from "react";
import useToast from "./useToast";

const useFormSubmitFeedback = ({ formSubmitState, successText }) => {
  const toast = useToast();

  const exec = useCallback(() => {
    const duration = 6 * 1000;

    if (formSubmitState.hasSubmitError) {
      toast.displayToast({
        description: formSubmitState.hasSubmitError,
        duration,
      });
    }

    if (formSubmitState.hasSubmitted) {
      toast.displayToast({
        description: successText || formSubmitState.hasSubmitted,
        status: "success",
        duration,
      });
    }
  }, [
    formSubmitState.hasSubmitError,
    formSubmitState.hasSubmitted,
    successText,
  ]);

  useEffect(() => {
    exec();
  }, [exec]);

  return exec;
};

export default useFormSubmitFeedback;
