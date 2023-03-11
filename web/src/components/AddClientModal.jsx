import { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

import { verifyEmail } from "../utils/verify-email";

export function AddClientModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({
        query: GET_CLIENTS,
      });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: clients.concat([addClient]) },
      });
    },
  });

  function handleCreateClient(e) {
    e.preventDefault();

    if (!name.length || !email.length || !phone.length) {
      return alert(
        "Please make sure you have filled all the client information."
      );
    }

    if (!verifyEmail(email)) {
      return alert("Please make sure you are using a valid email address.");
    }

    try {
      addClient();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="mb-3">
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        Add Client
      </button>

      <div
        className="modal fade"
        id="addClientModal"
        role="dialog"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="close rounded"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleCreateClient}>
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
                    placeholder="Client's name..."
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 form-control"
                    type="email"
                    id="email"
                    placeholder="Client's email address..."
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-2 form-control"
                    type="tel"
                    id="phone"
                    placeholder="Client's phone number..."
                  />
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
