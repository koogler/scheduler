import React from "react"
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVE = "SAVE"
const DELETE = "DELETE"
const CANCEL = "CANCEL"



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE)
    setTimeout(() => {
      props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
    }, 1000)
  }

  function deleteAppointment() {
    transition(DELETE)

    props
      .deleteInterview(props.id)
      .then(() => transition(EMPTY))

  }

  function confirmPage() {
    transition(CANCEL)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && < Show student={props.interview.student} interviewer={props.interview.interviewer} onDelete={confirmPage} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={save} />}
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === CANCEL && <Confirm
        message="Please confirm that you want to delete this. This action is permanent."
        onCancel={back}
        onConfirm={deleteAppointment}
      />}
    </article>
  )
}