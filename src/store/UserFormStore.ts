import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type Step1 = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};
type Step2 = {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
};

type UserFormStore = {
    userForm: {
        step1: Step1;
        step2: Step2;
    };
    setStep1: (step1: Step1) => void;
    setStep2: (step2: Step2) => void;
    reset: () => void;
};

export const useUserFormStore = create<UserFormStore>()(
    persist(
        (set) => ({
            userForm: {
                step1: {
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                },
                step2: {
                    addressLine1: "",
                    addressLine2: "",
                    city: "",
                    state: "",
                    zip: "",
                    country: "",
                },
            },
            setStep1: (step1: Step1) => set((state) => ({ userForm: { ...state.userForm, step1 } })),
            setStep2: (step2: Step2) => set((state) => ({ userForm: { ...state.userForm, step2 } })),
            reset: () => set({ userForm: { step1: { firstName: "", lastName: "", email: "", password: "" }, step2: { addressLine1: "", addressLine2: "", city: "", state: "", zip: "", country: "" } } }),
        }),
        {
            name: "user-form",
            storage: createJSONStorage(() => localStorage),
        }
    )
);