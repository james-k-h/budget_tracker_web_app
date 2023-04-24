import {Box, Button, Flex, HStack} from "@chakra-ui/react";


const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({top:0, behavior: 'smooth'});
  }

  return (
    <Box >
      <footer>
          <HStack spacing={4}>
          <p>James • © 2023</p>
          <Button backgroundColor='blue.300' color='white' borderColor='white' borderRadius={2} borderWidth={2}
          height='29px'
          onClick={scrollToTop}>Navigate Top</Button>
          </HStack>
      </footer>
    </Box>
  );
};
export default Footer;