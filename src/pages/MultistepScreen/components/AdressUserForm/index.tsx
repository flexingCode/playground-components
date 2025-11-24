import { Controller, useForm } from "react-hook-form";
import type { AddressFormData } from "./type";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressFormSchema } from "./shcema";
import Input from "@/shared/components/Input";
import { forwardRef, useImperativeHandle } from "react";

export interface AddressUserFormRef {
    validate: () => Promise<boolean>;
    getValues: () => AddressFormData;
}

const AddressUserForm = forwardRef<AddressUserFormRef>((_props, ref) => {
    const form = useForm<AddressFormData>({
        resolver: zodResolver(AddressFormSchema),
        defaultValues: {
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zip: "",
            country: "",
        },
    });

    useImperativeHandle(ref, () => ({
        validate: async () => {
            const isValid = await form.trigger();
            return isValid;
        },
        getValues: () => form.getValues(),
    }));

    const onSubmit = (data: AddressFormData) => {
        console.log(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col gap-4 p-4">
                <Controller
                    control={form.control}
                    name="addressLine1"
                    render={({ field, fieldState }) => (
                        <Input
                            name="addressLine1"
                            type="text"
                            placeholder="Enter your address line 1"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="addressLine2"
                    render={({ field, fieldState }) => (
                        <Input
                            name="addressLine2"
                            type="text"
                            placeholder="Enter your address line 2"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="city"
                    render={({ field, fieldState }) => (
                        <Input
                            name="city"
                            type="text"
                            placeholder="Enter your city"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="state"
                    render={({ field, fieldState }) => (
                        <Input
                            name="state"
                            type="text"
                            placeholder="Enter your state"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="zip"
                    render={({ field, fieldState }) => (
                        <Input
                            name="zip"
                            type="text"
                            placeholder="Enter your zip"
                            value={field.value}
                            onTextChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="country"
                    render={({ field, fieldState }) => (
                        <Input
                            name="country"
                            type="text"
                            placeholder="Enter your country"
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

AddressUserForm.displayName = "AddressUserForm";

export default AddressUserForm;