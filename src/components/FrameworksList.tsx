import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, FormGroup } from "@mui/material";
import { Framework } from "../models/framework";
import FrameworkListItem from "./FrameworkListItem";

type handleFrameworkCompletion = (event: React.ChangeEvent<HTMLInputElement>) => void;

export interface FrameworksListProps {
  frameworks: Framework[];
  handleFrameworkCompletion: handleFrameworkCompletion;
  categoryCounter: number;
}

const FrameworksList: React.FC<FrameworksListProps> = ({
  frameworks,
  handleFrameworkCompletion,
  categoryCounter,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        {frameworks[0]?.category} {categoryCounter}/{frameworks?.length}
      </FormLabel>
      <FormGroup>
        {frameworks &&
          frameworks.map((framework: Framework, index: number) => (
            <FrameworkListItem
              key={framework.id}
              framework={framework}
              index={index}
              handleFrameworkCompletion={handleFrameworkCompletion}
            />
          ))}
      </FormGroup>
    </FormControl>
  );
};

export default FrameworksList;
