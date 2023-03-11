import { useQuery } from "@apollo/client";
import { ClientRow } from "./ClientRow";

import { GET_CLIENTS } from "../queries/clientQueries";
import { Loading } from "./Loading";

export function Clients() {
  const { error, loading, data } = useQuery(GET_CLIENTS);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    console.log(error);
  }

  return (
    <div>
      {!error && !loading ? (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
