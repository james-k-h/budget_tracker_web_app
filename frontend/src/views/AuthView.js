import { ChakraProvider} from "@chakra-ui/react";
import Auth from "../components/auth/auth";



function AuthView() {


  
    return (
      <ChakraProvider >
          <main>
            <Auth />
          </main>
      </ChakraProvider>
    );
  }
  
  export default AuthView;
