import React, { useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import UserList from "./UserList";

const tagColor = (days) => {
  switch (true) {
    case days === 0:
      return "white";
    case days === 1 || days === 2:
      return "green";
    case days === 3 || days === 4:
      return "yellow";
    default:
      return "red";
  }
};

const Pair = ({ pair, updatePairInfo, onDelete }) => {
  if (!pair) {
    return null;
  }
  const [text, setText] = useState(pair.info);
  useEffect(() => {
    if (pair.info !== text) {
      setText(pair.info);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pair.info]);
  return (
    <div className="bg-white shadow-lg rounded-lg flex">
      <div
        className={`bg-${tagColor(pair.streak)} w-2 rounded-lg rounded-r-none`}
      ></div>
      <Droppable droppableId={pair.uuid} direction="horizontal">
        {(provided, _) => {
          return (
            <div
              data-cy="active-pair"
              className="flex flex-col justify-between h-full w-full"
            >
              <div
                className="flex flex-row flex-wrap relative"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <UserList pair={pair} onDelete={onDelete} />
                <div className="h-12 mr-2">{provided.placeholder}</div>
              </div>
              <div className="m-2 grid grid-cols-4">
                <p className="text-xs flex items-center col-span-1">
                  Day {pair.streak}
                </p>
                <input
                  onBlur={() => updatePairInfo(text, pair.uuid)}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Working on..."
                  className="px-2 border border-gray-light text-right col-span-3"
                  type="text"
                  value={text}
                />
              </div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Pair;
