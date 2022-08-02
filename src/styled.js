import styled from "styled-components";

export const Player = styled.div`
  width: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-decoration: ${({ isChosen }) => (isChosen ? "line-through" : "none")};
`;

export const Points = styled.div`
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-left: 20px;
`;

export const AvgPoints = styled.div`
  cursor: pointer;
  width: 50px;
  text-align: center;
  margin-left: 20px;
`;

export const Position = styled.div`
  width: 70px;
  text-align: center;
  margin-left: 20px;
`;

export const ExtendedPlayerInfoWrapper = styled.div`
  display: flex;
  height: 20px;
  margin-bottom: 4px;
`;

export const PlayerInfoWrapper = styled(ExtendedPlayerInfoWrapper)`
  > div {
    margin-left: 0;
  }
`;

export const ExtendedTitleWrapper = styled.div`
  display: flex;
  height: 20px;
  margin-bottom: 8px;
`;

export const TitleWrapper = styled(ExtendedTitleWrapper)`
  > div {
    margin-left: 0;
  }
`;

export const Count = styled.div`
  margin-top: 8px;
`;

export const SelectedPlayers = styled.div`
  display: flex;
  width: 600px;

  > div {
    &:last-child {
      margin-left: 20px;
    }
  }
`;

export const Row = styled.div`
  display: flex;
`;
