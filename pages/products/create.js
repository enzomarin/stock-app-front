
import { Box, Divider, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Stack, StackDivider, Switch, VStack, Text, Button, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react"
import NavBar from "../../components/navBar";
import { Flex } from "@chakra-ui/react";
const initialState = {name: '', price: 0}
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


function Create(){

    const [product, setProduct] = useState(initialState)
    const [products, setProducts] = useState([])
    const [enableInventory, setEnableInventory] = useState(true)
    const handleChange = (e) => { // recibimos un evento e
        const inputValue = e.target.value
        const inputName = e.target.name

        setProduct({...product, [inputName]: inputValue})
    }

    const handleClick = async (e) =>{
        e.preventDefault()

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
            const data = await res.json() // Convertir la respuesta a json para obtener el body
           
            console.log(data.producto);
            setProduct(initialState)
            
            // Agregamos el producto
            const newListProducts = [data.producto, ...products]
            //fetchProducts()
            setProducts(newListProducts)
        } catch (error) {
            console.log(error);
        }

    }
  

    const fetchProducts = () => {
        console.log("fetching de datos");
        fetch(`${baseUrl}/products`)
        .then(res => res.json())
        .then(({data}) =>{
            console.log(data)
            setProducts(data)
        })
    }
    // Obtenemos todos los productos 
    useEffect(() => {
        fetchProducts()
    }, []) // si le dejamos el arreglo de dependencia vacio solo se ejecuta una vez (cuando se renderiza el componente)

    

    return(
       <>
            <NavBar></NavBar>
            
            <Flex   justify='center' align='center'>
                
                <VStack bgColor={'gray.700'} justify='center' spacing={4}  h='100vh'  w='80vw' mt={10} p={2} rounded='5'>
                    <Heading size='md'>Agregar Nuevo Producto</Heading>
                    <InputGroup size='sm' alignItems='center'>
                        <InputLeftAddon rounded={5} children='Codigo de barras: '></InputLeftAddon>
                        <Input className="onone"  type='number' name="barCode" onChange={handleChange} value={product.barCode} placeholder='Codigo de barras'></Input>
                    </InputGroup>

                    <InputGroup size='sm' alignItems='center'>
                        <InputLeftAddon children='Nombre del producto: '></InputLeftAddon>
                        <Input className="onone"  type='text' name="name" onChange={handleChange} value={product.name} placeholder='Nombre del producto'></Input>
                    </InputGroup>

                    <InputGroup size='sm' alignItems='center'>
                        <InputLeftAddon children='Descripcion: '></InputLeftAddon>
                        <Input className="onone"  type='text' name="description" onChange={handleChange} value={product.description} placeholder='Descripcion'></Input>
                    </InputGroup>


                    <Divider orientation="horizontal"/>

                    <InputGroup size='sm' alignItems='center'>
                        <InputLeftAddon children='Precio Costo: '></InputLeftAddon>
                        <Input className="onone"  type='number' name="costPrice" onChange={handleChange} value={product.costPrice} placeholder='$'></Input>
                        <InputLeftAddon ml={5} children=' %  '></InputLeftAddon>
                        <Input className="onone"  type='number' name="porcentageProfit"  placeholder='% de ganancia'></Input>
                    </InputGroup>

                    <InputGroup size='sm' alignItems='center'>
                        <InputLeftAddon children='Precio: '></InputLeftAddon>
                        <Input className="onone"  type='number' name="price" onChange={handleChange} value={product.price} placeholder='$'></Input>
                    </InputGroup>

                    <InputGroup size='sm' alignItems='center'>
                        <InputLeftAddon children='Fecha de Vencimiento: '></InputLeftAddon>
                        <Input className="onone"  type='date' name="expirationDate" onChange={handleChange} value={product.expirationDate} placeholder='Fecha de vencimiento'></Input>
                    </InputGroup>
                    
                    <Divider orientation="horizontal"/>
            
                    <FormControl display='flex' alignItems='center'>
                        <FormLabel>Utiliza inventario?</FormLabel>
                        <Switch colorScheme='teal' onChange={() => {setEnableInventory( !enableInventory)}}/>
                    </FormControl>
                    <InputGroup  size='sm' alignItems='center'>
                        <InputLeftAddon children='Stock: '></InputLeftAddon>
                        <Input isDisabled={enableInventory} className="onone"  type='number' name="stock" onChange={handleChange} value={product.stock} placeholder='Cantidad de stock'></Input>
                        <InputLeftAddon ml={5} children='Min: '></InputLeftAddon>
                        <Input isDisabled={enableInventory} className="onone"  type='number' name="stockMin"   placeholder='Stock minimo'></Input>
                    </InputGroup>

                    <Divider orientation="horizontal"/>

                    <Button >Ingresar Producto</Button>
                </VStack>
            </Flex>
       </>
    )
}
export default Create