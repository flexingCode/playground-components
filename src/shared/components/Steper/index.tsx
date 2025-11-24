import Button from "../Button";
import Step from "./Step";
import type { StepContentProps, StepProps } from "./Step/type";

type SteperProps = {
    currentStep: string;
    steps: (StepProps & StepContentProps)[];
    onNextStep: (nextStepId: string) => void | Promise<void>;
    onPreviousStep: (previousStepId: string) => void;
    onFinish: () => void | Promise<void>;
}

const Steper = (props: SteperProps) => {
    const { currentStep, steps, onNextStep, onPreviousStep, onFinish } = props;

    const handleNextStep = async () => {
        if (currentStep === steps[steps.length - 1].id) {
            await onFinish();
        } else {
            const nextStepId = steps.findIndex((step) => step.id === currentStep) + 1;
            await onNextStep(steps[nextStepId].id);
        }
    }

    const handlePreviousStep = () => {
        const previousStepId = steps.findIndex((step) => step.id === currentStep) - 1;
        onPreviousStep(steps[previousStepId].id);
    }

    const renderButtonSection = () => {
        return (
            <div className="flex flex-row justify-between">
                {currentStep !== steps[0].id && <Button onClick={handlePreviousStep} variant="outline">Previous</Button>}
                <Button onClick={handleNextStep} variant="primary">{currentStep === steps[steps.length - 1].id ? "Finish" : "Next"}</Button>
            </div>
        )
    }
    return (
        <div>
            <div className="flex flex-row">
                {steps.map((step) => (
                    <Step key={step.id} {...step} isActive={currentStep === step.id} />
                ))}
            </div>
            {steps.find((step) => step.id === currentStep)?.content}
            {renderButtonSection()}
        </div>

    )
}

export default Steper;