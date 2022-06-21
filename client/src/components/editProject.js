import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, gql } from "@apollo/client";

export default function EditProject(props){

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    name: props.args.name,
  });
  const EDIT_PROJECT = gql`
    mutation EditProject($name: String!, $user: String!, $editProjectId: ID!) {
      editProject(name: $name, user: $user, id: $editProjectId) {
        name
        user
      }
    }
  `;

  const PROJECTS = gql`
    query GetProjects {
      getProjects {
        id
        name
        user
      }
    }
  `;

  const [editProject, { data, loading, error }] = useMutation(EDIT_PROJECT);

  const handleSave = () => {
    editProject({
    variables: {
      name: form.name,
      user: props.args.user,
      editProjectId: props.args.id
    },
    refetchQueries: () => [{ query: PROJECTS }],
  });
  handleClose();
}

  function updateForm(value){
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  return (
    <>
      <button
        style={{ margin: "5px", color: "white" }}
        className="btn btn-primary"
        onClick={handleShow}
      >
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="email"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
};
