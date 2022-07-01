import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router";
import EditProject from "./editProject"

const Project = () => {
  
  const PROJECTS = gql`
    query GetProjects {
      getProjects {
        id
        name
        user
      }
    }
  `;
  const navigate = useNavigate();

  const projectStyle = {
    padding: "10px",
    backgroundColor: "#87CEFA",
    borderRadius: "10px",
    display:"grid",
    gridTemplateColumns: "auto auto",
    justifyItems: "center",
    alignItems: "center"
  };

  const projectStyle2 = {
    display: "flex",
    flexDirection: "row",
    padding: "50px",
    flexWrap: "wrap",
    gap: "1rem",
  };



  const { loading, error, data } = useQuery(PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div style={projectStyle2}>
      {data.getProjects.map((project) => (
        <div key={project.id} style={projectStyle}>
          <div style={{marginRight:"20px"}} onClick={()=>navigate(`/Task/${project.id}`)}>{project.name}</div>
           <EditProject args={project}/>
        </div>
      ))}
    </div>
  );
};

export default Project;
