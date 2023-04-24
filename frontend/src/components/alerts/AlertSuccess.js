import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

function AlertSuccess() {
  return (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>Successful input.</AlertDescription>
    </Alert>
  );
}
export default AlertSuccess;
