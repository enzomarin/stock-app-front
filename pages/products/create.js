
import { useEffect, useState } from "react"

const initialState = {name: '', price: 0}
function Create(){

    const [product, setProduct] = useState(initialState)
    const [products, setProducts] = useState([])
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

            const newListProducts = [data.producto, ...products]
            //fetchProducts()
            setProducts(newListProducts)
        } catch (error) {
            console.log(error);
        }

    }

    const fetchProducts = () => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`)
        .then(res => res.json())
        .then(({data}) =>{
            console.log(data)
            setProducts(data)
        })
    }
    // Obtenemos todos los productos 
    useEffect(() => {
        fetchProducts
    }, [])

    //console.log(products);
    
    return(
        <>
            <div className="container df  jcsa">
                <div className="df fdc">
                    <h2> 
                        <u>
                            Crear Nuevo producto.
                        </u>
                        
                    </h2>
                    <form>
                        <input className="onone" type='text' name="name" onChange={handleChange}  value={product.name} ></input>
                        <input className="onone" type='number' name="price" onChange={handleChange} value={product.price}></input>
                        <button onClick={handleClick}> Crear producto</button>
                    </form>
                </div>

                <div className="products-container">
                    {products.map( (p) => {
                        return(
                        <div className="product df aic jcsb" key={p._id}>
                            
                            <span>{p.name}</span>
                            <span>{p.price}</span>
                        </div>
                        )
                        
                    })}
                </div>
            </div>
            <style jsx>
                {`
                    .df{
                        display: flex;
                    }
                    .fdc{
                        flex-direction: column;
                    }
                    .aic{
                        align-items: center;
                    }
                    .jcc{
                        justify-content: center;
                    }
                    .jcsa{
                        justify-content: space-around;
                    }
                    .jcsb{
                        justify-content: space-between;
                    }
                    form{
                        display: flex;
                        flex-direction: column;
                        width: 20rem;
                        margin: 0 auto;
                        
                    }
                    input{
                        padding: 0.5rem 0.75rem;
                        margin-bottom: 0.5rem;
                        border: 1px solid lightgray;
                        border-radius: 0.3rem;

                    }

                    .onone{
                        outline: none;
                    }
                    h1{
                        color: black;
                        text-align: center;
                    }

                    .container {
                        background-color: white;
                        width: 50rem;
                        margin: 0 auto;
                        margin-top: 5rem;
                        padding: 1rem;
                        border-radius: 0.5rem;
                    }

                    .products-container{
                        overflow: hidden;
                        overflow-y: auto;
                        width: 25rem;
                        max-height: 20rem;
                        padding: 0.5rem;
                    }
                    .product{
                        box-shadow: 1px 2px 6px rgba(0,0,0,0.2);
                        padding: 0.5rem;
                        margin-bottom: 0.5rem;
                        border-radius: 0.3rem;
                    }

                    button{
                        padding: 0.5rem 0.75rem;
                        border:none;
                        border-radius: 0.3rem;
                        cursor:pointer;
                    }
                `
                }
                
            </style>
        </>
    )
}
export default Create