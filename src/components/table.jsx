import React, { useEffect, useState } from "react";
import axios from "axios";
const Table=()=>{
    const handlesubmitcountry=(event)=>{
        event.preventDefault();
        const payload={
            country:event.target.country.value,
        };
        axios.post("http://localhost:8080/add-country",payload)
        .then((response)=>{
            // console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const handlesubmitcity=(event)=>{
        event.preventDefault();
        const payload={
            city:event.target.city.value,
            population:event.target.population.value,
            country:event.target.country.value,
        };
        axios.post("http://localhost:8080/add-city",payload)
        .then((response)=>{
            // console.log(response);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const handleDelete=(id)=>{
        axios.delete(`http://localhost:8080/${id}`).then((res)=>{
            getcitydata();
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    const [data,setData]=useState([]);
        useEffect(()=>{
            getcitydata();
        },[]);
        const getcitydata=()=>{
            axios.get("http://localhost:8080/add-city").then((res)=>{
                console.log(res);
                setData([...res.data]);
            })
             .catch((err)=>{
                 console.log(err);
             })
        }
        const [order,setOrder]=useState("ASC");
        const handlesort=(col)=>{
           if(order==="ASC"){
               const sorted=[...data].sort((a,b)=>(a[col]>b[col]?1:-1));
               setData(sorted);
               setOrder("DESC")
           }
           if(order==="DESC"){
            const sorted=[...data].sort((a,b)=>(a[col]<b[col]?1:-1));
            setData(sorted);
            setOrder("ASC");
        }
        }
    
    return(
        <>
    <form action="" onSubmit={handlesubmitcountry}>
       <input type="text" name="country" placeholder="add-country" label="country name"/>
       <input type="submit" value="submit"></input>
     </form>
     <hr/>
     <form action="" onSubmit={handlesubmitcity}>
       <input type="text" name="city" placeholder="add-city" label="city-name"/>
       <input type="number" name="population" placeholder="enter population" label="population"/>
       <input type="text" name="country" placeholder="add-country" label="country name"/>
       <input type="submit" value="submit"></input>
     </form>
     <hr/>
     <buttton onClick={()=>handlesort("ASC")}>sort by asc population</buttton>
     <hr/>
     <buttton onClick={()=>handlesort("DSC")}>sort by dsc population</buttton>
     <table>
         <thead>
         <tr>
             <th>id</th>
             <th>Country</th>
             <th>City</th>
             <th>Population</th>
             <th>Edit</th>
             <th>Delete</th>
         </tr>
         </thead>
         <tbody>
             {data.map((el)=>{
               return (
                <tr>
                <td>{el.id}</td>
                <td>{el.country}</td>
                <td>{el.city}</td>
                <td>{el.population}</td>
                <td>Edit</td>
                <td><button onClick={()=>handleDelete(el.id)}>Delete</button></td>
                <td></td>
            </tr>
               )
             })}
         </tbody>
     </table>
        </>
    )
}
export default Table;