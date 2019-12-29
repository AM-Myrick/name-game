import axios from "axios";
import Employee from "../Models/Employee";

// access api and get all employees
export const getAllEmployees = async () => {
  try {
    const allEmployees: Employee[] = [];
    const response = await axios.get("https://willowtreeapps.com/api/v1.0/profiles/");
    allEmployees.push(...response.data);
    return allEmployees;
  } catch (err) {
    if (err && err.response) {
      return err.response.data;
    }
  }
};

// return array of employees named Matt or Matthew
export const getMatEmployees = (employees: Employee[]) => {
  return employees.filter((employee) => employee.firstName === "Matthew" || employee.firstName === "Matt");
};

// return array of current employees
export const getCurrentEmployees = (employees: Employee[]) => {
  return employees.filter((employee) => employee.hasOwnProperty("jobTitle"));
};

// return array of random employees
export const getRandomEmployees = (numOfOptions: number, employees: Employee[]) => {
  const selectedEmployees: Employee[] = [];

  while (selectedEmployees.length < numOfOptions) {
    // store a random employee and ensure they haven't already been added to selectedEmployees
    const randomEmployee: Employee = employees[Math.floor(Math.random() * employees.length)];
    const isNotSelected = selectedEmployees.some((employee) => employee.id !== randomEmployee.id);

    if (selectedEmployees.length === 0 || isNotSelected) {
      selectedEmployees.push(randomEmployee);
    }
  }
  return selectedEmployees;
};

export const getAnswer = (employees: Employee[]) => {
  const selectedEmployee: Employee = employees[Math.floor(Math.random() * employees.length)];
  return `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
};

export const sendError = (res: any, err: any, message: string) => {
  res.status(404).json({
    data: { err, message }
  });
};

export const sendSuccess = (res: any, selectedEmployees: Employee[], answer: string) => {
  res.status(200).json({
    data: { selectedEmployees, answer }
  });
};
