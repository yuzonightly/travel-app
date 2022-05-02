import React from "react";
import { FormControl, FormLabel, FormGroup } from "@mui/material";
import { Framework } from "../models/framework";
import FrameworkListItem from "./FrameworkListItem";

type handleFrameworkCompletion = (event: React.ChangeEvent<HTMLInputElement>) => void;
type typeDictCheckbox = { [id: number]: boolean };

export interface FrameworksListProps {
  frameworks: Framework[];
  handleFrameworkCompletion: handleFrameworkCompletion;
  categoryCounter: number;
  checkboxRef: typeDictCheckbox;
}

const FrameworksList: React.FC<FrameworksListProps> = ({
  frameworks,
  handleFrameworkCompletion,
  categoryCounter,
  checkboxRef,
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
              checkboxRef={checkboxRef}
            />
          ))}
      </FormGroup>
    </FormControl>
  );
};

export default FrameworksList;
