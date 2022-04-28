import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { Framework } from "../models/framework";

type handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface FrameworkListItemProps {
  framework: Framework;
  index: number;
  handleFrameworkCompletion: handleCheckbox;
}

const FrameworkListItem: React.FC<FrameworkListItemProps> = ({
  framework,
  index,
  handleFrameworkCompletion,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(framework.completed);
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
