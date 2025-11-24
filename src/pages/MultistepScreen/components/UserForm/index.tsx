import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserFormData } from "./type";
import { UserFormSchema } from "./schema";
import Input from "@/shared/components/Input";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useUserFormStore } from "@/store/UserFormStore";

export interface UserFormRef {
    validate: () => Promise<boolean>;
    getValues: () => UserFormData;
}

const UserForm = forwardRef<UserFormRef>((_props, ref) => {
    const {userForm} = useUserFormStore();
    const form = useForm<UserFormData>({
        resolver: zodResolver(UserFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        form.reset(userForm.step1);
    }, [userForm.step1]);

    useImperativeHandle(ref, () => ({
        validate: async () => {
            const isValid = await form.trigger();
            return isValid;
        },
        getValues: () => form.getValues(),
    }));

    const onSubmit = (data: UserFormData) => {
        console.log(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col gap-4 p-4">
                <Controller
                    control={form.control}
                    name="firstName"
                    render={({ field, fieldState }) => (
                        <Input
                            name="firstName"
                            type="text"
                            placeholder="Enter your first name"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="lastName"
                    render={({ field, fieldState }) => (
                        <Input
                            name="lastName"
                            type="text"
                            placeholder="Enter your last name"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <Input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
            </div>
        </form>
    )
});

UserForm.displayName = "UserForm";

export default UserForm;