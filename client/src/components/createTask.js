import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, gql } from "@apollo/client";
import { useLocation } from "react-router-dom";

const CreateBTN = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [form, setForm] = useState({
    projectId: path,
    summary: "",
    description: "",
    priority: "Lowest",
    status: "Todo",
  });

  const CREATE_TASK = gql`
    mutation CreateTask(
      $projectId: String!
      $summary: String!
      $description: String!
      $priority: String!
      $status: String!
      $deleted: Boolean!
    ) {
      createTask(
        projectID: $projectId
        summary: $summary
        description: $description
        priority: $priority
        status: $status
        deleted: $deleted
      ) {
        summary
        description
      }
    }
  `;
  const [createTask, { data, loading, error }] = useMutation(CREATE_TASK);
  const PROJECTS = gql`
    query GetProjects($getProjectId: ID!) {
      getProject(id: $getProjectId) {
        tasks {
          id
          summary
          description
          priority
          status
        }
      }
    }
  `;

  const handleCreate = () => {
    createTask({
      variables: {
        projectId: form.projectId,
        summary: form.summary,
        description: form.description,
        priority: form.priority,
        status: form.status,
        deleted: false
      },
      refetchQueries: () => [{ query: PROJECTS,variables: {getProjectId: path} } ],
    });
    handleClose();
  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }


  return (
    <>
      <div style={{ margin: "5px" }}>
        <Button variant="primary" onClick={handleShow}>
          Create
        </Button>
      </div>

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
                autoFocus
                onChange={(e) => updateForm({ summary: e.target.value })}
              />
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write description here"
                style={{ height: "100px" }}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
              <Form.Label>Status</Form.Label>
              <Form.Select
                onChange={(e) => updateForm({ status: e.target.value })}
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Form.Select>
              <Form.Label>Priority</Form.Label>
              <Form.Select onChange={(e) => updateForm({ priority: e.target.value })}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateBTN;
