
import styles from '../styles/Home.module.css'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {Avatar, Button, chakra, Flex, HStack, 
    VStack, Text, MenuButton, Menu, MenuList, MenuItem,
     MenuDivider, useColorModeValue, Heading, useDisclosure, RadioGroup,
      Stack, Drawer, DrawerOverlay, DrawerContent, DrawerHeader,DrawerBody,
       Box, Icon} from '@chakra-ui/react'
import {BsFillMenuAppFill} from 'react-icons/bs'
import {FcHome, FcAddDatabase} from 'react-icons/fc'
import {IoIosArrowBack} from 'react-icons/io'
import {FcViewDetails} from 'react-icons/fc'
import {getCookie, getCookies} from 'cookies-next'

const NavBar = () => {

    const router = useRouter()
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [placement, setPlacement] = useState('left')
    
    const token = getCookie('JWT')
    
    const logOut = () =>{
        //const token =cookieCutter.get('jwtCookie')
        //const token = cookieCutter.get('JWT')
        console.log(token)
        // Delete a cookie
        cookieCutter.set('jwtCookie', '', { expires: new Date(0) })
        router.push('/')
    }
    const handleClickCrearProducto = ()=>{
        router.push('/products/create')
    }
    const handleClickEdit = ()=>{
        router.push('/products/edit')
    }
    const handleClickHome = ()=>{
        router.push('/home')
    }

    const getProfile = async() =>{
        console.log(token)
        await axios.get(`${process.env.NEXT_PUBLIC_BASIC_BACKEND_URL}/user/profile`)
        .then((res) =>{
            console.log(res)
        })
        .catch((error) => console.log(error))
    }

    
    return(
        <chakra.header id='header'>
            <Flex bg={useColorModeValue('gray.200', 'gray.600')} w='100%' px='2' py='1' align='center' justify='space-between'  >
                
                <Button variant='nav' fontSize='1.5rem' children={<BsFillMenuAppFill/>} onClick={onOpen}></Button>
                <Heading> Inventory app</Heading>
                <Flex alignItems='center'>
                    <Menu>
                        <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }} >
                            <HStack>
                                <Avatar size='sm' />
                                <VStack display={{base:'none', md:'flex'}} alignItems='flex-start' spacing='1px' ml='2' >
                                    <Text fontSize='sm'> Enzo Marin</Text>
                                    <Text fontSize='xs'> Admin</Text>

                                </VStack>

                            </HStack>
                        </MenuButton>
                        <MenuList bg={useColorModeValue('white', 'gray.900')} borderColor={useColorModeValue('gray.200', 'gray.700')}>
                            <MenuItem onClick={getProfile}>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={logOut}>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
                <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay/>
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>
                            Menu
                        </DrawerHeader>
                        <DrawerBody>


                            <VStack spacing={'5px'}  >

                                <Button bgColor={useColorModeValue('gray.100', 'gray.900')} rounded='6' w='full' h='40px' align='center'  cursor='pointer' onClick={handleClickHome}>
                                    
                                    <Icon m='4' fontSize='16'_groupHover={{color: 'white',}} as={FcHome}></Icon>
                                    <p>Home</p>
                                    <Icon fontSize='16' marginLeft='auto' as={IoIosArrowBack}/>
                                    
                                </Button>
                                <Button bgColor={useColorModeValue('gray.100', 'gray.900')} rounded='6' w='full' h='40px' align='center' cursor='pointer' >
                                    <Icon m='4' fontSize='16'_groupHover={{color: 'white',}} ></Icon>
                                    <p>Venta</p>
                                    <Icon fontSize='16' marginLeft='auto' as={IoIosArrowBack}/>
                                </Button>

                                <Button bgColor={useColorModeValue('gray.100', 'gray.900')} rounded='6'  w='full' h='40px' align='center' cursor='pointer' onClick={handleClickCrearProducto}>
                                    <Icon m='4' fontSize='16'_groupHover={{color: 'white',}} as={FcAddDatabase} ></Icon>
                                    <p>Agregar Producto</p>
                                    <Icon fontSize='16' marginLeft='auto' as={IoIosArrowBack}/>
                                </Button>

                                <Button bgColor={useColorModeValue('gray.100', 'gray.900')} rounded='6'  w='full' h='40px' align='center' cursor='pointer' >
                                    <Icon m='4' fontSize='16'_groupHover={{color: 'white',}} ></Icon>
                                    <p>Editar Producto</p>
                                    <Icon fontSize='16' marginLeft='auto' as={IoIosArrowBack}/>
                                </Button>

                                <Button bgColor={useColorModeValue('gray.100', 'gray.900')} rounded='6'  w='full' h='40px' align='center' cursor='pointer' onClick={() => router.push('/products/inventory')}>
                                    <Icon m='4' fontSize='16'_groupHover={{color: 'white',}} as={FcViewDetails}></Icon>
                                    <p>Inventario</p>
                                    <Icon fontSize='16' marginLeft='auto' as={IoIosArrowBack}/>
                                </Button>

                            

                            </VStack>


                        </DrawerBody>
                    </DrawerContent>

                </Drawer>
            </Flex>

        </chakra.header>
    )
}

export default NavBar