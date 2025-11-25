import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createEventFormSchema from "./schema";
import { z } from "zod";
import FormControl from "@/shared/components/FormControl";
import FormControlSelect from "@/shared/components/FormControlSelect";
import eventTypes from "@data/eventTypes.json";
import DateTimeInput from "@/shared/components/DateTimeInput";
import Input from "@/shared/components/Input";
import Button from "@/shared/components/Button";
import Checkbox from "@/shared/components/Checkbox";
import { toast } from "react-toastify";

const eventTypeOptions = eventTypes.map((type) => ({
    label: type,
    value: type,
}));

type FormData = z.infer<typeof createEventFormSchema>;

const CreateEventForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(createEventFormSchema),
        defaultValues: {
            title: "",
            type: "Conference",
            otherType: "",
            startDate: new Date().toISOString(),
            endDate: new Date().toISOString(),
            links: [""],
            isOnSite: false,
            eventFullAddress: "",
            meetURL: "",
        },
    });
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        // @ts-expect-error - useFieldArray type inference issue with zodResolver and refine
        name: "links",
    });

    const handleSubmit = (data: FormData) => {
        console.log("Form submitted successfully:", data);
        toast.success("Event created successfully");
    };

    const handleError = (errors: any) => {
        console.log("Form validation errors:", errors);
        toast.error("Please fix the errors in the form");
    };
    return (
        <form className="flex flex-col gap-4 px-4 py-6" onSubmit={form.handleSubmit(handleSubmit, handleError)}>
            <div className="flex flex-col gap-4">
                <Controller
                    control={form.control}
                    name="title"
                    render={({ field, fieldState }) => (
                        <FormControl
                            label="Event Title"
                            onTextChange={field.onChange}
                            value={field.value}
                            placeholder="Enter event title"
                            type="text"
                            name="title"
                            error={fieldState.error?.message ?? ""}
                        />
                    )}
                />
                <Controller
                    control={form.control}
                    name="type"
                    render={({ field, fieldState }) => (
                        <FormControlSelect
                            label="Event Type (eg: Conference, Workshop, Webinar, etc.)"
                            options={eventTypeOptions}
                            onTextChange={field.onChange}
                            value={field.value}
                            placeholder="Select event type"
                            error={fieldState.error?.message ?? ""}
                            name="type"
                        />
                    )}
                />
                {form.watch("type") === "Other" && (
                    <Controller
                        control={form.control}
                        name="otherType"
                        render={({ field, fieldState }) => (
                            <FormControl
                                label="Other Type"
                                onTextChange={field.onChange}
                                value={field.value ?? ""}
                                placeholder="Enter other event type"
                                type="text"
                                name="otherType"
                                error={fieldState.error?.message ?? ""}
                            />
                        )}
                    />
                )}
                <div className="flex flex-row gap-2">
                    <Controller
                        control={form.control}
                        name="startDate"
                        render={({ field, fieldState }) => (
                            <div className="flex flex-1 flex-col gap-2">
                                <label htmlFor="startDate" className="text-sm font-medium">Start Date</label>
                                <DateTimeInput dateTime={field.value} onDateTimeChange={field.onChange} />
                                {fieldState.error?.message && <p className="text-sm text-red-500">{fieldState.error?.message}</p>}
                            </div>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="endDate"
                        render={({ field, fieldState }) => (
                            <div className="flex flex-1 flex-col gap-2">
                                <label htmlFor="endDate" className="text-sm font-medium">End Date</label>
                                <DateTimeInput dateTime={field.value} onDateTimeChange={field.onChange} />
                                {fieldState.error?.message && <p className="text-sm text-red-500">{fieldState.error?.message}</p>}
                            </div>
                        )}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium">Links (1 minimum)</label>
                    <div className="flex flex-col gap-2">
                        {fields.map((field, index) => (
                            <Controller
                                key={field.id}
                                control={form.control}
                                name={`links.${index}` as const}
                                render={({ field: inputField, fieldState }) => (
                                    <div className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <Input
                                                name={inputField.name}
                                                value={inputField.value || ""}
                                                onTextChange={inputField.onChange}
                                                placeholder="https://example.com"
                                                type="text"
                                                error={
                                                    fieldState.error?.message ||
                                                    (form.formState.errors.links?.root?.message && index === 0
                                                        ? form.formState.errors.links.root.message
                                                        : "")
                                                }
                                            />
                                        </div>
                                        {fields.length > 1 && (
                                            <Button
                                                variant="outline"
                                                className="px-3 py-2"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    remove(index);
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                )}
                            />
                        ))}
                        <Button
                            variant="ghost"
                            className="self-start"
                            onClick={(e) => {
                                e.preventDefault();
                                append("");
                            }}
                        >
                            + Add Link
                        </Button>

                    </div>
                    {form.formState.errors.links?.root && (
                        <p className="text-sm text-red-500">
                            {form.formState.errors.links.root.message}
                        </p>
                    )}
                </div>
                <Controller
                    control={form.control}
                    name="isOnSite"
                    render={({ field, fieldState }) => (
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium">Is the event on site?</label>
                                <p className="text-sm text-gray-500">If the event is not on site, the event URL will be used to display the event.</p>
                            </div>
                            <Checkbox checked={field.value} onChange={field.onChange} />
                            {fieldState.error?.message && <p className="text-sm text-red-500">{fieldState.error?.message}</p>}
                        </div>
                    )}
                />
                {
                    !!form.watch("isOnSite") ?
                        <Controller
                            control={form.control}
                            name="eventFullAddress"
                            render={({ field, fieldState }) => (
                                <FormControl
                                    label="Event Full Address"
                                    onTextChange={field.onChange}
                                    value={field.value ?? ""}
                                    placeholder="Enter event full address"
                                    type="text" name="eventFullAddress"
                                    error={fieldState.error?.message ?? ""} />
                            )}
                        />
                        :
                        <Controller
                            control={form.control}
                            name="meetURL"
                            render={({ field, fieldState }) => (
                                <FormControl
                                    label="Event URL"
                                    onTextChange={field.onChange}
                                    value={field.value ?? ""}
                                    placeholder="Enter event URL"
                                    type="text" name="eventURL"
                                    error={fieldState.error?.message ?? ""} />
                            )}
                        />
                }
            </div>
            <Button variant="primary" type="submit">Create Event</Button>
        </form>
    )
};

export default CreateEventForm;