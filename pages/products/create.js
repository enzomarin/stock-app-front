import { useState } from "react"


const initialState = {name: '', price: 0}
function Create(){

    const [product, setProduct] = useState(initialState)

    const handleChange = (e) => { // recibimos un evento e
        const inputValue = e.target.value
        const inputName = e.target.name

        setProduct({...product, [inputName]: inputValue})
    }

    const handleClick = (e) =>{
        e.preventDefault()
        fetch('http://localhost:5000/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then( res => {
            return res.json() // convierte la respuesta a json para obtener el body (retorna una promesa)
        }).then(data =>{
            setProduct(initialState)
            console.log(data);
        })
        .catch( err => {
            console.log(err);
        })
    }

    return(
        <>
            <div>
                <h1> Crear nuevo producto</h1>
                <form>
                    <input type='text' name="name" onChange={handleChange}  value={product.name} ></input>
                    <input type='number' name="price" onChange={handleChange} value={product.price}></input>
                    <button onClick={handleClick}> Crear producto</button>
                </form>
            </div>
            <style jsx>
                {`
                    form{
                        display: flex;
                        flex-direction: column;
                        width: 20rem;
                        margin: 0 auto;
                        
                    }
                    input{
                        margin-bottom: 0.5rem;
                    }
                    h1{
                        text-align: center;
                    }
                `
                }
                
            </style>
        </>
    )
}
export default Create