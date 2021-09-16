import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";
import RoleSelect from "./RoleSelect";
import useDateRangePicker from "./useDateRangePicker";
import FrequencyTable from "./FrequencyTable";

const PairFrequency = () => {
  const { teamId } = useParams();
  const [roles, setRoles] = useState([]);

  const [primary, setPrimary] = useState();
  const [secondary, setSecondary] = useState();
  const [CalendarToggle, CalendarZone, startDate, endDate] =
    useDateRangePicker();

  useEffect(() => {
    console.log("here");
    axios.get(`${API_URL}/team/${teamId}/roles`).then((response) => {
      setRoles(response.data);
    });
  }, []);

  return (
    <main className="bg-gray-light col-span-7 p-2 lg:p-12 h-full">
      <section>
        <header className="border-b-2 border-gray-border items-baseline mb-4">
          <div className="md:flex md:flex-wrap justify-between ">
            <div className="flex items-center">
              <p className="text-2xl font-bold">Pair Frequency</p>
            </div>
            <div>
              <CalendarToggle />
            </div>
          </div>
          <CalendarZone />
        </header>
        <div className="">
          <div className="my-4 md:justify-between md:flex">
            <form>
              <p className="text-xl font-bold mb-2">Compare Roles</p>
              <div className="flex justify-between">
                <RoleSelect
                  label="X Axis"
                  roles={roles}
                  onSelect={setSecondary}
                  selected={secondary}
                />
                <RoleSelect
                  label="Y Axis"
                  roles={roles}
                  onSelect={setPrimary}
                  selected={primary}
                />
              </div>
            </form>
            <div>
              <p className="text-xl font-bold text-center">Legend</p>
              <div className="grid grid-cols-4 text-center">
                <div className="bg-yellow p-2">Pair More</div>
                <div className="bg-green p-2">Just Right</div>
                <div className="bg-red p-2">Pair Less</div>
                <div className="bg-gray-med p-2">Solo</div>
              </div>
            </div>
          </div>
          <FrequencyTable
            startDate={startDate}
            endDate={endDate}
            primary={primary}
            secondary={secondary}
            roles={roles}
          />
        </div>
      </section>
    </main>
  );
};

export default PairFrequency;
