import { useCallback, useMemo } from "react";
import {
  getDataByTeams,
  getPlayersByPositionId,
  getMaxPlayersByPositions,
  createEmptyPlayers,
} from "./mapper";
import { PlayerInfo } from "./PlayerInfo";
import { Title } from "./Title";
import { POSITIONS_LIST } from "./constants";

const Section = ({ title, players, maxPlayers }) => {
  const emptyPositions = maxPlayers - players.length;

  return (
    <>
      <h4>{title}</h4>
      <Title />
      {[...players, ...createEmptyPlayers(emptyPositions)].map((player) => (
        <PlayerInfo key={player.id} player={player} />
      ))}
    </>
  );
};

export const Teams = ({ teams, players }) => {
  const dataByTeams = useMemo(
    () => getDataByTeams({ teams, players }),
    [players, teams]
  );
  const maxPlayersByPosition = getMaxPlayersByPositions(dataByTeams);

  return (
    <div className="root">
      {dataByTeams.map((item) => (
        <div key={item.team} className="team">
          <h3>{item.team}</h3>
          {POSITIONS_LIST.map(({ title, id }) => (
            <Section
              key={title}
              title={title}
              players={getPlayersByPositionId(item.players, id)}
              maxPlayers={maxPlayersByPosition[id]}
            />
          ))}
        </div>
      ))}
      }
    </div>
  );
};
