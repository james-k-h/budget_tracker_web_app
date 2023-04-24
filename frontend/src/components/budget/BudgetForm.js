import React, { useState, useEffect } from "react";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import {
  FormControl,
  Text,
  Button,
  FormLabel,
  Input,
  Box,
  Textarea,
} from "@chakra-ui/react";
import AlertSuccess from "../alerts/AlertSuccess";
import AlertError from "../alerts/AlertError";

function BudgetForm(props) {
  const [title, setTitle] = useState("");
  const [necessities, setNec] = useState("");
  const [wants, setWants] = useState("");
  const [savings_debt_payments, setSdp] = useState("");
  const [token] = useCookies(["mr-token"]);
  const [user, setUser] = useState("");
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const new_user = props.user[0];

  useEffect(() => {
    console.log(props.user.id);
    setTitle(props.inc.title);
    setNec(props.inc.necessities);
    setSdp(props.inc.savings_debt_payments);
    setWants(props.inc.wants);
    setUser(new_user.id);
  }, [props.inc]);

  function data_validation(title, necessities, savings_debt_payments, wants) {
    let sum_vals = Number(necessities) + Number(savings_debt_payments) + Number(wants);
    if (title.length < 1) {
      return false;
    }
    if (necessities < 0.01) {
      return false;
    }
    if (savings_debt_payments < 0.01) {
      return false;
    }
    if (wants < 0.01) {
      return false;
    }
    if (sum_vals != 100) {
      return false;
    } else {
      return true;
    }
  }
  const updateClicked = () => {
    if (
      data_validation(title, necessities, savings_debt_payments, wants) === true
    ) {
      API.updateBudget(
        props.inc.id,
        { title, necessities, savings_debt_payments, wants, user },
        token["mr-token"]
      )
        .then((resp) => props.updatedBudget(resp))
        .catch((error) => console.log(error));
      setShowAlertError(false);
      setShowAlertSuccess(true);
    } else {
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };
  const createClicked = () => {
    if (
      data_validation(title, necessities, savings_debt_payments, wants) === true
    ) {
      API.createBudget(
        { title, necessities, savings_debt_payments, wants, user },
        token["mr-token"]
      )
        .then((resp) => props.budgetCreated(resp))
        .catch((error) => console.log(error));
      setShowAlertError(false);
      setShowAlertSuccess(true);
    } else {
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };

  const isDisabled = title.length === 0;
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
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
            />
            <FormLabel htmlFor="nec">Necessities (%)</FormLabel>
            <Input
              id="nec"
              type="number"
              placeholder="Necessities"
              value={necessities}
              onChange={(evt) => setNec(evt.target.value)}
            />
            <FormLabel htmlFor="wants">Wants (%)</FormLabel>
            <Input
              id="wants"
              type="number"
              placeholder="Wants"
              value={wants}
              onChange={(evt) => setWants(evt.target.value)}
            />
            <FormLabel htmlFor="sdp">Savings and Debt Payments (%)</FormLabel>
            <Input
              id="sdp"
              type="number"
              placeholder="Savings and Debt Payments"
              value={savings_debt_payments}
              onChange={(evt) => setSdp(evt.target.value)}
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

export default BudgetForm;
