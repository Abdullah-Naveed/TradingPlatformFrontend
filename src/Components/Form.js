import React from "react";
import TextField from "material-ui/TextField";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Timer from 'react-timer-mixin';


export default class Form extends React.Component {
    componentDidMount() {
        // Timer.setInterval(() => {
        //     this.currentPrice()
        // }, 2000)
    }

    state = {
        username: "",
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

    onSubmit = e => {
        e.preventDefault();
        this.props.onSubmit(this.state);
        this.setState({
            username: "",
            coin: "",
            quantity: "",
            value: 1
        });
    };


    render() {


        return (
            <form>
                <TextField
                    name="username"
                    floatingLabelText="Username"
                    value={this.state.username}
                    onChange={e => this.change(e)}
                    floatingLabelFixed
                />
                <br/>
                <FormControl>
                    <InputLabel>Coin</InputLabel>
                    <Select
                        value={this.state.coin}
                        onClose={this.currentPrice()}
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


}
