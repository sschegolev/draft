import { useEffect, useState, memo, useCallback, useMemo } from "react";
import { ExtendedPlayersList } from "./ExtendedPlayersList";
import { Count, Player, SelectedPlayers, Row } from "./styled";

const getPlayersData = (players, currentRoundPlayers, unavailable) => {
  return players.filter(
    (player) =>
      currentRoundPlayers.includes(player.id) &&
      !unavailable.includes(player.id)
  );
};

let gk = [];
let d = [];
let m = [];
let f = [];

let initialunavailable = [];

export const Draft = memo(({ players, draft, onPlayerSelected }) => {
  const [byRound, setByRound] = useState({});
  const [unavailable, setUnavailable] = useState(initialunavailable);
  const [selectedGoalkeepers, setGoalkeepers] = useState(gk);
  const [selectedMidfielders, setMidfielders] = useState(m);
  const [selectedDefenders, setDefenders] = useState(d);
  const [selectedForwards, setForwards] = useState(f);

  useEffect(() => {
    const result = {};
    for (const key in draft) {
      const value = draft[key];
      if (result[value]) {
        result[value].push(+key);
      } else {
        result[value] = [+key];
      }
    }

    setByRound(result);
  }, [draft]);

  const handleAddToTeam = useCallback(
    (positionId, playerId) => {
      let result;
      if (positionId === 1 && !selectedGoalkeepers.includes(playerId)) {
        result = [...selectedGoalkeepers, playerId];
        setGoalkeepers(result);
        gk = result;
      }
      if (positionId === 2 && !selectedDefenders.includes(playerId)) {
        result = [...selectedDefenders, playerId];
        setDefenders(result);
        d = result;
      }
      if (positionId === 3 && !selectedMidfielders.includes(playerId)) {
        result = [...selectedMidfielders, playerId];
        setMidfielders(result);
        m = result;
      }
      if (positionId === 4 && !selectedForwards.includes(playerId)) {
        result = [...selectedForwards, playerId];
        setForwards(result);
        f = result;
      }
    },
    [
      selectedDefenders,
      selectedForwards,
      selectedGoalkeepers,
      selectedMidfielders,
    ]
  );

  const yourPlayers = useMemo(() => {
    return [
      ...selectedDefenders,
      ...selectedForwards,
      ...selectedGoalkeepers,
      ...selectedMidfielders,
    ];
  }, [
    selectedDefenders,
    selectedForwards,
    selectedGoalkeepers,
    selectedMidfielders,
  ]);

  const handleBecameUnavailable = useCallback(
    (playerId) => {
      const result = [...unavailable, playerId];

      setUnavailable(result);
      initialunavailable = result;
    },
    [unavailable]
  );

  const handleRemoveFromUnavailable = useCallback(
    (playerId) => {
      const result = unavailable.filter((id) => id !== playerId);

      setUnavailable(result);
      initialunavailable = result;
    },
    [unavailable]
  );

  const handleRemoveFromYourPlayers = useCallback(
    (playerId, positionId) => {
      let result;
      if (positionId === 1) {
        result = selectedGoalkeepers.filter((id) => id !== playerId);
        setGoalkeepers(result);
        gk = result;
      }
      if (positionId === 2) {
        result = selectedDefenders.filter((id) => id !== playerId);
        setDefenders(result);
        d = result;
      }
      if (positionId === 3) {
        result = selectedMidfielders.filter((id) => id !== playerId);
        setMidfielders(result);
        m = result;
      }
      if (positionId === 4) {
        result = selectedForwards.filter((id) => id !== playerId);
        setForwards(result);
        f = result;
      }
    },
    [
      selectedDefenders,
      selectedForwards,
      selectedGoalkeepers,
      selectedMidfielders,
    ]
  );

  return (
    <>
      <Count>
        My team count: <b>{selectedGoalkeepers.length}</b> goalkeepers;{" "}
        <b>{selectedDefenders.length}</b> defenders;{" "}
        <b>{selectedMidfielders.length}</b> midfielders;{" "}
        <b>{selectedForwards.length}</b> forwards
      </Count>
      {Object.keys(byRound).map((round) => (
        <div key={`round_${round}`}>
          <h3>{round} round</h3>
          <ExtendedPlayersList
            players={getPlayersData(players, byRound[round], [
              ...unavailable,
              ...yourPlayers,
            ])}
            onPlayerSelected={onPlayerSelected}
            draft={draft}
            isDraft
            onAddToTeam={handleAddToTeam}
            becameUnavailable={handleBecameUnavailable}
          />
        </div>
      ))}
      <SelectedPlayers>
        <div>
          <h3>Unavailable players</h3>
          {unavailable.map((playerId) => (
            <Row key={`${playerId}_unavailable_player`}>
              <Player>{players.find(({ id }) => playerId === id)?.name}</Player>
              <button onClick={() => handleRemoveFromUnavailable(playerId)}>
                move to list
              </button>
            </Row>
          ))}
        </div>
        <div>
          <h3>Your players</h3>
          {yourPlayers.map((playerId) => {
            const player = players.find(({ id }) => playerId === id);
            return (
              <Row key={`${playerId}_your_player`}>
                <Player>{player?.name}</Player>
                <button
                  onClick={() =>
                    handleRemoveFromYourPlayers(player?.id, player?.positionId)
                  }
                >
                  move to list
                </button>
              </Row>
            );
          })}
        </div>
      </SelectedPlayers>
    </>
  );
});
