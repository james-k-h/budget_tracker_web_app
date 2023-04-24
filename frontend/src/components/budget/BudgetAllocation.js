import { Select, Text, VStack } from "@chakra-ui/react";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCookies } from 'react-cookie';
import { API } from '../../api-service';


function BudgetAllocation(props) {
  const [token] = useCookies(['mr-token']);

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

      const editClicked = selectedBudg => {
        props.editClicked(selectedBudg);
      }
      const removeClicked = selectedBudg => {
        API.deleteBudget(selectedBudg.id, token['mr-token'])
          .then(() => props.removeClicked(selectedBudg))
          .catch(error=> console.log())
      }

    return (
        <>
        <VStack>
            <Text>Necessities: {nec}%</Text>
            <Text>Wants: {want}%</Text>
            <Text>Savings and Debt Payments: {sdp}%</Text>
        </VStack>
        {/* <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(selectedBudg)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(selectedBudg)}/> */}
        
        
        </>
    )
}

export default BudgetAllocation;