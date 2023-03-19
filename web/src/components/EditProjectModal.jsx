import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";

export function EditProjectModal({ project }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(
    project.description ? project.description : ""
  );
  const [status, setStatus] = useState();

  useEffect(() => {
    if (project.status.toLowerCase() === "new") {
      return setStatus("new");
    }
    if (project.status.toLowerCase() === "in progress") {
      return setStatus("progress");
    }
    if (project.status.toLowerCase() === "completed") {
      return setStatus("completed");
    }
  }, [project.status]);

  const navigate = useNavigate();

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name,
      description,
      status,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: () => navigate("/"),
  });

  async function handleEditProject(e) {
    e.preventDefault();

    try {
      console.log(name, description, status);
      await updateProject(project.id, name, description, status);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      className="modal fade"
      id="editProjectModal"
      aria-labelledby="editProjectModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProjectModalLabel">
              Edit Project
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleEditProject}>
            <div className="modal-body">
              <div className="mb-4 d-flex flex-column gap-2">
                <label htmlFor="name">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  type="text"
                  placeholder="Project Name"
                />
              </div>
              <div className="mb-4 d-flex flex-column gap-2">
                <label htmlFor="description">Description</label>
                <textarea
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  placeholder="Project Description"
                ></textarea>
              </div>
              <div className="mb-4 d-flex flex-column gap-2">
                <label htmlFor="status">Status</label>
                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name="status"
                  id="status"
                >
                  <option value="new">New</option>
                  <option value="progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-secondary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
