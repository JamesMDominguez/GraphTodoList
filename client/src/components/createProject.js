import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, gql } from "@apollo/client";

const CreateProjectBTN = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [form, setForm] = useState({
    name: "",
    user: "jamesdominguez", //update this when auth0 is added!
  });

  const CREATE_PROJECT = gql`
    mutation CreateProject($name: String!, $user: String!) {
      createProject(name: $name, user: $user) {
        name
        user
      }
    }
  `;
  const [createProject, { data, loading, error }] = useMutation(CREATE_PROJECT);
  const PROJECTS = gql`
    query GetProjects {
      getProjects {
        id
        name
        user
      }
    }
  `;
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
          <Modal.Title>Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="email"
                autoFocus
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
            Close
          </Button>
          <Button variant="primary" onClick={()=>{
            createProject(
              {variables: {
              name: form.name,
              user: form.user
            },
            refetchQueries: ()=> [{ query: PROJECTS }]
          })
            handleClose()
          }}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default CreateProjectBTN;
