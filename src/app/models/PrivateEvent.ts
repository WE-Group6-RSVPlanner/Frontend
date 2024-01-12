import {Attendee} from "./backendModels/EventsBackend";
import {AttendeeAvailability} from "./backendModels/AttendeeAvailability";

export interface PrivateEvent{
  eventID:string,
  email:string,
  name:string,
  eventTitle:string,
  eventDescription:string,
  participants:string[],
  eventDates:string[],
  eventLocation:string,
  attendees:Attendee[]
}

export interface PrivateAttendeeAvailable {
  name:string,
  availability:AttendeeAvailability[]
}
