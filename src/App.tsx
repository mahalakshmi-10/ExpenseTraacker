import React, { Component } from 'react'
import './App.css';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import TransationTable from './TransationTable';

//Type Script Initialization
interface IState {
  amount: number
  totalbalance: number
  errorMsg: string
  transData: Array<ITrans>
}

interface ITrans {
  transDate:any;
  amount: any;
  type: string;
}

interface IProps {

}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      amount: 0,
      totalbalance: 550,
      errorMsg: "",
      transData: [],
    }
  }

   componentDidMount(){
    let transTable =  localStorage.getItem("transTable");
    if(transTable){
      let transactions = JSON.parse(transTable);
      this.setState({transData:transactions.length > 0 ? transactions : []});
    }
  }

// Add or subtraction calulation & Insert Table Functionality
  addAmount = (type: string) => {
    let { totalbalance, amount, transData } = this.state;
    const addvalue = +amount;
    const valueCheck = ((amount > totalbalance) && type === "sub") ? false : true;
    if (+amount > 0 && valueCheck) {
      const amountValue = type === "add" ? (totalbalance + addvalue) : (totalbalance - addvalue);
     let today = new Date();
      let obj = { transDate:today.toString(), amount: addvalue, type: type === "sub" ? "Remove" : "Add" };
      transData.push(obj);
      localStorage.setItem("transTable", JSON.stringify(transData));
      this.setState({ totalbalance: amountValue, transData,amount:0 })
    }
    else {
      this.formValid(type)
    }
  }

// Amount & Total Balance validation
  formValid = (type: string) => {
    const { amount, totalbalance } = this.state
    const errorMsg = (amount <= 0) ? "Amount must be greater than zero" :
      ((+amount > totalbalance) && type === "sub") ? "Amount must be less than Total amount" : "";
    this.setState({ errorMsg, amount: errorMsg.length > 0 ? amount : 0 })
  }

//Set the Amount value in handle Change functionality
  getAmount = (e: any) => {
    const { value } = e.target;
    this.setState({ amount: value, errorMsg: "" })
  }

  render() {
    const { totalbalance, amount, errorMsg, transData } = this.state;
  
    return (
      <Container>
         <Form.Label>EXPENSES TRACKER</Form.Label>
        <Row>
          <Col sm={4}><Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Balance Amount - {totalbalance}</Form.Label>
            <Form.Control type="amount" placeholder="Enter the Amount" value={amount} onChange={this.getAmount} required/>
            <Form.Control.Feedback type="invalid">
           {errorMsg}
            </Form.Control.Feedback>
            {errorMsg.length > 0 && <p>{errorMsg}</p>}
          </Form.Group></Col>

        </Row>
        <Row>
          <Col sm={3}><Button variant="primary" type="button" onClick={() => this.addAmount("add")}>
            Add 
            </Button></Col>
          <Col sm={3}><Button variant="primary" type="button" onClick={() => this.addAmount("sub")}>
            Remove
            </Button></Col>
        </Row>

       {transData.length > 0 && <Row>
          <TransationTable transData = {transData} />
        </Row>}
      </Container>

    )
  }
}

export default App;
