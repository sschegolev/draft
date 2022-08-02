import { v4 } from "uuid";
import { players } from "../data/players";
import { teams } from "../data/teams";
import { positions, POSITIONS_LIST } from "../constants";

const getShortTitlePositionById = (positionId) =>
  POSITIONS_LIST.find(({ id }) => id === positionId).shortTitle;

const mapPlayer = (player) => ({
  name: player.web_name,
  points: player.total_points,
  id: player.id,
  avgPoints: parseFloat(player.points_per_game),
  positionId: player.element_type,
  position: getShortTitlePositionById(player.element_type),
  teamId: player.team,
  teamName: teams.find((team) => team.id === player.team)?.name,
});

export const createEmptyPlayers = (number) =>
  new Array(number).fill(null).map(() => ({
    id: v4(),
  }));

export const getMaxPlayersByPositions = (data) => {
  const playersByTeam = data.map((item) => item.players);

  return {
    [positions.goalkeepers]: Math.max(
      ...playersByTeam.map(
        (players) =>
          getPlayersByPositionId(players, positions.goalkeepers).length
      )
    ),
    [positions.defenders]: Math.max(
      ...playersByTeam.map(
        (players) => getPlayersByPositionId(players, positions.defenders).length
      )
    ),
    [positions.midfielders]: Math.max(
      ...playersByTeam.map(
        (players) =>
          getPlayersByPositionId(players, positions.midfielders).length
      )
    ),
    [positions.forwards]: Math.max(
      ...playersByTeam.map(
        (players) => getPlayersByPositionId(players, positions.forwards).length
      )
    ),
  };
};

export const getPlayersByPositionId = (players, positionId) =>
  players.filter((player) => player.positionId === positionId);

export const getDataByTeams = ({ teams, players }) => {
  return teams.reduce((acc, team) => {
    acc.push({
      team: team.name,
      players: players.filter((player) => player.teamId === team.id),
    });

    return acc;
  }, []);
};

export const getIndividuals = () => players.map(mapPlayer);

export const getTeams = () => teams.map(({ name, id }) => ({ name, id }));
