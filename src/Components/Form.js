import React from "react";
import TextField from "material-ui/TextField";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import Dialog from "@material-ui/core/Dialog/Dialog";







export default class Form extends React.Component {
    componentDidMount() {
        this.usernameInput();
    }


    handleClose = () => {

        if (this.state.inputname.toLowerCase() === "socketboy12" ||
            this.state.inputname.toLowerCase() === "rmi_king" ||
            this.state.inputname.toLowerCase() === "soap-lover17" ||
            this.state.inputname.toLowerCase() === "rest_is_the_best") {
            this.setState({open: false});
            this.setState({username: this.state.inputname})
        }
        this.setState({error: false});
    };

    logOut = () => {
       this.setState({open:true,username:"",inputname:""});
    };

    state = {
        open: true,
        error: false,
        username: "",
        inputname: "",
        coin: "BTC",
        quantity: "",
        value: "",
        price: ""
    };

    change = e => {
        this.setState({
            [e.target.name]: e.target.value
        });

    };

    login = e => {
        this.setState({inputname: e})
    };

    onSubmit = e => {
        e.preventDefault();
        if (this.state.value > 0) {
            this.props.onSubmit(this.state);
            this.setState({
                username: "",
                coin: "",
                quantity: "",
                value: 1
            });
        } else {
            this.setState({error: true})
        }
    };

    render() {
        return (
            <form>
                <div>{this.usernameInput()}</div>
                <div>{this.submitError()}</div>
                <div>{this.logoutButton()}</div>
                <TextField readOnly
                           name="username"
                           floatingLabelText="Username"
                           value={this.state.username}
                    // onChange={e => this.change(e)}
                           floatingLabelFixed
                />
                <br/>
                <FormControl>
                    <InputLabel>Coin</InputLabel>
                    <Select
                        value={this.state.coin}
                        onChange={e => this.change(e)}
                        inputProps={{
                            name: 'coin',
                            id: 'coin-id',
                        }}
                    >
                        <MenuItem value="ETH">ETH</MenuItem>
                        <MenuItem value="BTC">BTC</MenuItem>
                        <MenuItem value="TRX">TRX</MenuItem>
                        <MenuItem value="LTC">LTC</MenuItem>
                        <MenuItem value="BCH">BCH</MenuItem>
                        <MenuItem value="MIOTA">MIOTA</MenuItem>D
                        <MenuItem value="XRP">XRP</MenuItem>
                        <MenuItem value="XLM">XLM</MenuItem>
                    </Select>
                </FormControl>
                <br/>
                <TextField
                    name="quantity"
                    type="number"
                    required
                    hintText="Amount to Sell"
                    floatingLabelText="Quantity"
                    autoComplete="off"
                    value={this.state.quantity}
                    onChange={e => this.change(e)}
                    floatingLabelFixed
                />
                <br/>
                <TextField
                    name="value"
                    floatingLabelText="Value"
                    value={this.state.value = this.state.quantity * this.state.price}
                    onChange={e => this.change(e)}
                    floatingLabelFixed
                />
                <br/>
                <Button variant="contained" color="secondary"
                        onClick={e => this.onSubmit(e)}>
                    Sell
                </Button>
            </form>
        );
    }


    async currentPrice() {
        var result = await fetch('http://localhost:8761/cmc/coinInfo?coin=' + this.state.coin)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                return data.price
            });
        this.setState({price: result});
        return result
    }

    usernameInput() {
        if (this.state.open === true) {
            return (
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        disableBackdropClick={true}
                        aria-labelledby="form-dialog-title"
                    >
                        <DialogTitle id="form-dialog-title">Login</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please enter a valid username
                            </DialogContentText>
                            <TextField
                                autoFocus
                                margin="dense"
                                value={this.state.inputname}
                                onChange={e => this.login(e.target.value)}
                                label="Username"
                                fullWidth
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        this.handleClose()
                                    }
                                }
                                }
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Enter
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }

    logoutButton() {
        return(
            <div>
                <Button variant="contained"
                        onClick = {this.logOut}
                        style={this.pStyle}>
                    Log Out
                </Button>
            </div>



        )


    }

    pStyle = {
        position: 'absolute',
        top:0,
        right:0
    };


    submitError() {
        return (
            <div>
                <Dialog
                    open={this.state.error}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Error</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill in missing values
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


