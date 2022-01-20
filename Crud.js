import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Crud() {
  const [getData, setGetData] = useState([])
  const [post, setPost]=useState([])
  const [PostData, setPostData]=useState([])
  const [open, setOpen]=useState()
  const [change, setChange]=useState('')
  const [id1, setId1]=useState('')
console.log(id1);
console.log(getData);

/* GEt */
  const handleGetData=()=>{
        axios.get('https://crudoperations-19569-default-rtdb.firebaseio.com/Crud.json').then((res)=>{
            setGetData(res.data);
            console.log(res);
        }).catch((err)=>{
            console.log(err);
        })
  }
/*DELETE*/ 

  const handleDelete=(id)=>{
    const data=Object.keys(getData).filter((res,index)=> index === id)
    console.log(Object.values(data));
    axios.delete(`https://crudoperations-19569-default-rtdb.firebaseio.com/Crud/${Object.values(data)}.json`,).then((res)=>{
      handleGetData()
    }).then((err)=>{
      console.log(err);
    })
  }
  
  
  /*POST*/  
  
  const handelPost=(e)=>{
    setPost(e.target.value)
  }
  
  useEffect(() => {
    setPostData(post)
  }, [post])
  
  
  const handleSubmit=()=>{
    console.log(PostData);
    axios.post(`https://crudoperations-19569-default-rtdb.firebaseio.com/Crud.json`,{Name:PostData}).then((req, res)=>{
      console.log(res);
      handleGetData()
    }).catch((err)=>{
      console.log(err);
    })
    document.getElementById('clear').value=''
  }
  
  /* UPDATE */ 
    
    const handleClear=()=>{
      setOpen(false)
      
    }
    
    const UpdateData=(id1)=>{
      console.log(id1)
      setOpen(true)
      setId1(id1)

 
     
 }
 const handleUpdateChange= ()=>{
  console.log(id1);
  console.log(change);
  
 axios.put(`https://crudoperations-19569-default-rtdb.firebaseio.com/Crud/${id1}.json`, {Name:change}).then((req, res)=>{
    console.log(res);
    handleGetData()

  }).catch((err)=>{
    console.log(err);
  })

 }
      
    return (
        <div>
<input type='text' id='clear' onChange={handelPost} />
<button onClick={handleSubmit} >Sumbit</button>
<div className='col-6' >
<table className="table table-striped table-dark table-bordered ">
<thead>
  <tr>
    <th scope="col">SL.NO</th>
    <th scope="col">Title</th>
    <th scope="col">EDIT</th>
    <th scope="col">DELETE</th>
  </tr>
</thead>
<tbody>
  <tr>
  <td>
 
    {
      Object.entries(getData).map((res,id)=>{
        return <div >
        <td>{id}</td>
        <td ><h2 style={{width:'500px'}} >{res[1].Name}</h2></td>
                  <td ><button onClick={()=>handleDelete(id)} >DELETE</button></td>
                   <td ><button onClick={()=>UpdateData(res[0])} >Update</button></td>
                </div>
      })
    }
    
    </td>
  </tr>
</tbody>
</table>
</div>
 

{
  open === true ? <div>
    <input onChange={(e)=>setChange(e.target.value)} type='text'/>
    <button  onClick={handleClear} >CLEAR</button>
    <button onClick={handleUpdateChange} >Submit</button>

  </div> : ' '
}

        </div>
       
    )
}

export default Crud
