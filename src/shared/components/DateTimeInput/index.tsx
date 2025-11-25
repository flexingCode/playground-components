import DateTimePicker from "react-datetime-picker";

type DateTimeInputProps = {
    dateTime: string;
    onDateTimeChange: (dateTime: string) => void;
}

const DateTimeInput = (props: DateTimeInputProps) => {
    const { dateTime, onDateTimeChange } = props;
    return (
        <div className="flex flex-row gap-2">
            <DateTimePicker 
                value={new Date(dateTime)} 
                onChange={(value) => onDateTimeChange(value?.toISOString() ?? "")} 
                className="w-full border border-gray-300 rounded-md p-2"
            />
        </div>
    )
}

export default DateTimeInput;