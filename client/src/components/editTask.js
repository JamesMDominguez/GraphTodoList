import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, gql } from "@apollo/client";

export default function EditThisTask(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [form, setForm] = useState({
    summary: props.args.summary,
    description: props.args.description,
    priority: props.args.priority,
    status: props.args.status,
  });

  const EDIT_TASK = gql`
    mutation EditTask(
      $projectId: String!
      $summary: String!
      $description: String!
      $priority: String!
      $status: String!
      $editTaskId: ID!
      $deleted: Boolean!
    ) {
      editTask(
        projectID: $projectId
        summary: $summary
        description: $description
        priority: $priority
        status: $status
        id: $editTaskId
        deleted: $deleted
      ) {
        summary
        description
        id
        priority
        status
        projectID
      }
    }
  `;

  const DELETE_TASK = gql`
    mutation DeleteTask($deleteTaskId: ID!) {
      deleteTask(id: $deleteTaskId) {
        summary
        description
        deleted
      }
    }
  `;

  const PROJECTS = gql`
    query GetProjects($getProjectId: ID!) {
      getProject(id: $getProjectId) {
        tasks {
          id
          summary
          description
          priority
          status
          deleted
        }
      }
    }
  `;
  const [deleteTask,  { data2, loading2, error2 }] = useMutation(DELETE_TASK);
  const [editMyTask, { data, loading, error }] = useMutation(EDIT_TASK);

  const handleDelete = () => {
    deleteTask({
      variables: {
        deleteTaskId: props.args.id
      },
      refetchQueries: () => [{ query: PROJECTS,variables: {getProjectId: props.args.projectID} } ],
    });
    handleClose();
  };

  const handleSave = () => {
    editMyTask({
      variables: {
        projectId: props.args.projectID,
        summary: form.summary,
        description: form.description,
        priority: form.priority,
        status: form.status,
        editTaskId: props.args.id,
        deleted: false,
      },
      refetchQueries: () => [{ query: PROJECTS,variables: {getProjectId: props.args.projectID} } ],
    });
    handleClose();
  };

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <>
      <h3 style={{ margin: "5px", color: "white" }} onClick={handleShow}>
        {props.args.summary}
      </h3>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Summary</Form.Label>
              <Form.Control
                type="email"
                value={form.summary}
                onChange={(e) => updateForm({ summary: e.target.value })}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write description here"
                style={{ height: "100px" }}
                onChange={(e) => updateForm({ description: e.target.value })}
                value={form.description}
              />
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={(e) => updateForm({ status: e.target.value })}
                value={form.status}
              >
                <option value="In Progress">In Progress</option>
                <option value="Todo">Todo</option>
                <option value="Done">Done</option>
              </Form.Select>
              <Form.Label>Priority</Form.Label>
              <Form.Select
                onChange={(e) => updateForm({ priority: e.target.value })}
                value={form.priority}
              >
                <option value="Lowest">Lowest</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Highest">Highest</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
