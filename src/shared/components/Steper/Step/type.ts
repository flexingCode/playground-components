export type StepProps = {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    isActive?: boolean;
    isCompleted?: boolean;
    isPending?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    isWarning?: boolean;
    isInfo?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    isFinished?: boolean;
    isSkipped?: boolean;
};

export type StepContentProps = {
    id: string;
    content: React.ReactNode;
}
