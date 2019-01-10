import React, {Component} from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './App.css';

import Form from "./Components/Form";
import Table from "./Components/Table";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "material-ui/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Button from "@material-ui/core/Button/Button";



class App extends Component {

    state = {
        data: [],
        open: false
    };

    componentDidMount() {
        this.recheckOrderBook();
        this.recheckBalance();
    }

    handleClose = () => {
        this.setState({open: false});
    };

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
            Form.getBalance(Form.user);
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
          if(Form.balance < this.state.data[i].amountDollar) {
            this.setState({open:true})
          }
        this.setState(state => ({
            data: state.data.filter((row, j) => j !== i)
        }));

    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="App">
                    <div>{this.insufficientBal()}</div>
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

    insufficientBal() {
        if (this.state.open === true) {
            return (
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        // disableBackdropClick={true}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Error</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                You have insufficient balance to make this transaction
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={e => {
                                this.handleClose();
                                // this.saveUser(e.target.value);
                            }} color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }


}

export default App;
