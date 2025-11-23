import Steper from "@/shared/components/Steper";
import { UserIcon } from "lucide-react";
import { useState } from "react";

const MultistepScreen = () => {
  const [currentStep, setCurrentStep] = useState("step-1");
  const steps = [
    {
      id: "step-1",
      title: "Step 1",
      description: "Step 1 description",
      icon: <UserIcon />,
      content: <div>Step 1 content</div>,
    },
    {
      id: "step-2",
      title: "Step 2",
      description: "Step 2 description",
      icon: <UserIcon />,
      content: <div>Step 2 content</div>,
    }
  ]
  const handleNextStep = (nextStepId: string) => {
    setCurrentStep(nextStepId);
  }
  const handlePreviousStep = (previousStepId: string) => {
    setCurrentStep(previousStepId);
  }
  const handleFinish = () => {
    console.log("Finish");
  }
  return (
    <div>
      <Steper currentStep={currentStep} steps={steps} onNextStep={handleNextStep} onPreviousStep={handlePreviousStep} onFinish={handleFinish} />
    </div>
  )
};

export default MultistepScreen;