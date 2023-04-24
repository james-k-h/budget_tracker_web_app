import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
  } from "@chakra-ui/react";


function AlertError() {
return (
    <Alert status="error">
    <AlertIcon />
    <AlertTitle>Error!</AlertTitle>
    <AlertDescription>Invalid input, please try again.</AlertDescription>
  </Alert>
)
}
export default AlertError;