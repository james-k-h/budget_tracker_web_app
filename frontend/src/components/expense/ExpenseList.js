import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from '../../api-service';
import { useCookies } from 'react-cookie';
import { HStack, Heading, Text, VStack, Box } from '@chakra-ui/react';


function ExpenseList(props) {
  const [token] = useCookies(['mr-token']);

  const expenseClicked = inc => evt => {
      props.expenseClicked(inc)
  }
  const editClicked = inc => {
    props.editClicked(inc);
  }
  const removeClicked = inc => {
    API.deleteExpense(inc.id, token['mr-token'])
      .then(() => props.removeClicked(inc))
      .catch(error=> console.log())
  }

  return (
      <>
        { props.expense && props.expense.map( inc => {
          return (
            <VStack
            key={inc.id}
            spacing={4}
            justifyContent='left'
            alignItems='left'
            margin={2}
            color='grey'
            >
              <Heading 
              justifyContent='left'
               onClick={expenseClicked(inc)}>{inc.subject}</Heading>
              <HStack spacing={4}>
              <Text>Date: {inc.date}</Text>
              <Text>Amount: ${inc.expense}</Text>
              <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(inc)}/>
              <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(inc)}/>
              </HStack>
            </VStack>
          )
        })}
        </>
  )
}


export default ExpenseList;