import Steper from "@/shared/components/Steper";
import { House, UserIcon } from "lucide-react";
import { useRef, useState } from "react";
import UserForm, { type UserFormRef } from "./components/UserForm";
import AddressUserForm, { type AddressUserFormRef } from "./components/AdressUserForm";
import { toast } from "react-toastify";

const MultistepScreen = () => {
  const [currentStep, setCurrentStep] = useState("step-1");
  const userFormRef = useRef<UserFormRef>(null);
  const addressFormRef = useRef<AddressUserFormRef>(null);

  const validateCurrentStep = async (): Promise<boolean> => {
    if (currentStep === "step-1" && userFormRef.current) {
      return await userFormRef.current.validate();
    }
    if (currentStep === "step-2" && addressFormRef.current) {
      return await addressFormRef.current.validate();
    }
    return true;
  };

  const steps = [
    {
      id: "step-1",
      title: "User Information",
      description: "Enter your user information",
      icon: <UserIcon />,
      content: <UserForm ref={userFormRef} />,
    },
    {
      id: "step-2",
      title: "Address Information",
      description: "Enter your address information",
      icon: <House />,
      content: <AddressUserForm ref={addressFormRef} />,
    }
  ]

  const handleNextStep = async (nextStepId: string) => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep(nextStepId);
    }
  }

  const handlePreviousStep = (previousStepId: string) => {
    setCurrentStep(previousStepId);
  }

  const handleFinish = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      console.log("Finish");
      const userData = userFormRef.current?.getValues();
      const addressData = addressFormRef.current?.getValues();
      console.log("User Data:", userData);
      console.log("Address Data:", addressData);
      toast.success("Form submitted successfully!");
    } 
  }

  return (
    <div>
      <Steper 
        currentStep={currentStep} 
        steps={steps} 
        onNextStep={handleNextStep} 
        onPreviousStep={handlePreviousStep} 
        onFinish={handleFinish} 
      />
    </div>
  )
};

export default MultistepScreen;