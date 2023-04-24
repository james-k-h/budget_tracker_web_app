import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import {
  FormControl,
  Button,
  FormLabel,
  Input,
  Box,
  Textarea,
  Select,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";

function ExpenseForm(props) {
  //validate this data entry, floating point numbers, strings etc
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const [date, setDate] = useState("");
  const [expense_type, setExpenseType] = useState("");
  const [user, setUser] = useState("");
  const [token] = useCookies(["mr-token"]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const new_user = props.user[0];

  const select_options = ["necessities", "wants", "savings and debt payments"];

  useEffect(() => {
    setSubject(props.inc.subject);
    setDescription(props.inc.description);
    setExpense(props.inc.expense);
    setDate(props.inc.date);
    setUser(new_user.id);
    setExpenseType(props.inc.expense_type);
  }, [props.inc]);

  function data_validation(subj, desc, exp_amo, new_date) {
    if (subj.length < 1) {
      return false;
    }
    if (desc.length < 1) {
      return false;
    }
    if (exp_amo < 0.01) {
      return false;
    } if (new_date == '') {
      return false;
    }
    else {
      return true;
    }
  }

  const updateClicked = () => {
    if (data_validation(subject, description, expense, date) === true) {
      API.updateExpense(
        props.inc.id,
        { subject, description, expense, date, user, expense_type },
        token["mr-token"]
      )
        .then((resp) => props.updatedExpense(resp))
        .catch((error) => console.log(error));
      setShowAlertError(false);
      setShowAlertSuccess(true);
    } else {
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };

  const createClicked = () => {
    if (data_validation(subject, description, expense, date) === true) {
      API.createExpense(
        { subject, description, expense, date, user, expense_type },
        token["mr-token"]
      )
        .then((resp) => props.expenseCreated(resp))
        .catch((error) => console.log(error));
      setShowAlertError(false);
      setShowAlertSuccess(true);
    } else {
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };

  const isDisabled = subject.length === 0 || description.length === 0;

  return (
    <Box
      maxWidth="85%"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      backgroundColor="white"
      justifyContent="right"
      alignItems="right"
      borderColor="grey"
      color="grey"
      px={2}
      margin={2}
    >
      {showAlertError && <AlertError />}
      {showAlertSuccess && <AlertSuccess />}
      {props.inc ? (
        <form>
          <FormControl justifyContent="right" alignItems="right">
            <FormLabel htmlFor="subject">Subject</FormLabel>
            <Input
              id="subject"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(evt) => setSubject(evt.target.value)}
            />
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(evt) => setDate(evt.target.value)}
            />
            <FormLabel htmlFor="expense_amount">Amount ($)</FormLabel>
            <Input
              id="expense"
              type="number"
              placeholder="Expense Amount"
              value={expense}
              onChange={(evt) => setExpense(evt.target.value)}
            />
            <FormLabel htmlFor="expense_type">Select an Expense Type</FormLabel>
            <Select onChange={(evt) => setExpenseType(evt.target.value)}>
              <option value="NEC">Necessities</option>
              <option value="WNT">Wants</option>
              <option value="SDP">Savings and debt payments</option>
            </Select>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              type="text"
              placeholder="Description"
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
            />
            {props.inc.id ? (
              <Button
                colorScheme="grey"
                color="grey"
                onClick={updateClicked}
                disabled={isDisabled}
              >
                Update
              </Button>
            ) : (
              <Button
                colorScheme="grey"
                onClick={createClicked}
                disabled={isDisabled}
                color="grey"
              >
                Create
              </Button>
            )}
          </FormControl>
        </form>
      ) : null}
    </Box>
  );
}

export default ExpenseForm;
