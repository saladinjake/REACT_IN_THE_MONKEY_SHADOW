import { Button } from "components/lib";

import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const reduceFieldsProps = (fieldsProps) =>
  fieldsProps.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.value }), {});

const initialFormSubmitState = {
  isSubmitting: false,
  isRedirecting: false,
  hasSubmitError: false,
  hasSubmitted: false,
};

const useForm = ({ doSubmit, initialFieldsProps, freezeValues }) => {
  const router = useRouter();
  const formRef = useRef();

  const [formSubmitState, setFormSubmitState] = useState(
    initialFormSubmitState
  );
  let [fieldsProps, setFieldsProps] = useState(
    initialFieldsProps.map((field) => ({ ...field, value: field.value || "" }))
  );

  const handleType = ({ target: { id, value } }) => {
    const newFieldsProps = [...fieldsProps];
    const field = newFieldsProps.find((field) => field.id === id);
    field.value = value;

    setFieldsProps(newFieldsProps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldsObj = reduceFieldsProps(fieldsProps);

    try {
      setFormSubmitState({
        ...initialFormSubmitState,
        isSubmitting: true,
      });

      const redirectPath = await doSubmit(fieldsObj, router);
      // As soon as `doSubmit` completes
      setFormSubmitState({ ...initialFormSubmitState, hasSubmitted: true });

      if (redirectPath) {
        if (router.query.redirect) {
          // Go back to previous route
          location.replace(router.query.redirect);
        } else {
          // Go to the redirectPath
          location.replace(redirectPath);
        }

        setFormSubmitState({
          ...initialFormSubmitState,
          hasSubmitted: true,
          isRedirecting: true,
        });
      }
    } catch (err) {
      const { message } = err;

      setFormSubmitState({
        ...initialFormSubmitState,
        hasSubmitError: message,
      });
    }
  };

  const renderSubmitBtn = (props = {}) => (
    <>
      <Button
        {...props}
        type="submit"
        isLoading={
          formSubmitState.isSubmitting || formSubmitState.isRedirecting
        }
        display={{ base: "flex", md: "none" }}
      >
        {props.text}
      </Button>

      <Button
        {...props}
        type="submit"
        isLoading={
          formSubmitState.isSubmitting || formSubmitState.isRedirecting
        }
        loadingText="please wait..."
        display={{ base: "none", md: "flex" }}
      >
        {props.text}
      </Button>
    </>
  );

  // Effect runs for successful form submission
  useEffect(() => {
    if (formSubmitState.hasSubmitted && !freezeValues) {
      // Reset all input element's values to nothing
      const newFieldsProps = [...fieldsProps];
      newFieldsProps.forEach((field) => {
        field.value = "";
      });

      setFieldsProps(newFieldsProps);
    }
  }, [formSubmitState, freezeValues]);

  const formProps = { ref: formRef, onSubmit: handleSubmit };

  return {
    formProps,
    formRef,
    handleSubmit,
    formSubmitState,
    fieldsProps,
    handleType,
    renderSubmitBtn,
  };
};
export default useForm;
