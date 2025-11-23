import type { StepProps } from "./type";

const baseClass =
    "flex w-full px-6 py-4 text-white items-center justify-center gap-4";

const statePriority: Array<{ key: keyof StepProps; className: string }> = [
    { key: "isError", className: "bg-red-500" },
    { key: "isDisabled", className: "bg-gray-400 opacity-60 cursor-not-allowed" },
    { key: "isSuccess", className: "bg-green-500" },
    { key: "isCompleted", className: "bg-green-500" },
    { key: "isLoading", className: "bg-blue-400 animate-pulse" },
    { key: "isActive", className: "bg-blue-500" },
    { key: "isWarning", className: "bg-yellow-500 text-black" },
    { key: "isPending", className: "bg-yellow-200 text-black" },
    { key: "isFinished", className: "bg-green-700" },
    { key: "isSkipped", className: "bg-gray-300 text-gray-600" },
    { key: "isInfo", className: "bg-blue-200 text-blue-800" }
];

const getStepClass = (props: StepProps): string => {
    for (const state of statePriority) {
        if (props[state.key]) {
            return state.className;
        }
    }
    return "bg-gray-200 text-gray-800";
};

const Step = (props: StepProps) => {
    const { title, description, icon, ...stateProps } = props;
    const styleClass = getStepClass(stateProps as StepProps);

    return (
        <>
            <div className={`${baseClass} ${styleClass}`}>
                {icon && (
                    <div className="flex items-center justify-center mr-4 h-10 w-10 rounded-full">
                        {icon}
                    </div>
                )}
                <div className="flex flex-col flex-1">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="text-sm text-gray-100 opacity-90">{description}</p>
                </div>
            </div>
        </>
    );
};

export default Step;