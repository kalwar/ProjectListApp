import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8007/api/projects')
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('Expected an array, but got:', response.data);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleEdit = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  const handleDelete = (projectId) => {
    // Ask for user confirmation before deleting
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios
        .delete(`http://localhost:8007/api/projects/${projectId}`)
        .then(() => {
          // Remove the project from the state to update the UI
          setProjects(projects.filter((project) => project.id !== projectId));
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  return (
    <div>
      <h1>Project List</h1>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.description}</td>
              <td>
                <button onClick={() => handleEdit(project.id)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
