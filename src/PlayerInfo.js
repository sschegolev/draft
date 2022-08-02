import {
  Player,
  Points,
  AvgPoints,
  Position,
  ExtendedPlayerInfoWrapper,
  PlayerInfoWrapper,
} from "./styled";
import { memo, useCallback } from "react";

export const PlayerInfo = ({ player }) => (
  <ExtendedPlayerInfoWrapper className="player-info">
    <PlayerInfoWrapper>{player.name}</PlayerInfoWrapper>
    <Points className="points">{player.points}</Points>
  </ExtendedPlayerInfoWrapper>
);

const OPTIONS = new Array(24).fill(null).map((_, index) => ({
  id: index + 1,
  value: `${index + 1} round`,
}));

export const ExtendedPlayerInfo = memo(
  ({
    player,
    onSelected,
    isChosen,
    selectedInRound,
    isDraft,
    onAddToTeam,
    becameUnavailable,
  }) => {
    const handleSelect = useCallback(
      (event) => {
        onSelected(+event.target.value, player.id);
      },
      [onSelected, player.id]
    );

    const handleAdd = useCallback(() => {
      onAddToTeam(player.positionId, player.id);
    }, [onAddToTeam, player.id, player.positionId]);

    const handleUnavailable = useCallback(() => {
      becameUnavailable(player.id);
    }, [becameUnavailable, player.id]);

    return (
      <ExtendedPlayerInfoWrapper>
        <Player isChosen={isChosen && !isDraft}>{player.name}</Player>
        <Points className="points">{player.points}</Points>
        <AvgPoints className="avg-points">{player.avgPoints}</AvgPoints>
        <Position>{player.position}</Position>
        <div className="team-name">{player.teamName}</div>
        <select
          defaultValue={selectedInRound}
          name="rounds"
          id="rounds"
          onChange={handleSelect}
        >
          <option value="0"></option>
          {OPTIONS.map((option) => (
            <option key={option.value} value={option.id}>
              {option.value}
            </option>
          ))}
        </select>
        {isDraft && (
          <>
            <button onClick={handleAdd}>Add to team</button>
            <button onClick={handleUnavailable}>Unavailable</button>
          </>
        )}
      </ExtendedPlayerInfoWrapper>
    );
  }
);
