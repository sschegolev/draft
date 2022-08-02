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

export const Draft = memo(({ players, draft, onPlayerSelected }) => {
  const [byRound, setByRound] = useState({});
  const [unavailable, setUnavailable] = useState([]);
  const [selectedGoalkeepers, setGoalkeepers] = useState([]);
  const [selectedMidfielders, setMidfielders] = useState([]);
  const [selectedDefenders, setDefenders] = useState([]);
  const [selectedForwards, setForwards] = useState([]);

  useEffect(() => {
    const gk = localStorage.getItem("gk")
      ? JSON.parse(localStorage.getItem("gk"))
      : [];
    const d = localStorage.getItem("d")
      ? JSON.parse(localStorage.getItem("d"))
      : [];
    const m = localStorage.getItem("m")
      ? JSON.parse(localStorage.getItem("m"))
      : [];
    const f = localStorage.getItem("f")
      ? JSON.parse(localStorage.getItem("f"))
      : [];
    const initialUnavailable = localStorage.getItem("unavailable")
      ? JSON.parse(localStorage.getItem("unavailable"))
      : [];


    setGoalkeepers(gk);
    setMidfielders(m);
    setDefenders(d);
    setForwards(f);
    setUnavailable(initialUnavailable);

  }, [])

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
        localStorage.setItem('gk', JSON.stringify(result));
      }
      if (positionId === 2 && !selectedDefenders.includes(playerId)) {
        result = [...selectedDefenders, playerId];
        setDefenders(result);
        localStorage.setItem('d', JSON.stringify(result));
      }
      if (positionId === 3 && !selectedMidfielders.includes(playerId)) {
        result = [...selectedMidfielders, playerId];
        setMidfielders(result);
        localStorage.setItem('m', JSON.stringify(result));
      }
      if (positionId === 4 && !selectedForwards.includes(playerId)) {
        result = [...selectedForwards, playerId];
        setForwards(result);
        localStorage.setItem('f', JSON.stringify(result));
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
      localStorage.setItem('unavailable', JSON.stringify(result));
    },
    [unavailable]
  );

  const handleRemoveFromUnavailable = useCallback(
    (playerId) => {
      const result = unavailable.filter((id) => id !== playerId);

      setUnavailable(result);
      localStorage.setItem('unavailable', JSON.stringify(result));
    },
    [unavailable]
  );

  const handleRemoveFromYourPlayers = useCallback(
    (playerId, positionId) => {
      let result;
      if (positionId === 1) {
        result = selectedGoalkeepers.filter((id) => id !== playerId);
        setGoalkeepers(result);
        localStorage.setItem('gk', JSON.stringify(result));
      }
      if (positionId === 2) {
        result = selectedDefenders.filter((id) => id !== playerId);
        setDefenders(result);
        localStorage.setItem('d', JSON.stringify(result));
      }
      if (positionId === 3) {
        result = selectedMidfielders.filter((id) => id !== playerId);
        setMidfielders(result);
        localStorage.setItem('m', JSON.stringify(result));
      }
      if (positionId === 4) {
        result = selectedForwards.filter((id) => id !== playerId);
        setForwards(result);
        localStorage.setItem('f', JSON.stringify(result));
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
