import React, { useState, useEffect } from "react";
import { API } from "../../api-service";
import { useCookies } from "react-cookie";
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import FullScreenSection from "../FullScreenSection";
import budget_bg from "../../assets/budget.jpg";

function Auth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginView, setIsLoginView] = useState(true);

  const [token, setToken] = useCookies(["mr-token"]);

  useEffect(() => {
    if (token["mr-token"]) window.location.href = "/home";
  }, [token]);

  const loginClicked = () => {
    API.loginUser({ username, password })
      .then((resp) => setToken("mr-token", resp.token))
      .catch((error) => console.log(error));
  };
  const registerClicked = () => {
    API.registerUser({ username, password })
      .then(() => loginClicked())
      .catch((error) => console.log(error));
  };
  const isDisabled = username.length === 0 || password.length === 0;

  return (
    <FullScreenSection
      backgroundColor="black"
      color="whitesmoke"
      backgroundImage={budget_bg}
      width="100%"
      justifyContent="center"
      fontWeight="bold"
      textAlign="center"
      //   minWidth='max-content'
    >
      <Box
        p={8}
        maxWidth="300px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        backgroundColor="#2c2a2a"
        justifyContent="center"
        alignItems="center"
        borderColor="grey"
      >
        <Box>
          <Heading
            size="md"
            textAlign="center"
            fontWeight="bold"
          >
            {isLoginView ? (
              <Heading size="md">Budget Tracker - Login</Heading>
            ) : (
              <Heading size="md">Budget Tracker - Register</Heading>
            )}
          </Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <FormControl>
              <FormLabel textAlign="center" htmlFor="username">
                Username
              </FormLabel>
              <Input
                textAlign="center"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(evt) => setUsername(evt.target.value)}
                maxWidth="275px"
              />
            </FormControl>
            <FormControl>
              <FormLabel textAlign="center" htmlFor="password" >
                Password
              </FormLabel>
              <Input
                id="password"
                textAlign="center"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                maxWidth="275px"
              />
            </FormControl>
            <VStack spacing={2}>
              {isLoginView ? (
                <Button
                  colorScheme="whiteAlpha"
                  onClick={loginClicked}
                  disabled={isDisabled}
                >
                  Login
                </Button>
              ) : (
                <Button
                  colorScheme="whiteAlpha"
                  onClick={registerClicked}
                  disabled={isDisabled}
                >
                  Register
                </Button>
              )}

              {isLoginView ? (
                <Button
                  colorScheme="whiteAlpha"
                  className="login_button"
                  onClick={() => setIsLoginView(false)}
                >
                  No account? Register here!
                </Button>
              ) : (
                <Button
                  colorScheme="whiteAlpha"
                  onClick={() => setIsLoginView(true)}
                >
                  Have an account? Login here
                </Button>
              )}
            </VStack>
          </form>
        </Box>
      </Box>
    </FullScreenSection>
  );
}

export default Auth;
