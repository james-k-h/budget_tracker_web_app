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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useFetchExpense } from "../hooks/useFetchExpense";
import ExpenseForm from "../components/expense/ExpenseForm";
import ExpenseDetails from "../components/expense/ExpenseDetails";
import ExpenseList from "../components/expense/ExpenseList";
import { useFetchUser } from "../hooks/useFetchUser";
import HeaderExpense from "../components/header/HeaderExpense";
import ExpenseFooter from "../components/footer/ExpenseFooter";

function ExpenseView() {
  const [expense, setExpense] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [editedExpense, setEditedExpense] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [___data, ___loading, ___error] = useFetchExpense();
  const [_data, _loading, _error] = useFetchUser();
  const [user, setUser] = useState([]);


  useEffect(() => {
    setUser(_data);
  }, [_data]);

  useEffect(() => {
    setExpense(___data);
    console.log(expense)
  }, [___data]);

  useEffect(() => {
    if (!token["mr-token"]) window.location.href = "/";
  }, [token]);


  const loadExpense = (inc) => {
    setSelectedExpense(inc);
    setEditedExpense(null);
  };
  const editClicked = (inc) => {
    setEditedExpense(inc);
    setSelectedExpense(null);
  };

  // problem
  const updatedExpense = (inco) => {
    const newExpense = expense.map((inc) => {
      if (inc.id === inco.id) {
        return inco;
      }
      return inc;
    });
    setExpense(newExpense);
  };

  const newExpense = () => {
    setEditedExpense({
      title: "",
      description: "",
      subject: "",
    });
    setSelectedExpense(null);
  };

  const expenseCreated = (inc) => {
    const newExpense = [...expense, inc];
    setExpense(newExpense);
  };
  const removeClicked = (inc) => {
    const newExpense = expense.filter((inco) => inco.id !== inc.id);
    setExpense(newExpense);
  };
  const logoutUser = () => {
    deleteToken(["mr-token"]);
  };

  if (___loading) return <h1>Loading...</h1>;
  if (___error) return <h1>Error loading expense details</h1>;

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
            <HeaderExpense logoutUser={logoutUser} />
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
                <Link href="/budget" textDecoration={"none"} fontWeight="bold">
                  Budget
                </Link>
              </VStack>
            </nav>
          </GridItem>
          <GridItem pl="2" bg="blackAlpha.800" area={"main"}>
            <HStack spacing={8}>
              <Button
                justifyContent="right"
                margin={2}
                onClick={newExpense}
                color="grey"
              >
                Add an expense
              </Button>
            </HStack>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <ExpenseList
                  expense={expense}
                  expenseClicked={loadExpense}
                  editClicked={editClicked}
                  removeClicked={removeClicked}
                  user={user}
                />
              </GridItem>
              <GridItem>
                <Heading
                  width="100%"
                  as="h4"
                  px={32}
                  margin={4}
                  alignItems="right"
                >
                  Details
                </Heading>
                <ExpenseDetails
                  inc={selectedExpense}
                  updateExpense={loadExpense}
                  user={user}
                />
                {editedExpense ? (
                  <ExpenseForm
                    inc={editedExpense}
                    updatedExpense={updatedExpense}
                    expenseCreated={expenseCreated}
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

export default ExpenseView;
