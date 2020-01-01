import React, { Component } from 'react';
import axios from 'axios';
import Employee from '../Models/Employee';
import Box from '@material-ui/core/Box';
import EmployeeCard from './EmployeeCard';
import Typography from '@material-ui/core/Typography';

axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9001"
      : "https://nameless-cliffs-24621.herokuapp.com";

interface INameGameProps {
    gameMode: string
    numOfResults?: number
}

interface INameGameState {
    answer: string
    selectedEmployees: Employee[]
}

export default class NameGame extends Component<INameGameProps, INameGameState> {
    public constructor(props: any) {
      super(props);
      this.state = {
        answer: '',
        selectedEmployees: []
      };
    }

    async componentDidMount() {
        this.getData();
    }

    async getData() {
        let response;
        switch(this.props.gameMode) {
            case 'all':
                response = await axios.get(`/api/all-employees/5`);
                break;
            case 'current':
                response = await axios.get(`/api/current-employees/5`);
                break;
            case 'mat':
                response = await axios.get(`/api/mat-employees/5`);
                break;
        }
        if (response) {
            const { answer, selectedEmployees } = response.data;
            this.setState({ answer, selectedEmployees })
        }
    }

    render() {
        return (
            <Box>
                <Typography variant="h4">
                    {`Who is ${this.state.answer}?`}
                </Typography>
                {this.state.selectedEmployees.map((employee: Employee) =>
                    <EmployeeCard key={employee.id}
                        employee={employee}
                        answer={this.state.answer}
                        startNextRound={this.getData.bind(this)}
                    />
                )}
            </Box>
        )
    }
}