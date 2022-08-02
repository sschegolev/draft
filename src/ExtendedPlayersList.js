import { ExpandedTitle } from "./Title";
import { ExtendedPlayerInfo } from "./PlayerInfo";
import { useCallback, useEffect, useState } from "react";

export const ExtendedPlayersList = ({
  onPlayerSelected,
  draft,
  players: predefinedPlayers,
  isDraft,
  onAddToTeam,
  becameUnavailable,
}) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    setPlayers(predefinedPlayers);
  }, [predefinedPlayers]);

  const sortByPoints = useCallback(() => {
    players.sort((a, b) => b.points - a.points);
    setPlayers([...players]);
  }, [players]);

  const sortByAvg = useCallback(() => {
    players.sort((a, b) => b.avgPoints - a.avgPoints);
    setPlayers([...players]);
  }, [players]);

  return (
    <>
      <ExpandedTitle
        onPointsClick={sortByPoints}
        onAveragePointsClick={sortByAvg}
      />
      {players.map((player) => (
        <ExtendedPlayerInfo
          key={player.id}
          player={player}
          onSelected={onPlayerSelected}
          selectedInRound={draft[player.id]}
          isChosen={Object.keys(draft).find((id) => +id === player.id)}
          isDraft={isDraft}
          onAddToTeam={onAddToTeam}
          becameUnavailable={becameUnavailable}
        />
      ))}
    </>
  );
};
