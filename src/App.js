import React, {Component} from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './App.css';

import Form from "./Components/Form";
import Table from "./Components/Table";



class App extends Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.recheckOrderBook();
        this.recheckBalance();
    }

    recheckOrderBook = () => {
        setInterval(() => {
            fetch('http://localhost:8761/orderbook/transactions').then((response) => {
                response.json().then((response2) => {
                    let transactions = response2.sortedTransactions;
                    this.setState({
                        data: transactions
                    });
                })
            })
        },2000);
    };

    recheckBalance = () => {
        setInterval(() => {
            Form.getBalance(Form.user)
        },2000);
    }

    remove = i => {
        fetch('http://localhost:8761/user/buy', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.data[i].id,
                seller: this.state.data[i].seller,
                buyer: Form.user,
                coinSymbol: this.state.data[i].coinSymbol,
                amountDollar: this.state.data[i].amountDollar,
                amountCoin: this.state.data[i].amountCoin,
            })
        }).then(() => Form.getBalance(Form.user));
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
