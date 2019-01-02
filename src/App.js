import React, {Component} from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './App.css';

import Form from "./Components/Form";
import Table from "./Components/Table";


class App extends Component {

    static user = "";

    state = {
        data: []
    };

    remove = i => {
        console.log("removed");
        console.log(this.state.data[i]);
        console.log(App.user);
        fetch('http://localhost:8761/user/buy', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.data[i].id,
                seller: this.state.data[i].inputname,
                buyer: App.user,
                coinSymbol: this.state.data[i].coin,
                amountDollar: this.state.data[i].value,
                amountCoin: this.state.data[i].quantity,
            })
        });
        this.setState(state => ({
            data: state.data.filter((row, j) => j !== i)
        }));
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <Form
                        onSubmit={submission =>
                            this.setState({
                                data: [...this.state.data, submission]
                            })}
                    />
                    <Table
                        remove={this.remove}
                        data={this.state.data}
                        header={[
                            {
                                name: "ID",
                                prop: "id"
                            },
                            {
                                name: "Username",
                                prop: "username"
                            },
                            {
                                name: "Coin",
                                prop: "coin"
                            },
                            {
                                name: "Quantity",
                                prop: "quantity"
                            },
                            {
                                name: "Value",
                                prop: "value"
                            }
                        ]}
                    />
                </div>
            </MuiThemeProvider>
        );
    }

}

export default App;
