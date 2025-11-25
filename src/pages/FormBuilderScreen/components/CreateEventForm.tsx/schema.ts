import z from "zod";
import moment from "moment";

const createEventFormSchema = z.object({
    title: z.string().min(5, { message: "Title must be at least 5 characters" }),
    type: z.enum(["Conference", "Workshop", "Webinar", "Other"]),
    otherType: z.string().optional(),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime(),
    links: z.array(z.url()).min(1, { message: "At least one link is required" }),
    isOnSite: z.boolean(),
    eventFullAddress: z.string().optional(),
    meetURL: z.url().optional(),
}).refine((data)=>{
    if(data.type === "Other"){
        return data.otherType !== undefined && data.otherType.trim().length > 0;
    }
    return true;
}, {
    message: "You must provide a type for the event",
    path: ["otherType"],
}).refine((data)=>{
    if(moment(data.startDate).isBefore(moment(data.endDate))){
        return true;
    }
    return false;
}, {
    message: "Start date must be before end date",
    path: ["endDate"],
}).refine((data)=>{
    if(data.isOnSite){
        return data.eventFullAddress !== undefined && data.eventFullAddress.trim().length > 0;
    }
    return true;
}, {
    message: "You must provide a full address for the event",
    path: ["eventFullAddress"],
}).refine((data)=>{
    if(!data.isOnSite){
        return data.meetURL !== undefined && data.meetURL.trim().length > 0;
    }
    return true;
}, {
    message: "You must provide a meet URL for the event",
    path: ["meetURL"],
})

export default createEventFormSchema;