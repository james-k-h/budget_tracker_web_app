import FullScreenSection from "../FullScreenSection";
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

function IncomeForm(props) {
  //validate this data entry, floating point numbers, strings etc
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [income, setIncome] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [token] = useCookies(["mr-token"]);
  const [showAlertError, setShowAlertError] = useState(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);

  const new_user = props.user[0];

  useEffect(() => {
    console.log(props.user.id);
    setSubject(props.inc.subject);
    setDescription(props.inc.description);
    setIncome(props.inc.income);
    setDate(props.inc.date);
    setUser(new_user.id);
  }, [props.inc]);

  function data_validation(subj, desc, inc_amo, new_date) {
    if (subj.length < 1) {
      return false;
    }
    if (desc.length < 1) {
      return false;
    }
    if (inc_amo < 0.01) {
      return false;
    } if (new_date == '') {
      return false;
    }else {
      return true;
    }
  }

  const updateClicked = () => {
    if (data_validation(subject, description, income, date) === true) {
      API.updateIncome(
        props.inc.id,
        { subject, description, income, date, user },
        token["mr-token"]
      )
        .then((resp) => props.updatedIncome(resp))
        .catch((error) => console.log(error));
      setShowAlertError(false);
      setShowAlertSuccess(true);
    } else {
      setShowAlertError(true);
      setShowAlertSuccess(false);
    }
  };

  const createClicked = () => {
    if (data_validation(subject, description, income, date) === true) {
      API.createIncome(
        { subject, description, income, date, user },
        token["mr-token"]
      )
        .then((resp) => props.incomeCreated(resp))
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
      {showAlertError && (
<AlertError />
      )}
      {showAlertSuccess && (
<AlertSuccess />
      )}
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
            <FormLabel htmlFor="income_amount">Amount ($)</FormLabel>
            <Input
              id="income"
              type="number"
              placeholder="Income Amount"
              value={income}
              onChange={(evt) => setIncome(evt.target.value)}
            />
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

export default IncomeForm;
