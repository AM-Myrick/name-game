import React, { Component } from 'react';
import axios from 'axios';
import Employee from '../Models/Employee';

axios.defaults.baseURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:9001"
      : "https://nameless-cliffs-24621.herokuapp.com";

interface INameGameProps {
    gameMode: string
    numOfResults?: number
  }
export default class NameGame extends Component<INameGameProps> {
    constructor(props: any) {
      super(props);
      this.state = {
        answer: '',
        selectedEmployees: []
      };
    }

    async componentDidMount() {
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
            console.log(response)
            const { answer, selectedEmployees } = response.data;
            this.setState({ answer, selectedEmployees })
        }
    }

    render() {
        return (
            <h1>Hello World!</h1>
        )
    }
}