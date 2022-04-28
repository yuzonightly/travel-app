import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Framework } from "../models/framework";

type handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => void;
type typeDictCheckbox = { [id: number]: boolean };

export interface FrameworkListItemProps {
  framework: Framework;
  index: number;
  handleFrameworkCompletion: handleCheckbox;
  checkboxRef: typeDictCheckbox;
}

const FrameworkListItem: React.FC<FrameworkListItemProps> = ({
  framework,
  index,
  handleFrameworkCompletion,
  checkboxRef
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checkboxRef[framework.id]);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    handleFrameworkCompletion(e);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={isChecked} onChange={handleChange} name={framework.name} />}
      label={framework.name}
    />
  );
};

export default FrameworkListItem;
