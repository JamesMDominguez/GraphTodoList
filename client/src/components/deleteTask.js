// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Modal from "react-bootstrap/Modal";
// import { useMutation, gql } from "@apollo/client";

// const DELETE_TASK = gql`
// mutation Mutation($deleteTaskId: ID!) {
//   deleteTask(id: $deleteTaskId) {
//     description
//   }
// }
// `;

// const PROJECTS = gql`
// query GetProjects($getProjectId: ID!) {
//   getProject(id: $getProjectId) {
//     tasks {
//       id
//       summary
//       description
//       priority
//       status
//     }
//   }
// }
// `;
// const [deleteTask,  { data, loading, error }] = useMutation(DELETE_TASK);

// export default function DeleteTask(){

// }