import React, {  useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

import {
  GridItem,
  Grid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Box,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function NewCharts(props) {
  var _ = require("lodash");
  const [tax, setTax] = useState("");
  const [selectedBudget, setSelectedBudget] = useState(null);

  let nec = null;
  let want = null;
  let sdp = null;
  const budget_array = props.budget;

  for (const element of budget_array) {
    if (selectedBudget === element.title) {
      nec = element.necessities;
      want = element.wants;
      sdp = element.savings_debt_payments;
    }
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Budget Versus Expenses",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // map this dict and replace 0's with relevant values
  const month_dict_income = [
    { name: "January", total: 0 },
    { name: "February", total: 0 },
    { name: "March", total: 0 },
    { name: "April", total: 0 },
    { name: "May", total: 0 },
    { name: "June", total: 0 },
    { name: "July", total: 0 },
    { name: "August", total: 0 },
    { name: "September", total: 0 },
    { name: "October", total: 0 },
    { name: "November", total: 0 },
    { name: "December", total: 0 },
  ];
  const month_dict_expense = [
    { name: "January", total: 0 },
    { name: "February", total: 0 },
    { name: "March", total: 0 },
    { name: "April", total: 0 },
    { name: "May", total: 0 },
    { name: "June", total: 0 },
    { name: "July", total: 0 },
    { name: "August", total: 0 },
    { name: "September", total: 0 },
    { name: "October", total: 0 },
    { name: "November", total: 0 },
    { name: "December", total: 0 },
  ];

  const income_dict = props.data2.map((item, index) => {
    for (var element of month_dict_income) {
      if (item.name === element.name) {
        element.total =
          _.round((item.total * (100 - tax)) / 100, 2) + element.total;
      } else {
        continue;
      }
    }
  });
  const expense_dict = props.data1.map((item, index) => {
    for (var element of month_dict_expense) {
      if (item.name === element.name) {
        element.total = item.total + element.total;
      } else {
        continue;
      }
    }
  });
  let budget_options = budget_array.map((item) => (
    <option key={item.title}>{item.title}</option>
  ));
  const handleBudgetChange = (event) => {
    setSelectedBudget(event.target.value);
    console.log(selectedBudget);
  };

  const _data = {
    labels,
    datasets: [
      {
        label: "After Tax Budget",
        data: month_dict_income.map((item, index) => item.total),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: month_dict_expense.map((item, index) => item.total),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const pie_options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Budget % Breakdown",
      },
    },
  };
  const pie_options_expense = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Total Expenses By Type ($)",
      },
    },
  };

  const pie_data = {
    labels: ["Necessities", "Wants", "Savings and Debt Payments"],
    datasets: [
      {
        label: "% of Budget",
        data: [nec, want, sdp],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const pie_data_expense = {
    labels: props.total_expense_type.map((item) => item.name),
    datasets: [
      {
        label: "Expenses By Type",
        data: props.total_expense_type.map((item) => item.total),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  let budget_after_tax = props.data2.map((item) => (item.total * tax) / 100);


  return (
    <>
      <Box>
        <form>
          <FormControl>
            <FormLabel margin={2} htmlFor="allocation" fontWeight="bold">
              Select a Budget Allocation:
            </FormLabel>
            <Select
              color="grey"
              backgroundColor="white"
              margin={2}
              placeholder="Select an allocation by title"
              onChange={handleBudgetChange}
              width="40%"
            >
              {budget_options}
            </Select>
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
              width="75px"
              onChange={(evt) => setTax(evt.target.value)}
            />
          </FormControl>
        </form>
      </Box>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={2}
      >
        <GridItem justifyContent="center" rowSpan={1} colSpan={2}>
          <Bar options={options} data={_data} />
        </GridItem>
        <GridItem py={2} rowSpan={1} colSpan={1}>
          <Pie data={pie_data} options={pie_options} />
        </GridItem>
        <GridItem py={2} rowSpan={1} colSpan={1}>
          <Pie data={pie_data_expense} options={pie_options_expense} />
        </GridItem>
        <GridItem py={2} rowSpan={1} colSpan={1}>
          <Text color='grey'>Income By Month</Text>
          <TableContainer>
            <Table color='grey' variant="simple">
              <TableCaption>Income By Month</TableCaption>
              <Thead>
                <Tr>
                  <Th>Month</Th>
                  <Th>Amount ($)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Jan</Td>
                  <Td>$ {month_dict_income[0].total}</Td>
                </Tr>
                <Tr>
                  <Td>Feb</Td>
                  <Td>$ {month_dict_income[1].total}</Td>
                </Tr>
                <Tr>
                  <Td>Mar</Td>
                  <Td>$ {month_dict_income[2].total}</Td>
                </Tr>
                <Tr>
                  <Td>Apr</Td>
                  <Td>$ {month_dict_income[3].total}</Td>
                </Tr>
                <Tr>
                  <Td>May</Td>
                  <Td>$ {month_dict_income[4].total}</Td>
                </Tr>
                <Tr>
                  <Td>June</Td>
                  <Td>$ {month_dict_income[5].total}</Td>
                </Tr>
                <Tr>
                  <Td>July</Td>
                  <Td>$ {month_dict_income[6].total}</Td>
                </Tr>
                <Tr>
                  <Td>Aug</Td>
                  <Td>$ {month_dict_income[7].total}</Td>
                </Tr>
                <Tr>
                  <Td>Sept</Td>
                  <Td>$ {month_dict_income[8].total}</Td>
                </Tr>
                <Tr>
                  <Td>Oct</Td>
                  <Td>$ {month_dict_income[9].total}</Td>
                </Tr>
                <Tr>
                  <Td>Nov</Td>
                  <Td>$ {month_dict_income[10].total}</Td>
                </Tr>
                <Tr>
                  <Td>Dec</Td>
                  <Td>$ {month_dict_income[11].total}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
        <GridItem py={2} rowSpan={1} colSpan={1}>
        <TableContainer>
        <Text color='grey'>Expense By Month</Text>
            <Table color='grey' variant="simple">
              <TableCaption>Expense By Month</TableCaption>
              <Thead>
                <Tr>
                  <Th>Month</Th>
                  <Th>Amount ($)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Jan</Td>
                  <Td>$ {month_dict_expense[0].total}</Td>
                </Tr>
                <Tr>
                  <Td>Feb</Td>
                  <Td>${month_dict_expense[1].total}</Td>
                </Tr>
                <Tr>
                  <Td>Mar</Td>
                  <Td>$ {month_dict_expense[2].total}</Td>
                </Tr>
                <Tr>
                  <Td>Apr</Td>
                  <Td>$ {month_dict_expense[3].total}</Td>
                </Tr>
                <Tr>
                  <Td>May</Td>
                  <Td>$ {month_dict_expense[4].total}</Td>
                </Tr>
                <Tr>
                  <Td>June</Td>
                  <Td>$ {month_dict_expense[5].total}</Td>
                </Tr>
                <Tr>
                  <Td>July</Td>
                  <Td>$ {month_dict_expense[6].total}</Td>
                </Tr>
                <Tr>
                  <Td>Aug</Td>
                  <Td>$ {month_dict_expense[7].total}</Td>
                </Tr>
                <Tr>
                  <Td>Sept</Td>
                  <Td>$ {month_dict_expense[8].total}</Td>
                </Tr>
                <Tr>
                  <Td>Oct</Td>
                  <Td>$ {month_dict_expense[9].total}</Td>
                </Tr>
                <Tr>
                  <Td>Nov</Td>
                  <Td>$ {month_dict_expense[10].total}</Td>
                </Tr>
                <Tr>
                  <Td>Dec</Td>
                  <Td>$ {month_dict_expense[11].total}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </GridItem>
      </Grid>
    </>
  );
}
export default NewCharts;
