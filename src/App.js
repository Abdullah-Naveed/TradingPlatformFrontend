import React, {Component} from 'react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import './App.css';

import Form from "./Components/Form";
import Table from "./Components/Table";


class App extends Component {
    state = {
        data: []
    };

    remove = i => {
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
