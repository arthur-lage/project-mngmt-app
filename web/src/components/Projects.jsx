import { GET_PROJECTS } from "../queries/projectQueries";
import { useQuery } from "@apollo/client";
import { Loading } from "./Loading";

import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const { error, loading, data } = useQuery(GET_PROJECTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <>
      {!error && !loading && data.projects.length > 0 ? (
        <div className="row">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <h2>No projects found</h2>
      )}
    </>
  );
}
