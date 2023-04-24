import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Select,
  Input,
  FormControl,
  FormLabel,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";


function Budget(props) {
  var _ = require('lodash');
  const [selectedMonth, setSelectedMonth] = useState([]);
  const [tax, setTax] = useState("");

  const monthChangeHandler = (event) => {
    setSelectedMonth(event.target.value);
    console.log(props.months);
  };
  let options = props.months.map((item) => (
    <option key={item.name}>{item.name}</option>
  ));

  let amount = null;

  for (const element of props.months) {
    if (selectedMonth === element.name) {
      amount = element.total;
    }
  }

  const after_tax_inc = _.round((amount * (1 - tax / 100)), 2);

  
  let nec = null;
  let want = null;
  let sdp = null;

  let selectedBudg = props.selectedBudget
  let budgetArray = props.budget

  for (const element of budgetArray) {
      if (selectedBudg === element.title) {
        nec = element.necessities;
        want = element.wants;
        sdp = element.savings_debt_payments;
      }
    }


  let nec_after_tax = _.round((after_tax_inc * (1 - nec / 100)),2)
  let wants_after_tax = _.round((after_tax_inc * (want / 100)),2)
  let sdp_after_tax = _.round((after_tax_inc * (sdp / 100)),2)

  return (
    <>
      <Heading size="md" margin={1}>
        Monthly Breakdown
      </Heading>
      <form>
        <FormControl >
          <Select
            margin={1}
            backgroundColor="white"
            color="grey"
            placeholder="Select a month..."
            name="budget_month"
            onChange={monthChangeHandler}
          >
            {options}
          </Select>
          <Text margin={2}>Monthly Income: ${amount}</Text>

          <FormLabel margin={2} htmlFor="tax" fontWeight="bold">
            Income Tax (%): 
          </FormLabel>
          <Input
            id="tax_percentage"
            backgroundColor="white"
            color="grey"
            placeholder="Enter an income tax percentage"
            value={tax}
            margin={2}
            onChange={(evt) => setTax(evt.target.value)}
          />
        </FormControl>
      </form>
      <Text margin={2}>
        Your After-tax Budget for {selectedMonth} is: ${after_tax_inc}
      </Text>
      <br/>
      <Text margin={1}>
        According to your allocation, you have the following amounts available:{" "}
      </Text>
      <VStack text-align='left'>
        <Text>Necessities: ${nec_after_tax}</Text>
        <Text>Wants: ${wants_after_tax}</Text>
        <Text>Savings and Debt Payments: ${sdp_after_tax}</Text>
      </VStack>
    </>
  );
}

export default Budget;
