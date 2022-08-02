import "./App.css";
import { useCallback, useState, useEffect } from "react";
import { Teams } from "./Teams";
import { Individuals } from "./Individuals";
import { Draft } from "./Draft";
import { getIndividuals, getTeams } from "./mapper";

const TEAMS = "teams";
const INDIVIDUALS = "individuals";
const DRAFT = "draft";

const initialDraft = localStorage.getItem("draft")
  ? JSON.parse(localStorage.getItem("draft"))
  : {};

function App() {
  const [tab, setTab] = useState(TEAMS);
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [draft, setDraft] = useState(initialDraft);

  useEffect(() => {
    const individuals = getIndividuals();
    individuals.sort((a, b) => b.points - a.points);

    setPlayers(individuals);
  }, []);

  useEffect(() => {
    setTeams(getTeams());
  }, []);

  const setTeamsTab = () => setTab(TEAMS);
  const setIndividualsTab = () => setTab(INDIVIDUALS);
  const setDraftTab = () => setTab(DRAFT);

  const handlePlayerSelected = useCallback(
    (round, playerId) => {
      if (!round) {
        delete draft[playerId];
      } else {
        draft[playerId] = round;
      }

      setDraft({ ...draft });
      localStorage.setItem("draft", JSON.stringify(draft));
    },
    [draft]
  );

  return (
    <div>
      <div className="buttons">
        <button onClick={setTeamsTab}>teams</button>
        <button onClick={setIndividualsTab}>select players</button>
        <button onClick={setDraftTab}>draft</button>
      </div>
      <div>
        {tab === INDIVIDUALS && (
          <Individuals
            players={players}
            draft={draft}
            onPlayerSelected={handlePlayerSelected}
          />
        )}
        {tab === TEAMS && <Teams players={players} teams={teams} />}
        {tab === DRAFT && (
          <Draft
            players={players}
            draft={draft}
            onPlayerSelected={handlePlayerSelected}
          />
        )}
      </div>
    </div>
  );
}

export default App;
