import {
  ChakraProvider,
  Button,
  VStack,
  Heading,
  Grid,
  GridItem,
  Link,
  HStack,
  Card,
  Input,
  Select,
  FormControl,
  Text
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Budget from "../components/budget/Budget";
import { useCookies } from "react-cookie";
import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchBudget } from "../hooks/useFetchBudget";
import { useFetchIncome } from "../hooks/useFetchIncome";
import HeaderBudget from "../components/header/HeaderBudget";
import ExpenseFooter from "../components/footer/ExpenseFooter";
import { format } from "date-fns";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import BudgetAllocation from "../components/budget/BudgetAllocation";
import BudgetForm from "../components/budget/BudgetForm";
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { API } from '../api-service';

function BudgetView() {
  const [income, setIncome] = useState([]);
  const [budget, setBudget] = useState([]);
  const [user, setUser] = useState([]);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [data, loading, error] = useFetchIncome();
  const [__data, __loading, __error] = useFetchBudget();
  const [_data, _loading, _error] = useFetchUser();
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [editedBudget, setEditedBudget] = useState(null);


  useEffect(() => {
    setUser(_data);
  }, [_data]);

  useEffect(() => {
    setBudget(__data);
  }, [__data]);

  useEffect(() => {
    setIncome(data);
  }, [data]);

  const logoutUser = () => {
    deleteToken(["mr-token"]);
  };
  // const loadBudget = (selectedBudget) => {
  //   setSelectedBudget(selectedBudget);
  //   setEditedBudget(null);
  // };
  const editClicked = (inc) => {
    setEditedBudget(inc);
    setSelectedBudget(null);
  };

  const handleBudgetChange = (event) => {
    setSelectedBudget(event.target.value);
    console.log(selectedBudget);
  };

 
  let options = budget.map((item) => (
    <option key={item.title}>{item.title}</option>
  ));

  // aggregate by month
  const groups = groupBy(income, (entry) => {
    return format(new Date(entry.date), "LLLL");
  });
  const months = Object.entries(groups).map((entry) => {
    const [key, values] = entry;
    return {
      name: key,
      total: sumBy(values, "income"),
    };
  });

  const newBudget = () => {
    setEditedBudget({
      title: "",
      description: "",
      subject: "",
    });
    setSelectedBudget(null);
  };
  const updatedBudget = (budg) => {
    const newBudget = budget.map((item) => {
      if (item.id === budg.id) {
        return budg;
      }
      return item;
    });
    setBudget(newBudget);
  };
  const budgetCreated = (item) => {
    const newBudget = [...budget, item];
    setBudget(newBudget);
  };
  // const removeClicked = selectedBudget => {
  //   API.deleteBudget(selectedBudget.id, token['mr-token'])
  //     .then(() => removeClicked(selectedBudget))
  //     .catch(error=> console.log())
  // }
  return (
    <ChakraProvider>
      <main>
        <Grid
          templateAreas={`"header header"
          "nav main"
          "nav footer"`}
          gridTemplateRows={"50px 1fr 30px"}
          gridTemplateColumns={"150px 1fr"}
          h="100%"
          gap="1"
          // color="blackAlpha.700"
          color="white"
          fontWeight="bold"
        >
          <GridItem pl="2" bg="blackAlpha.800" area={"header"}>
            <HeaderBudget logoutUser={logoutUser} />
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"nav"}>
            <nav>
              <VStack spacing={12} py={20}>
                <Link href="/home" textDecoration={"none"} fontWeight="bold">
                  Dashboard
                </Link>
                <Link href="/income" textDecoration={"none"} fontWeight="bold">
                  Income
                </Link>
                <Link href="/expense" textDecoration={"none"} fontWeight="bold">
                  Expense
                </Link>
              </VStack>
            </nav>
          </GridItem>
          <GridItem pl="2" bg="blackAlpha.800" area={"main"}>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              <GridItem>
                <Budget months={months} budget={budget} selectedBudget={selectedBudget} />
              </GridItem>
              <GridItem>
              <Heading size='md'
              textAlign='center'>Allocation Details</Heading>
              <form>
                <FormControl>
                <Select margin={2}
                placeholder='Select an allocation by title'
                color='grey'
                backgroundColor='white'
                onChange={handleBudgetChange}>
                  {options}
                </Select>
                </FormControl>
                </form>
                {/* <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(selectedBudget)}/>
            <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(selectedBudget)}/> */}
                <BudgetAllocation  editClicked={editClicked}
                selectedBudget={selectedBudget} budget={budget}/>
              </GridItem>
              <GridItem>
                <br/>
              <Button
                justifyContent="right"
                margin={2}
                onClick={newBudget}
                color="grey"
                px={8}
              >
                Create a Budget Allocation
              </Button>
              <Text textAlign='center'
              fontSize={10} margin={2}>The sum of the % Totals should equal and not exceed 100%</Text>
                {editedBudget ? (
                  <BudgetForm
                    inc={editedBudget}
                    updatedBudget={updatedBudget}
                    budgetCreated={budgetCreated}
                    user={user}
                  />
                ) : null}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"footer"}>
            <ExpenseFooter />
          </GridItem>
        </Grid>
      </main>
    </ChakraProvider>
  );
}

export default BudgetView;
