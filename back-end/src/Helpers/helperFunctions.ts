import axios from "axios";
import Employee from "../Models/Employee";

// shuffle function for use when numOfOptions > length of requested employees
const shuffleArray = (array: Employee[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// access api and get all employees
export const getAllEmployees = async () => {
  try {
    const allEmployees: Employee[] = [];
    const response = await axios.get(
      "https://willowtreeapps.com/api/v1.0/profiles/"
    );
    response.data = response.data.filter((employee: Employee) =>
      employee.headshot.hasOwnProperty("url")
    );
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
  return employees.filter(
    (employee) =>
      employee.firstName === "Matthew" || employee.firstName === "Matt"
  );
};

// return array of current employees
export const getCurrentEmployees = (employees: Employee[]) => {
  return employees.filter((employee) => employee.hasOwnProperty("jobTitle"));
};

// return array of random employees
export const getRandomEmployees = (
  numOfOptions: number,
  employees: Employee[]
) => {
  if (numOfOptions > employees.length) {
    return shuffleArray(employees);
  }
  // using a set to ensure no duplicate results
  const selectedEmployees: Set<Employee> = new Set();

  while (selectedEmployees.size < numOfOptions) {
    // store a random employee
    const randomEmployee: Employee =
      employees[Math.floor(Math.random() * employees.length)];

    selectedEmployees.add(randomEmployee);
  }
  return Array.from(selectedEmployees);
};

export const getAnswer = (employees: Employee[]) => {
  const selectedEmployee: Employee =
    employees[Math.floor(Math.random() * employees.length)];
  return `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
};

export const sendError = (res: any, err: any, message: string) => {
  res.status(404).json({ err, message });
};

export const sendSuccess = (
  res: any,
  selectedEmployees: Employee[],
  answer: string
) => {
  res.status(200).json({ selectedEmployees, answer });
};
