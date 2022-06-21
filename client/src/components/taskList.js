import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router";
import EditTask from "./editTask";

const Task = () => {
  const PROJECTS = gql`
    query GetProjects($getProjectId: ID!) {
      getProject(id: $getProjectId) {
        name
        tasks {
          summary
          description
          id
          priority
          status
          projectID
        }
      }
    }
  `;

  const params = useParams();
  const projectId = params.id.toString();
  const projectStyle = {
    padding: "10px",
    backgroundColor: "#2578A7",
    borderRadius: "10px",
  };

  const projectStyle2 = {
    display: "flex",
    flexDirection: "row",
    padding: "50px",
    paddingTop: "20px",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const { loading, error, data } = useQuery(PROJECTS, {
    variables: {
      getProjectId: projectId,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <>
      <h1 style={{ marginLeft: "50px", marginTop: "30px" }}>
        {data.getProject.name}
      </h1>
      <div style={projectStyle2}>
        {data.getProject.tasks.map((project) => (
          <div key={project.id} style={projectStyle}>
            <EditTask args={project} />
          </div>
        ))}
      </div>
    </>
  );
};
export default Task;
