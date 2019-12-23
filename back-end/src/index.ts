import cors from "cors";
import express from "express";
import helmet from "helmet";
import { getAllEmployees, getAnswer, getCurrentEmployees, getMatEmployees, getRandomEmployees } from "./Helpers/helperFunctions";
import Employee from "./Models/Employee";
const port = process.env.PORT || 9001;

const server = express();
server.use(express.json());
server.use(cors());
server.use(helmet());

// sanity check route
server.get("/", async (req, res) => {
  const allEmployees: Employee[] = await getAllEmployees();

  res.status(200).json({
    api: allEmployees
  });
});

// returns all current and former employees
server.get("/api/all-employees/:options", async (req, res) => {
  const numOfOptions = parseInt(req.params.options, 10);
  const selectedEmployees: Employee[] = getRandomEmployees(numOfOptions, await getAllEmployees());
  const answer: string = getAnswer(selectedEmployees);

  res.status(200).json({
    data: { selectedEmployees, answer }
  });
});

// returns all current employees
server.get("/api/current-employees/:options", async (req, res) => {
  const numOfOptions = parseInt(req.params.options, 10);
  const selectedEmployees: Employee[] = getRandomEmployees(numOfOptions, getCurrentEmployees(await getAllEmployees()));
  const answer: string = getAnswer(selectedEmployees);

  res.status(200).json({
    data: { selectedEmployees, answer }
  });
});

// returns all employees named matt or matthew
server.get("/api/mat-employees/:options", async (req, res) => {
  const numOfOptions = parseInt(req.params.options, 10);
  const selectedEmployees: Employee[] = getRandomEmployees(numOfOptions, getMatEmployees(await getAllEmployees()));
  const answer: string = getAnswer(selectedEmployees);

  res.status(200).json({
    data: { selectedEmployees, answer }
  });
});

server.listen(port);
