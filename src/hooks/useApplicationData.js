import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayById = state.days.find(day => day.appointments.includes(id))
    // finds the day by looking at the id values given to each appointment
    const days = state.days.map(day => {
      if (state.appointments[id].interview === null && day.name === dayById.name) { return { ...day, spots: day.spots - 1 } } else { return day }
    })
    // adds 1 to day count if the interview isnt filled (null) and the day names match
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
    // axios call to setState on our api page
  }

  function deleteInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const dayById = state.days.find(day => day.appointments.includes(id))
    const days = state.days.map(day => {
      if (day.name === dayById.name) { return { ...day, spots: day.spots + 1 } } else { return day }
    })
    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        });
      })
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get('/api/interviewers')
    ]).then((res) => {
      setState(prev => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data
      }))
    })

  }, [])


  return { state, setDay, bookInterview, deleteInterview }
}