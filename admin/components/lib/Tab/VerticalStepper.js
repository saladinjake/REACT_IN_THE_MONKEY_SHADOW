import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { Button } from "../Button/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { ButtonGroup } from "@chakra-ui/button";
import { Box } from "@chakra-ui/layout";
import { StepContent } from "@material-ui/core";
import { BiReset } from "react-icons/bi";

const useStyles = makeStyles(() => ({
  stepper: {
    padding: 0,
  },
}));

export const VerticalStepper = ({
  data: steps = [],
  renderFinishContent,
  renderResetButton,
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        className={classes.stepper}
      >
        {steps.map((step, index) => (
          <Step key={step.heading}>
            <StepLabel>{step.heading}</StepLabel>
            <StepContent>
              <Box my={5}>{step.content}</Box>

              <ButtonGroup>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  leftIcon={<IoIosArrowRoundBack />}
                  sm
                >
                  Back
                </Button>

                {step.renderNext({ handleNext })}
              </ButtonGroup>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Box my={2}>
          {renderFinishContent?.()}

          {renderResetButton ? (
            renderResetButton({ handleReset })
          ) : (
            <VerticalStepperResetButton onClick={handleReset} />
          )}
        </Box>
      )}
    </>
  );
};

export const VerticalStepperResetButton = ({ onClick, children = "Reset" }) => (
  <Button
    mt={2}
    variant="secondary"
    onClick={onClick}
    sm
    leftIcon={<BiReset />}
  >
    {children}
  </Button>
);

VerticalStepper.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      content: PropTypes.element,
      renderNext: PropTypes.func,
    })
  ),

  renderFinishContent: PropTypes.func,
  renderResetButton: PropTypes.func,
};

VerticalStepperResetButton.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
};
