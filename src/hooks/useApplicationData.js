import React from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function useApplicationData() {





  return { state, setDay, bookInterview, cancelInterview }
}