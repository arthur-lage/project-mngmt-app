import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";

import { Loading } from "./Loading";

export function AddProjectModal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [status, setStatus] = useState("new");

  const { data, error, loading } = useQuery(GET_CLIENTS);

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: {
      name,
      description,
      clientId,
      status,
    },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECTS });

      cache.writeQuery({
        query: GET_PROJECTS,
        data: {
          projects: projects.concat([addProject]),
        },
      });
    },
  });

  async function handleAddProject(e) {
    e.preventDefault();

    if (!name.length) {
      alert("Please use a valid project name.");
    }

    try {
      addProject(name, description, clientId, status);

      setName("");
      setDescription("");
      setClientId("");
      setStatus("new");
    } catch (err) {
      console.error(err);
    }
  }

  if (error) {
    console.error(error);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addProjectModal"
      >
        Add Project
      </button>

      <div
        className="modal fade"
        id="addProjectModal"
        aria-labelledby="addProjectModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addProjectModalLabel">
                Add Project
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleAddProject}>
              <div className="modal-body">
                <div className="mb-4">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 form-control"
                    type="text"
                    id="name"
                    placeholder="Project's name..."
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="description">
                    Description
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-2 form-control"
                    type="text"
                    id="description"
                    placeholder="Project's description..."
                  />
                </div>
                <div className="d-flex flex-column gap-2 mb-3 ">
                  <label htmlFor="client-id">Client</label>
                  <select
                    onChange={(e) => setClientId(e.target.value)}
                    id="client-id"
                    className="form-select"
                    value={clientId}
                  >
                    <option value="" defaultValue disabled>
                      Choose a Client
                    </option>
                    {data.clients.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="d-flex flex-column gap-2 mb-3 ">
                  <label htmlFor="status">Project Status</label>
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    id="status"
                    className="form-select"
                    value={status}
                  >
                    <option defaultValue value="new">
                      New
                    </option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
