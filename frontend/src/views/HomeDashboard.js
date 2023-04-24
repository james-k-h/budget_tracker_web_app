import {
  ChakraProvider,
  VStack,
  Grid,
  GridItem,
  Link,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import Header from "./../components/header/Header";
import { useCookies } from "react-cookie";
import { useFetchExpense } from "../hooks/useFetchExpense";
import { useFetchBudget } from "../hooks/useFetchBudget";
import { useFetchIncome } from "../hooks/useFetchIncome";
import { useFetchUser } from "../hooks/useFetchUser";
import groupBy from "lodash/groupBy";
import sumBy from "lodash/sumBy";
import { format } from "date-fns";

import NewCharts from "../variables/NewCharts";

function HomeDashboard() {
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [expense, setExpense] = useState([]);
  const [income, setIncome] = useState([]);
  const [budget, setBudget] = useState([]);
  const [user, setUser] = useState([]);
  const [___data, ___loading, ___error] = useFetchExpense();
  const [_data, _loading, _error] = useFetchUser();
  const [__data, __loading, __error] = useFetchBudget();
  const [data, loading, error] = useFetchIncome();

  var _ = require("lodash");

  useEffect(() => {
    setUser(_data);
  }, [_data]);

  useEffect(() => {
    setExpense(___data);
  }, [___data]);

  useEffect(() => {
    setBudget(__data);
  }, [__data]);

  useEffect(() => {
    setIncome(data);
  }, [data]);

  // aggregate by month for income and expense

  const groups_income = groupBy(income, (entry) => {
    return format(new Date(entry.date), "LLLL");
  });
  const months_income = Object.entries(groups_income).map((entry) => {
    const [key, values] = entry;
    return {
      name: key,
      total: _.round(sumBy(values, "income"), 2),
    };
  });
  const groups_expense = groupBy(expense, (entry) => {
    return format(new Date(entry.date), "LLLL");
  });
  const months_expense = Object.entries(groups_expense).map((entry) => {
    const [key, values] = entry;
    return {
      name: key,
      total: _.round(sumBy(values, "expense"), 2),
    };
  });
  const groups_expense_type = groupBy(expense, (entry) => {
    return entry.expense_type;
  });
  let _expense = months_expense;
  let _income = months_income;
  const total_expense_type = Object.entries(groups_expense_type).map(
    (entry) => {
      const [key, values] = entry;
      return {
        name: key,
        total: _.round(sumBy(values, "expense"), 2),
      };
    }
  );

  function testing() {
    console.log(total_expense_type);
  }
  const logoutUser = () => {
    deleteToken(["mr-token"]);
  };
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
            <Header logoutUser={logoutUser} />
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"nav"}>
            <nav>
              <VStack spacing={12} py={20}>
                <Link href="/income" textDecoration={"none"} fontWeight="bold">
                  Income
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
            {/* <Home /> */}
            <NewCharts
              data1={_expense}
              data2={_income}
              budget={budget}
              total_expense_type={total_expense_type}
            />
          </GridItem>
          <GridItem pl="2" bg="blue.300" area={"footer"}>
            <Footer />
          </GridItem>
        </Grid>
      </main>
    </ChakraProvider>
  );
}

export default HomeDashboard;
