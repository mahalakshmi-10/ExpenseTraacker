import React, { Component } from 'react'
import Table from 'react-bootstrap/esm/Table';

interface TransProps {
    transData: Array<ITrans>
}

interface ITrans {
    transDate :any;
    amount: number;
    type: string
}

export default class TransationTable extends Component<TransProps> {
    render() {
        const { transData } = this.props;
        const tableData = transData && transData.map((item, index) => {
            return <tr key = {index}>
                <td>{index + 1}</td>
                <td>{item.transDate}</td>
                <td>{item.amount}</td>
                <td>{item.type}</td>
            </tr>
        })
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>S:No</th>
                            <th>Transaction Time</th>
                            <th>Amount</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData} 
                    </tbody>
                </Table>
            </div>
        )
    }
}
