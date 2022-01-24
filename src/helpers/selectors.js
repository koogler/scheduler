export function getAppointmentsForDay(state, day) {
  const returnArr = []

  for (const dayParse of state.days) {
    if (dayParse.name === day) {
      for (const appointment of dayParse.appointments) {
        if (state.appointments[appointment]) {
          returnArr.push(state.appointments[appointment])
        }
      }
    }
  }
  return returnArr
}

export function getInterview(state, interview) {
  const returnObj = {}
  if (interview) {
    returnObj.student = interview.student
    returnObj.interviewer = state.interviewers[interview.interviewer]
  }
  else {
    return null
  }
  return returnObj
}

export function getInterviewersForDay(state, day) {
  const returnArr = []

  for (const dayParse of state.days) {
    if (dayParse.name === day) {
      for (const interviewer of dayParse.interviewers) {
        if (state.interviewers[interviewer]) {
          returnArr.push(state.interviewers[interviewer])
        }
      }
    }
  }
  return returnArr
}