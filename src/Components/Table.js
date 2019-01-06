import React from "react";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from "material-ui/Table";
import Button from "@material-ui/core/Button/Button";

const keys = ["id", "seller", "coinSymbol", "amountCoin", "amountDollar"];

function addButton(k,remove,i) {
    if (k==="amountDollar") {
        return <Button variant="contained" color = "primary" onClick={() => remove(i)}> Buy </Button>
    }
}

const row = (x, i, header,remove) =>
    <TableRow key={`tr-${i}`}>
        {header.map((y, k) =>
            <TableRowColumn key={`trc-${k}`}>
                {x[keys[k]]}
                {addButton(keys[k],remove,i)}
            </TableRowColumn>,

        )}

    </TableRow>;

export default ({ data, header, remove }) =>
    <Table>
        <TableHeader>
            <TableRow>
                {header.map((x, i) =>
                    <TableHeaderColumn key={`thc-${i}`}>
                        {x.name}
                    </TableHeaderColumn>
                )}
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.map((x, i) => row(x, i, header,remove))}
        </TableBody>
    </Table>;
