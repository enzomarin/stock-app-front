
import { useEffect, useState } from "react"
import NavBar from "../../components/navBar";


const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
function Edit(){
    const [activeInputs, setActiveInputs] = useState(false)
    const [product, setProduct] = useState({})

  

    const handleChange = (e) => { // recibimos un evento e
        const inputValue = e.target.value
        const inputName = e.target.name

        setProduct({...product, [inputName]: inputValue})
    }

    const handleClick = async (e) =>{
        e.preventDefault()

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.barCode}`, {
                method: 'GET'
  
            })
            const data = await res.json() // Convertir la respuesta a json para obtener el body
           
            const {barCode, costPrice, description, expirationDate,name, price,stock}  = data.product

            //console.log({barCode, costPrice, description, expirationDate,name, price,stock});
            setProduct({barCode, costPrice, description, expirationDate,name, price,stock})
            setActiveInputs(true)
            // Agregamos el producto
            //const newListProducts = [data.producto, ...products]
            //fetchProducts()
            //setProducts(newListProducts)
        } catch (error) {
            console.log(error);
        }

    }  
    const updateClick = async (e) =>{
        e.preventDefault()
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${product.barCode}`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
                
            })
            
            console.log(res);
        }catch(err) {
            console.log(err)
        }
    }

  


    return(
        <>
            <NavBar></NavBar>
            <div className="container df  jcsa">
                <div className="df fdc">
                    <h2> 
                        <u>
                            Editar producto
                        </u>
                        
                    </h2>   
                    <h3>Ingrese el codigo de barra </h3>
                    <form className="form">
                        <div className="df  ">
                            <span>Codigo de barras:  </span>
                            <input className="onone  " type="number" name="barCode" onChange={handleChange} value={product.barCode}  placeholder="Codigo de barras"></input>

                        </div>
                        <div className="df">
                            <span></span>

                        </div>
                        <div className="df">
                            <span>Nombre del prodcuto: </span>
                            <input className="onone" type='text' name="name" onChange={handleChange}  value={product.name}  placeholder="Nombre de producto" disabled={!activeInputs}></input>

                        </div>
                        <div className="df">
                            <span>Descripcion</span>
                            <input className="onone" type='text' name="description" onChange={handleChange}  value={product.description}  placeholder="Descripcion" disabled={!activeInputs}></input>

                        </div>
                        <div className="df">
                            <span>Precio de costo: </span>
                            <input className="onone" type='number' name="costPrice" onChange={handleChange} value={product.costPrice} placeholder="Precio de costo" disabled={!activeInputs}></input>

                        </div>
                        <div className="df">
                            <span>Precio</span>
                            <input className="onone" type='number' name="price" onChange={handleChange} value={product.price} placeholder="Precio" disabled={!activeInputs}></input>

                        </div>
                        <div className="df">
                            <span>Stock</span>
                            <input className="onone" type='number' name="stock" onChange={handleChange} value={product.stock} placeholder="Stock" disabled={!activeInputs}></input>

                        </div>
                        <div className="df">
                            <span>Vencimiento</span>
                            <input className="onone" type='date' name="expirationDate" onChange={handleChange}  placeholder="Fecha de vencimiento" disabled={!activeInputs}></input>

                        </div>
       
                        <button className="button" onClick={handleClick}> Buscar producto</button>
                        <button className="button" onClick={updateClick} disabled= {!activeInputs}> Guardar</button>
                    </form>
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
                    .form{
                        display: flex;
                        flex-direction: column;
                        width: 40rem;
                        margin: 0 auto;
                        
                    }
                    input{
                        padding: 0.5rem 0.75rem;
                        margin-bottom: 0.5rem;
                        border: 1px solid lightgray;
                        border-radius: 0.3rem;

                    }
                    .line{
                        display:flex;
                    }

                    .onone{
                        outline: none;
                    }
                    h1{
                        color: black;
                        text-align: center;
                    }

                    .container {
                        background: rgba(255,255,255, .9);
                        width: 60rem;
                        margin: 0 auto;
                        margin-top: 5rem;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        position :relative;
                    }
                    .container::before{
                        content: '';
                        position: absolute;
                        background: rgba(255,255,255,.15);
                        inset:0 ;
                        transform: rotate(-3deg);
                        z-index: -1;
                    }

                    .products-container{
                        overflow: hidden;
                        overflow-y: auto;
                        width: 35rem;
                        max-height: 20rem;
                        padding: 0.5rem;
                    }
                    .product{
                        box-shadow: 1px 2px 6px rgba(0,0,0,0.2);
                        padding: 0.5rem;
                        margin-bottom: 0.5rem;
                        border-radius: 0.3rem;
                    }
                    .right_header {
                        
                        float: right;
                    }

                    button{
                        margin: 0.5rem;
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
export default Edit