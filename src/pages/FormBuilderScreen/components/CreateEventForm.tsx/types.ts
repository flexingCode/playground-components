export type EventType = "Conference" | "Workshop" | "Webinar" | "Other";

export type EventForm = {
    title: string;
    type: EventType;
    startDate: string;
    otherType?: string;
    endDate: string;
    links: string[];
    isOnSite: boolean;
    eventFullAddress?: string;
    meetURL?: string;
}