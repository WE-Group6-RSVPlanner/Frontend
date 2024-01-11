import {AttendeeAvailability} from "./AttendeeAvailability";

export interface EventsBackend {
  event_id : string,
  title: string,
  description: string,
  location:string,
  location_description: string,
  event_type:string,
  organizer:Organizer,
  attendees:Attendee[],
  attendees_count:number,
  date_times:DateTime[]

}

interface Organizer {
  email : string,
  name : string
}

export interface Attendee{
  name:string,
  email:string,
  attendee_availabilities:AttendeeAvailability[]
}

interface DateTime{
  start_time:string,
  end_time:string
}

