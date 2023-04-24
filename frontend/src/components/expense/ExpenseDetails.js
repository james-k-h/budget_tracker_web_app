import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { VStack, Heading, Text } from "@chakra-ui/react";

function ExpenseDetails(props) {
  const [token] = useCookies(["mr-token"]);

  let inc = props.inc;


  const getDetails = () => {
    fetch(`http://127.0.0.1:8000/api/expense/${inc.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token["mr-token"]}`,
      },
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateExpense(resp))
      .catch((error) => console.log(error));
  };



  return (
    <>
      {inc ? (
        <VStack
        justifyContent='right'
        width='90%'
        color='grey'>
          <Heading as='h5' size='md'>{inc.subject}</Heading>
          <Text>Date: {inc.date}</Text>
          <Text>Amount: ${inc.expense}</Text>
          {/* <Text>Expense Type: {inc.expense_type}
          </Text> */}
          <Text>Description: {inc.description}</Text>
        </VStack>
      ) : null}
    </>
  );
}

export default ExpenseDetails;