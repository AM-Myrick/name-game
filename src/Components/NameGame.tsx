import React, { Component } from 'react';
import axios from 'axios';
import Employee from '../Models/Employee';

export default class NameGame extends Component {
    constructor(props: any) {
      super(props);
      this.state = {
        answer: '',
        selectedEmployees: []
      };
    }

    async componentDidMount() {
        const response = await axios.get('https://willowtreeapps.com/api/v1.0/profiles/');
        const allEmployees: Employee[] = response.data;
        const numOfOptions = 5;
        let selectedEmployees: Employee[] = [];

        while (selectedEmployees.length < numOfOptions) {
            const randomEmployee: Employee = allEmployees[Math.floor(Math.random() * allEmployees.length)];
            const isNotSelected = selectedEmployees.some(employee => employee.id !== randomEmployee.id);
            selectedEmployees.length === 0 ? selectedEmployees.push(randomEmployee) : null;

            if (isNotSelected) {
                selectedEmployees.push(randomEmployee);
            }
        }
        
        const selectedEmployee: Employee = selectedEmployees[Math.floor(Math.random() * selectedEmployees.length)];
        const answer = `${selectedEmployee.firstName} ${selectedEmployee.lastName}`;
        this.setState({ answer, selectedEmployees })
    }

    render() {
        return (
            <h1>Hello World!</h1>
        )
    }
}