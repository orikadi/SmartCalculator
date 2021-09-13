
import React, { Component } from 'react';

export class Calculator extends Component {
    static displayName = Calculator.name;

    constructor(props) {
        super(props);
        this.state = { num1: '', num2: '', op: '+', total:'', isUpdate: false, operations: [], history: [], entryLoadedID: '' };
    }

    componentDidMount() {
        this.getOperations();
        this.populateHistoryData();
    }

    //get operations from server
    getOperations = () => {
        fetch('/Calculator/GetOperations', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ operations: data });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("error while getting information from server");
            });

    }

    //handle submit button click
    handleSubmit = () => {
        if (!this.state.isUpdate) {
             this.create()
        }
        else {
             this.update()
        }
        
    }

    //populate history list with data from db
    populateHistoryData = () => {
        fetch('/Calculator/PopulateHistory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                this.setState({history: data});
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("error while getting information from server");
            });

    }

    //check if current state inputs are valid and display message if not
    isValid = () => {
        var num1 = this.state.num1;
        var num2 = this.state.num2;
        var op = this.state.op;
        if (isNaN(num1) || isNaN(num2)) {
            alert("please input numbers");
            return false;
        }
        else if (num2 == 0 && op == '/') {
            alert("cant divide by zero");
            return false;
        }
        return true;
    }

    //send data to server and save to db, populate result box with response
    create = () => {
        if (this.isValid())
        {
            var num1 = this.state.num1;
            var num2 = this.state.num2;
            var op = this.state.op;
            const data = { num1: parseFloat(num1), op: op, num2: parseFloat(num2) };
            fetch('/Calculator/Create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ total: data });
                    document.getElementById("result").innerHTML = this.state.total;
                    this.populateHistoryData();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("error while getting information from server");
                });
        }
    }

    //send entry id to server and update entry
    update = () => {
        if (this.isValid()) {
            var num1 = this.state.num1;
            var num2 = this.state.num2;
            var op = this.state.op;
            const data = { num1: parseFloat(num1), op: op, num2: parseFloat(num2) };
            fetch('/Calculator/Update/' + this.state.entryLoadedID, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.validID) {
                        this.setState({ total: data.result });
                        document.getElementById("result").innerHTML = this.state.total;
                    }
                    else {
                        alert("Problem with entry ID");
                    }
                    this.populateHistoryData();
                    
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("error while getting information from server");
                });
            this.setState({
                isUpdate: false,
                entryLoadedID: ''
            })
        }
    }

    //operators state handlers
    handlenum1 = (event) => {
        this.setState({
            num1: event.target.value
        })
    }
    handlenum2 = (event) => {
        this.setState({          
            num2: event.target.value
        })
    }
    handleop = (event) => {
        this.setState({
            op: event.target.value
        })
    }

    //update states to handle update mode
    handleUpdate = (entry, event) => {
        this.setState({
            isUpdate: true,
            num1: entry.num1,
            num2: entry.num2,
            op: entry.op,
            entryLoadedID: entry.id
        })
    }

    //delete entry in server
    handleDelete = (entry, event) => {
        this.setState({ isUpdate: false, entryLoadedID: entry.id })
        fetch('/Calculator/Delete/' + entry.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (!data)
                    alert("Couldnt delete the entry");
                this.populateHistoryData();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert("error while getting information from server");
            });
    }
 

    render() {
        return (
            <div>
                <h1>Calculator</h1>
                <input type='text' id="num1" name="num1" value={this.state.num1} onChange={this.handlenum1} />
                <select name="operations" id="operations" value={this.state.op} onChange={this.handleop} >
                    {this.state.operations.map((entry) => (
                        <option>{ entry } </option>   
                    ))}

                </select>
                <input type='text' id="num2" name="num2" value={this.state.num2} onChange={this.handlenum2} />
                    =
                <output type='text' id="result" name="result" value={this.state.total} />
                <div><button type="submit" onClick={this.handleSubmit} > Calculate </button></div>
                <tbody>
                    {this.state.history.map((entry) => (
                        <tr>
                            <td> {entry.num1}</td>
                            <td> {entry.op}</td>
                            <td> {entry.num2}</td>
                            <td> = </td>
                            <td> {entry.result}</td>
                            <td> <button type="button" onClick={this.handleUpdate.bind(this, entry)}> Update </button> </td>
                            <td> <button type="button" onClick={this.handleDelete.bind(this, entry)}> Delete </button> </td>
                        </tr>

                    ))}
                </tbody>
                
            </div>

        );
    }
}