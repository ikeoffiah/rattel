import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import logo from "../assets/images/ratlogo.png";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ClearIcon from '@mui/icons-material/Clear';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function Sidebar() {
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [desktop, setDesktop] = useState(false)
  const [docClick, setDocClick] = useState(false);
  const [openDocForm, setOpenDocForm] = useState(false);
  const [link, setLink] = useState('')
  const [file, setFile] = useState()
  const [productName, setProductName] = useState('')
  const drawerWidth = 240;
  const navigate = useNavigate()
  const baseURL = "http://127.0.0.1:8000";


  const handleCloseForm = () => {
    setOpenForm(false);
    setButtonclick(false);
    setSubmit(false)
  };


const handleSubmitDoc = () =>{
 

  if( file.type !== "application/pdf"){
    toast.error("Please upload a PDF file")
  }

  setSubmit(true);
    const local_token = localStorage.getItem("token");
    const token = JSON.parse(local_token)

    if (token === null) {
      navigate("/login");
    } else {
      
      postProhectWithDoc(token);
    } 
}

  const handleCloseDocForm = () =>{
    setOpenDocForm(false)
    setDocClick(false)
    setSubmit(false)
  }

  const handleDrawerOpen = () => {
    setOpen(!open);
  };
  const [buttonClick, setButtonclick] = useState(false);
  const [submit, setSubmit] = useState(false)
  const handleButtonClick = () => {
    setButtonclick(true);
    setOpenForm(true);
  };

  const handleDocClick = () =>{
    setDocClick(true);
    setOpenDocForm(true);
  }

  const handleSubmitClick = () => {
    setSubmit(true);
    const local_token = localStorage.getItem("token");
    const token = JSON.parse(local_token)

    if (token === null) {
      navigate("/login");
    } else {
      
      postProjects(token);
    } 
  };


  const postProhectWithDoc = async(token) =>{
    const formData = new FormData();
    formData.append('file', file);
    formData.append('project_name', productName);
    await axios.post(`${baseURL}/file-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    }).then((res) =>{
      navigate('/chat',{state:{name:productName}});
    }).catch(
      (err) =>{
    setSubmit(false)
    toast.error('Your product creation had some issues!');
      }
    )

  }


const postProjects = async (token, data)=>{

  await axios.post(`${baseURL}/web-upload`, {'link':link, 'project_name':productName},{
    headers: { Authorization: `Bearer ${token}` },
  }).then(res =>{
   
    navigate('/chat',{state:{name:productName}});
    
  }).catch((err)=>{
    setSubmit(false)
    toast.error('Your product creation had some issues!');
    
  })

}


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setDesktop(true)
        setOpen(true);
      } else {
        setDesktop(false)
        setOpen(false);
      }
    };
    handleResize();
  
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, [])
  

  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          height: "60px",
          display: "flex",
          paddingLeft: "20px",
          paddingRight: "20px",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: desktop ? drawerWidth : 0
        }}
      >
        <div style={{display: desktop ? 'none':''}}>
          <IconButton onClick={handleDrawerOpen} edge="start" color="black">
            <MenuIcon />
          </IconButton>
        </div>

        <div>
          <Avatar src={logo} style={{ width: "50px", height: "50px" }} />
        </div>

        
      </div>
      <Divider style={{ backgroundColor: "black" }} />
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "greenyellow",
            boxSizing: "border-box",
          },
        }}
      >
        <div style={{display:desktop ? 'none':'flex', justifyContent:'end'}}>
        <IconButton onClick={handleDrawerOpen} edge="start" color="black">
          <ClearIcon />
        </IconButton>
        </div>

        <List>
          
            <ListItem disablePadding>
              <ListItemButton>
              <Button
            sx={{ m: 1, width: "80%" , height:"50px"}}
            variant="contained"
            size="small"
            style={{
              backgroundColor: "white",
              fontSize: "12px",
              color: "black",
              fontWeight: "700",
            }}
            onClick={handleButtonClick}
          >
            {buttonClick ? (
              <CircularProgress style={{ color: "black" }} size="25px" />
            ) : (
              "Add Website"
            )}
          </Button>
              </ListItemButton>
            </ListItem>
            <ListItem>
            <Button
            sx={{ m: 1, width: "80%" , height:"50px"}}
            variant="contained"
            size="small"
            style={{
              backgroundColor: "white",
              fontSize: "12px",
              color: "black",
              fontWeight: "700",
            }}
            onClick={handleDocClick}
          >
            {docClick ? (
              <CircularProgress style={{ color: "black" }} size="25px" />
            ) : (
              "Add PDF Docs"
            )}
          </Button>
            </ListItem>
          
        </List>
      </Drawer>

      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Create a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the link of the website you want to upload
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProductName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "greenyellow",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            id="outlined-hh"
            label="Web link"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setLink(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "greenyellow",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            onClick={handleSubmitClick}
            style={{
              backgroundColor: "greenyellow",
              color: "black",
              fontWeight: "700",
            }}
          >
           {submit ? (
              <CircularProgress style={{ color: "white" }} size="25px" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDocForm} onClose={handleCloseDocForm}>
        <DialogTitle>Create a project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add the link of the website you want to upload
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setProductName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "greenyellow",
                },
              },
            }}
          />
          <TextField
            margin="dense"
            id="outlined-hh"
            type="file"
            fullWidth
            variant="outlined"
            onChange={(e) => setFile(e.target.files[0])}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "greenyellow",
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            onClick={handleSubmitDoc}
            style={{
              backgroundColor: "greenyellow",
              color: "black",
              fontWeight: "700",
            }}
          >
           {submit ? (
              <CircularProgress style={{ color: "white" }} size="25px" />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Sidebar;
