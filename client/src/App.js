import { useEffect, useState } from "react";
import axios from "axios"
import "./App.css";
import Empform from "./components/Empform";

axios.defaults.baseURL = "http://localhost:4000/"

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] =useState({
    name:"",
    email:"",
    mobile:""
  })
  const [formDataEdit, setFormDataEdit] =useState({
    name:"",
    email:"",
    mobile:"",
    _id:""
  })
  const [dataList, setDataList] = useState([]);
  const [editSection , setEditSection] = useState(false);
  const handleOnChange =(e)=>{
    const {value, name} = e.target
    setFormData((preve)=>{
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData)
    const data = await axios.post("/create",formData);
    console.log(data)
    if(data.data.success){
      setAddSection(false);
      alert(data.data.message)
      getFetchData()
      setFormData(
        {
          name:"",
          email:"",
          mobile:""
        }
      )
    }
  };

  const getFetchData = async ()=>{
    const data = await axios.get("/")
    if(data.data.success){
      setDataList(data.data.data);
    }
  }
  useEffect(()=>{
    getFetchData()
  },[]);

 const handleDelete = async(id)=>{
  const data = await axios.delete("/delete/"+id)
  alert(data.data.message);
  if(data.data.success){
    getFetchData()
  }
 }

 const handleUpdate = async(e)=>{
  e.preventDefault();
  const data = await axios.put("/update",formDataEdit);
  alert(data.data.message)
  if(data.data.success){
    getFetchData()
    setEditSection(false);
  }
 }
 const handleEditOnChange =async(e)=>{
  const {value, name} = e.target
    setFormDataEdit((preve)=>{
      return {
        ...preve,
        [name]: value
      }
    })
 }
 const handleEdit = (el)=>{
  setFormDataEdit(el);
  setEditSection(true)
 }
 
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={()=>{setAddSection(true)}}>ADD</button>
        { addSection && (
          <Empform 
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
          />
        )}
        {
          editSection && (
          <Empform 
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleclose={() => setEditSection(false)}
            isUpdate={true}
            rest={formDataEdit}
            />
          )
        }
        <div className="tableContainer">
          <table>
            <thead>
              <tr >
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>  
                </th>
              </tr>
            </thead>
            <tbody>
             {
              dataList.map((el)=>{
                return(
                  <tr key={el._id}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                    <td>
                      <button className="btn edit-btn" onClick={()=>handleEdit(el)}>Edit</button>
                      <button className="btn delete-btn" onClick={()=>{handleDelete(el._id)}}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
            </tbody>
          </table>

        </div>
      </div>
    </>
  );
}

export default App;
