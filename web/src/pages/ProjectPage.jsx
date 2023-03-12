import { useMutation, useQuery } from "@apollo/client";
import { Link, useNavigate, useParams } from "react-router-dom";

import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";

import { Loading } from "../components/Loading";
import { ClientInfo } from "../components/ClientInfo";

import { DELETE_PROJECT } from "../mutations/projectMutations";

export function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: () => navigate("/"),
  });

  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: {
      id: projectId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.error(error);
  }

  async function handleEditProject() {}

  return (
    <>
      {!loading && !error ? (
        <div className="mt-5 mx-auto w-75 card p-5">
          <Link className="btn btn-light btn-sm w-25 d-inline ms-auto" to="/">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>

          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <div className="d-flex flex-column align-items-center gap-2 mt-4">
            <button
              onClick={handleEditProject}
              className="btn btn-secondary w-100"
            >
              Edit
            </button>
            <button onClick={deleteProject} className="btn btn-primary w-100">
              Delete
            </button>
          </div>
        </div>
      ) : (
        <h2>Could not find project.</h2>
      )}
    </>
  );
}
