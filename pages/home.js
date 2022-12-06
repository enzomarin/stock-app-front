import { Center, Divider, Flex, Heading, Wrap, WrapItem } from "@chakra-ui/react";
import NavBar from "../components/navBar";


export default function Home(){

    return(
        <>
            <NavBar></NavBar>
            <Flex direction='column' height='100vh' width='100vw' alignItems='flex-start' justifyContent='center'>
                <Heading>Dashboard</Heading>
                <Wrap p={10} bgColor='whiteAlpha.100' spacing='20px' >
                    <WrapItem rounded={6} bgColor={'blue.400'}>
                        <Center w='180px' h='180px'>
                            Venta
                        </Center>
                    </WrapItem>

                    <WrapItem rounded={6} bgColor={'red.400'}>
                        <Center w='180px' h='180px'>
                            Agregar Producto
                        </Center>
                    </WrapItem>

                    <WrapItem rounded={6} bgColor={'green.400'}>
                        <Center w='180px' h='180px'>
                            Editar Producto
                        </Center>
                    </WrapItem>

                    <WrapItem rounded={6} bgColor={'orange.400'}>
                        <Center w='180px' h='180px'>
                            Inventario
                        </Center>
                    </WrapItem>

                    <WrapItem rounded={6} bgColor={'purple.400'}>
                        <Center w='180px' h='180px'>
                            Clientes
                        </Center>
                    </WrapItem>
                    
                

                    
                </Wrap>
            
            </Flex>
        </>
    )
}