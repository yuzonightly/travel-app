import React, { useEffect, useState } from "react";
import { Framework } from "./models/framework";
import FrameworksList from "./components/FrameworksList";
import { LinearProgress, Box, Typography } from "@mui/material";

type typeDict = { [name: string]: number };

const ProgressView: React.FC = () => {
  const [frameworks, setFrameworks] = useState([] as Framework[]);
  const [completedCounter, setCompletedCounter] = useState(0);
  const [categoryCounter, setCategoryCounter] = useState({} as typeDict);
  const [progressBar, setProgressBar] = useState(0);
  const categories = ["Frontend", "Backend", "Mobile"];

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
      console.log(catDict);
    });
    setCategoryCounter(catDict);
  }, []);

  // trash code, replace this
  const handleFrameworkCompletion = (event: React.ChangeEvent<HTMLInputElement>) => {
    let category = "";
    const newFrameworks = [...frameworks];
    newFrameworks.map((f) => {
      if (f.name === event.target.name) {
        category = f.category;
        const newFw = {
          ...f,
          completed: event.target.checked,
        };
        return newFw;
      }
    });
    setFrameworks(newFrameworks);

    let offset;
    if (event.target.checked) {
      offset = 1;
    } else {
      offset = -1;
    }
    setCompletedCounter(completedCounter + offset);

    setCategoryCounter({
      ...categoryCounter,
      [category]: categoryCounter[category] + offset,
    });
  };

  return (
    <div>
      <Typography align="center" variant="h5">
        {completedCounter} courses completed out of {frameworks.length}
      </Typography>
      <Box sx={{ width: "100%" }}>
        <LinearProgress variant="determinate" value={progressBar} />
      </Box>
      {frameworks &&
        categories.map((category: string, index: number) => {
          const frameworksFilter = frameworks.filter((f) => f.category === category);
          return (
            <FrameworksList
              key={index}
              frameworks={frameworksFilter}
              handleFrameworkCompletion={handleFrameworkCompletion}
              categoryCounter={categoryCounter[category]}
            />
          );
        })}
    </div>
  );
};

export default ProgressView;
