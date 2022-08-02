import {
  Player,
  Points,
  AvgPoints,
  Position,
  ExtendedTitleWrapper,
  TitleWrapper,
} from "./styled";

export const Title = () => (
  <TitleWrapper className="title">
    <Player className="name">Player name</Player>
    <Points className="points">Points</Points>
  </TitleWrapper>
);

export const ExpandedTitle = ({ onPointsClick, onAveragePointsClick }) => (
  <ExtendedTitleWrapper>
    <Player>Player name</Player>
    <Points onClick={onPointsClick}>Points</Points>
    <AvgPoints onClick={onAveragePointsClick}>Avg</AvgPoints>
    <Position>Position</Position>
    <div className="team-name">Team</div>
    <div />
  </ExtendedTitleWrapper>
);
