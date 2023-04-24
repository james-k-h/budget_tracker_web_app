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
import { useFetchIncome } from "../hooks/useFetchIncome";
import IncomeForm from "../components/income/IncomeForm";
import IncomeDetails from "../components/income/IncomeDetails";
import IncomeList from "../components/income/IncomeList";
import { useFetchUser } from "../hooks/useFetchUser";
import HeaderIncome from "../components/header/HeaderIncome";
import IncomeFooter from "../components/footer/IncomeFooter";

function IncomeView() {
  const [income, setIncome] = useState([]);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [editedIncome, setEditedIncome] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [data, loading, error] = useFetchIncome();
  const [_data, _loading, _error] = useFetchUser();
  const [user, setUser] = useState([]);


  useEffect(() => {
    setUser(_data);
  }, [_data]);

  useEffect(() => {
    setIncome(data);
  }, [data]);

  useEffect(() => {
    if (!token["mr-token"]) window.location.href = "/";
  }, [token]);


  const loadIncome = (inc) => {
    setSelectedIncome(inc);
    setEditedIncome(null);
  };
  const editClicked = (inc) => {
    setEditedIncome(inc);
    setSelectedIncome(null);
  };

  const updatedIncome = (inco) => {
    const newIncome = income.map((inc) => {
      if (inc.id === inco.id) {
        return inco;
      }
      return inc;
    });
    setIncome(newIncome);
  };

  const newIncome = () => {
    setEditedIncome({
      title: "",
      description: "",
      subject: "",
    });
    setSelectedIncome(null);
  };

  const incomeCreated = (inc) => {
    const newIncome = [...income, inc];
    setIncome(newIncome);
  };
  const removeClicked = (inc) => {
    const newIncome = income.filter((inco) => inco.id !== inc.id);
    setIncome(newIncome);
  };
  const logoutUser = () => {
    deleteToken(["mr-token"]);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading income details</h1>;

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
            <HeaderIncome logoutUser={logoutUser} />
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"nav"}>
            <nav>
              <VStack spacing={12} py={20}>
                <Link href="/home" textDecoration={"none"} fontWeight="bold">
                  Dashboard
                </Link>
                <Link href="/expense" textDecoration={"none"} fontWeight="bold">
                  Expense
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
                onClick={newIncome}
                color="grey"
              >
                Add an income source
              </Button>
            </HStack>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem>
                <IncomeList
                  income={income}
                  incomeClicked={loadIncome}
                  editClicked={editClicked}
                  removeClicked={removeClicked}
                  user={user}
                />
              </GridItem>
              <GridItem>
                <Heading
                  width="100%"
                  as="h4"
                  px={44}
                  margin={4}
                  alignItems="right"
                >
                  Details
                </Heading>
                <IncomeDetails
                  inc={selectedIncome}
                  updateIncome={loadIncome}
                  user={user}
                />
                {editedIncome ? (
                  <IncomeForm
                    inc={editedIncome}
                    updatedIncome={updatedIncome}
                    incomeCreated={incomeCreated}
                    user={user}
                  />
                ) : null}
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"footer"}>
            <IncomeFooter />
          </GridItem>
        </Grid>
      </main>
    </ChakraProvider>
  );
}

export default IncomeView;
