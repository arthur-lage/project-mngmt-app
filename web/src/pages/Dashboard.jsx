import { useState } from "react";

import { Header } from "../components/Header";
import { Clients } from "../components/Clients";
import { AddClientModal } from "../components/AddClientModal";
import { Projects } from "../components/Projects";
import { AddProjectModal } from "../components/AddProjectModal";

export function Dashboard () {
  const [currentTab, setCurrentTab] = useState("clients");
  return (
    <div>
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

        <div className="container">
          {currentTab === "clients" ? (
            <>
              <AddClientModal />
              <Clients />
            </>
          ) : (
            <>
              <AddProjectModal />
              <Projects />
            </>
          )}
        </div>
    </div>
  )
}