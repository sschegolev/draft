import { useCallback, useMemo, useState, memo } from "react";
import { POSITIONS_LIST } from "./constants";
import { ExtendedPlayersList } from "./ExtendedPlayersList";

export const Individuals = memo(({ players, draft, onPlayerSelected }) => {
  const [searchResult, setSearchResult] = useState("");
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [isChosenHidden, setIsChosenHidden] = useState(false);

  const onSearch = useCallback((event) => {
    setSearchResult(event.target.value);
  }, []);

  const makeFilterApplied = (positionId) => (event) => {
    if (event.target.checked) {
      setSelectedPositions([...selectedPositions, positionId]);
    } else {
      setSelectedPositions(selectedPositions.filter((id) => id !== positionId));
    }
  };

  const onHideChosen = (event) => setIsChosenHidden(event.target.checked);

  const playersToShow = useMemo(() => {
    return players
      .filter(
        (player) =>
          !selectedPositions.length ||
          selectedPositions.includes(player.positionId)
      )
      .filter((player) =>
        isChosenHidden
          ? !Object.keys(draft).find((id) => +id === player.id)
          : true
      )
      .filter((player) => player.name.toLowerCase().includes(searchResult));
  }, [draft, isChosenHidden, players, searchResult, selectedPositions]);

  return (
    <div className="individuals">
      <div>
        <input type="search" name="" id="" onInput={onSearch} />
      </div>

      <div>
        {POSITIONS_LIST.map(({ title, id }) => (
          <div key={title}>
            <input
              type="checkbox"
              id={title}
              onChange={makeFilterApplied(id)}
            />
            <label htmlFor={title}>{title}</label>
          </div>
        ))}
        <div>
          <input type="checkbox" id="hideChosen" onChange={onHideChosen} />
          <label htmlFor="hideChosen">hide chosen</label>
        </div>
      </div>

      <ExtendedPlayersList
        onPlayerSelected={onPlayerSelected}
        players={playersToShow}
        draft={draft}
      />
    </div>
  );
});
