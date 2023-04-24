import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack, Link, Heading, Text } from "@chakra-ui/react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto: jkhdeveloper@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com",
  },

];

const Header = (props) => {

  

  const handleClick = (anchor) => () => {
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
    >
      <Box 
      >
        <HStack
        margin={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack spacing={4}>
              
              {socials.map((item, index) => {
                return (
                  <a
                    href={item.url}
                    key={item.url}
                    onClick={handleClick(item.icon)}
                  >
                    <FontAwesomeIcon icon={item.icon} size="2x" />
                  </a>
                );
              })}
            </HStack>
          </nav>
          <Heading size='lg'>
            Dashboard
        </Heading>
        <HStack justifyContent="right">
          <Text fontWeight="bold" margin={2} onClick={props.logoutUser}>
            Logout
          </Text>
          <FontAwesomeIcon icon={faSignOutAlt} onClick={props.logoutUser} />
        </HStack>
        </HStack>

      </Box>
    </Box>
  );
};
export default Header;