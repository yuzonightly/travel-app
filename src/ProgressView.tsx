import React, { useEffect, useRef, useState } from "react";
import { Framework } from "./models/framework";
import FrameworksList from "./components/FrameworksList";
import { LinearProgress, Box, Typography, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

type typeDictCounter = { [name: string]: number };
type typeDictCheckbox = { [id: number]: boolean };

const ProgressView: React.FC = () => {
  const [frameworks, setFrameworks] = useState([] as Framework[]);
  const checkboxRef = useRef({} as typeDictCheckbox);
  const [completedCounter, setCompletedCounter] = useState(0);
  const [categoryCounter, setCategoryCounter] = useState({} as typeDictCounter);
  const [progressBar, setProgressBar] = useState(0);
  const categories = ["Frontend", "Backend", "Mobile"];
  const [tabValue, setTabValue] = React.useState("1");

  const data = [
    {
      id: 1,
      name: "React",
      category: "Frontend",
      completed: true,
    },
    {
      id: 2,
      name: "AngularJS",
      category: "Frontend",
      completed: true,
    },
    {
      id: 3,
      name: "Angular 2",
      category: "Frontend",
      completed: true,
    },
    {
      id: 4,
      name: "PHP",
      category: "Backend",
      completed: true,
    },
    {
      id: 5,
      name: "Java Spring",
      category: "Backend",
      completed: false,
    },
    {
      id: 6,
      name: "NodeJS",
      category: "Backend",
      completed: false,
    },
    {
      id: 7,
      name: "Ionic",
      category: "Mobile",
      completed: false,
    },
    {
      id: 8,
      name: "Android",
      category: "Mobile",
      completed: false,
    },
  ];

  useEffect(() => {
    setFrameworks(data);
    const dictCheckbox = {} as typeDictCheckbox;
    data.forEach((f) => {
      dictCheckbox[f.id] = f.completed;
    });
    checkboxRef.current = dictCheckbox;
    console.log(checkboxRef.current);
    const completedFrameworks = data.filter(({ completed }) => completed === true).length;
    setCompletedCounter(completedFrameworks);
  }, []);

  useEffect(() => {
    const normalized = (completedCounter * 100) / frameworks.length;
    setProgressBar(normalized);
  }, [completedCounter]);

  useEffect(() => {
    const catDict: { [name: string]: number } = {};
    data.forEach((f) => {
      let offset = 0;
      if (f.completed === true) {
        offset = 1;
      }
      if (isNaN(catDict[f.category])) {
        catDict[f.category] = offset;
      } else {
        catDict[f.category] = catDict[f.category] + offset;
      }
    });
    setCategoryCounter(catDict);
  }, []);

  const handleFrameworkCompletion = (event: React.ChangeEvent<HTMLInputElement>) => {
    let category = "";
    const newFrameworks = [...frameworks];
    const newCheckboxState = { ...checkboxRef.current };
    newFrameworks.map((f) => {
      if (f.name === event.target.name) {
        category = f.category;
        const newFw = {
          ...f,
          completed: event.target.checked,
        };
        newCheckboxState[f.id] = event.target.checked;
        return newFw;
      }
    });
    checkboxRef.current = newCheckboxState;
    setFrameworks(newFrameworks);

    let offset = -1;
    if (event.target.checked) {
      offset = 1;
    }

    setCompletedCounter(completedCounter + offset);

    setCategoryCounter({
      ...categoryCounter,
      [category]: categoryCounter[category] + offset,
    });
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div>
      <Typography align="center" variant="h5">
        {completedCounter} courses completed out of {frameworks.length}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progressBar} />
      </Box>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={tabValue}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange} aria-label="frameworks">
              <Tab label="by category" value="1" />
              <Tab label="show all" value="2" />
            </TabList>
          </Box>

          <TabPanel value="1">
            {frameworks &&
              categories.map((category: string, index: number) => {
                const frameworksFilter = frameworks.filter((f) => f.category === category);
                return (
                  <FrameworksList
                    key={index}
                    frameworks={frameworksFilter}
                    handleFrameworkCompletion={handleFrameworkCompletion}
                    categoryCounter={categoryCounter[category]}
                    checkboxRef={checkboxRef.current}
                  />
                );
              })}
          </TabPanel>
          <TabPanel value="2">
            {frameworks && (
              <FrameworksList
                frameworks={frameworks}
                handleFrameworkCompletion={handleFrameworkCompletion}
                categoryCounter={completedCounter}
                checkboxRef={checkboxRef.current}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ProgressView;
