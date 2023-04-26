import React, {useState, useEffect} from 'react'
import Sidebar from '../components/SideBarNav'
import { Card, CardContent} from "@mui/material";
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';




function Dash() {

  const [desktop, setDesktop] = useState(false)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true);
  const baseURL = "http://127.0.0.1:8000";
  const navigate = useNavigate()
  const getProjects = async (token)=>{

  await axios.get(`${baseURL}/products`,{
    headers: { Authorization: `Bearer ${token}` },
  }).then(res =>{
    setProjects(res.data)
    
    setLoading(false)
  }).catch((err)=>{
    console.log(err.response.status);

    if (err.response.status === 401){
      navigate('/login')
      toast.error('Authentication failed please login again');
    }else{
      toast.error('Something went wrong!');
    }
   
  })

}

const navChat = (name) =>{
  navigate('/chat',{state:{name:name}});
}

  useEffect(() => {
    const local_token = localStorage.getItem("token");
    const token = JSON.parse(local_token)
    setLoading(true)
    if (token === null) {
      navigate("/login");
    } else {
      
      
      getProjects(token);
    }  
    
  }, [navigate])
  


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setDesktop(true)
        
      } else {
        setDesktop(false)
        
      }
    };
    handleResize();
  
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])

  return (
    <div>
      <Sidebar/>
      {
        loading?<div style={{display:'grid', marginLeft: desktop?'260px':'10px', marginRight:desktop?'0px':'10px', marginTop:'20px', gridTemplateColumns: desktop?'1fr 1fr 1fr 1fr':'1fr 1fr', gap:desktop?'8px':'5px'}}>
          <Skeleton variant="rect" animation="wave" width={desktop?250:150} height={desktop?200:150} />
          <Skeleton variant="rect" animation="wave" width={desktop?250:150} height={desktop?200:150} />
          <Skeleton variant="rect" animation="wave" width={desktop?250:150} height={desktop?200:150} />
          <Skeleton variant="rect" animation="wave" width={desktop?250:150} height={desktop?200:150} />
        </div>:projects.length ===0?<div style={{display:'flex', height:'100vh',justifyContent:'center', alignItems: 'center',marginLeft: desktop?'260px':'10px', marginRight:desktop?'0px':'10px'}}><h1>No Product created yet!</h1></div>:<div style={{display:'grid', marginLeft: desktop?'260px':'10px', marginRight:desktop?'0px':'10px', marginTop:'20px', gridTemplateColumns: desktop?'1fr 1fr 1fr 1fr':'1fr 1fr', gap:'10px'}}>
          {projects.map((pro)=>{
            return <Card style={{marginBottom:'10px'}}>
            <CardContent style={{textAlign:'start'}}>
    
              <h3>{pro.project_name}</h3>
            </CardContent>
            <CardActions>
          <Button size="small" 
          sx={{ m: 1, width: "90px" }}
          variant="contained"
          onClick={() =>navChat(pro.project_name)}
          style={{
                  backgroundColor: "greenyellow",
                  fontSize: "12px",
                  color: "black",
                  fontWeight: "700",
                }}>Chat</Button>
        </CardActions>
          </Card>
          })}
        </div>
        
        
      }
    </div>
  )
}




export default Dash