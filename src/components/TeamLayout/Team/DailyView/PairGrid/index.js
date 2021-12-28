import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Pair from "./Pair";
import CirclePlus from "../../../../svg/CirclePlus";
import ParkingLot from "./ParkingLot";
import OutOfOffice from "./OutOfOffice";
import { SOCKET } from "../../SocketHandler";
import { useParams } from "react-router-dom";

const getPairData = (pairs, pairUuid) => {
  const pair = pairs.find((p) => p.uuid === pairUuid);
  const index = pairs.indexOf(pair);
  return {
    pair: pair,
    index: index,
    users: pairs[index].users,
  };
};

const PairGrid = ({ pairs, setSaved, setError }) => {
  const { teamId } = useParams();
  const handleError = (response) => {
    if (response.error) {
      setError(response.message);
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    const sourceData = getPairData(pairs, source.droppableId);
    const descData = getPairData(pairs, destination.droppableId);
    const descUsers =
      destination.droppableId === source.droppableId
        ? sourceData.users
        : descData.users;
    const user = sourceData.users.find((user) => user.uuid === draggableId);

    sourceData.users.splice(source.index, 1);
    descUsers.splice(destination.index, 0, user);

    setSaved(false);
    SOCKET.emit(
      "batch update pairs",
      { pairs: [sourceData, descData], teamId: teamId },
      (response) => handleError(response)
    );
  };

  const updatePairInfo = (text, uuid) => {
    const pairData = getPairData(pairs, uuid);
    pairData.pair.info = text;
    setSaved(false);
    SOCKET.emit(
      "batch update pairs",
      { pairs: [pairData], teamId: teamId },
      (response) => handleError(response)
    );
  };

  const deletePair = (pair) => {
    SOCKET.emit(
      "delete pair",
      { uuid: pair.uuid, teamId: teamId },
      (response) => handleError(response)
    );
  };

  const addPair = () => {
    SOCKET.emit("add pair", { teamId: teamId }, (response) =>
      handleError(response)
    );
  };

  const activePairs = pairs
    .filter((p) => p.info !== "UNPAIRED" && p.info !== "OUT_OF_OFFICE")
    .map((pair) => (
      <Pair
        updatePairInfo={updatePairInfo}
        onDelete={deletePair}
        pair={pair}
        key={pair.uuid}
      />
    ));
  const unpaired = pairs.find((p) => p.info === "UNPAIRED");
  const ooo = pairs.find((p) => p.info === "OUT_OF_OFFICE");

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:grid-rows-3">
          {activePairs}
        </div>
        <button
          data-cy="add-pair"
          onClick={addPair}
          className="flex items-center m-2"
        >
          <CirclePlus />
          <span className="mx-2 text-lg text-gray">Add Pair</span>
        </button>
      </div>
      <div className="col-span-1">
        {unpaired && <ParkingLot unpaired={unpaired} />}
        {ooo && <OutOfOffice ooo={ooo} />}
      </div>
    </DragDropContext>
  );
};

export default PairGrid;
