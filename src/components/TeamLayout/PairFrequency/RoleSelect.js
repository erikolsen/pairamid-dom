import React from "react";

const RoleSelect = ({ roles, label, selected, onSelect }) => {
  const options = roles.map((role) => (
    <option key={role.id} value={role.name}>
      {role.name}
    </option>
  ));
  return (
    <label className="py-2 pr-2">
      {label}:
      <select
        className="bg-white"
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">ALL</option>
        {options}
      </select>
    </label>
  );
};

export default RoleSelect;
