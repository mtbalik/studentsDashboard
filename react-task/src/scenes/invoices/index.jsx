import { Box, IconButton, useTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { tokens } from "../../theme";
/*import { mockDataTeam } from "../../data/mockData";*/
import Header from "../../components/Header";
import profile from '../global/profile.png';
import React, { useState, useEffect } from "react";
import "../team/team.css"
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import {
  Button,
  EditableText,
  InputGroup,
  Toaster,
  Position,
} from "@blueprintjs/core"

const AppToaster = Toaster.create({
  position: Position.TOP,
})

function Invoices() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newWebsite, setNewWebsite] = useState("")
  const [newAddress, setNewAddress] = useState("")

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => setUsers(json))
  }, [])

  const addUser = () => {
    const name = newName.trim()
    const email = newEmail.trim()
    const website = newWebsite.trim()
    const address = newAddress.trim()
    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
          address,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => response.json())
        .then(data => {
          setUsers([...users, data])
          setNewName("")
          setNewEmail("")
          setNewWebsite("")
          setNewAddress("")
          AppToaster.show({
            message: "User added successfully",
            intent: "success",
            timeout: 3000,
          })
        })
    }
  }

  const updateUser = id => {
    const user = users.find(user => user.id === id)

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(() => {
        AppToaster.show({
          message: "User updated successfully",
          intent: "success",
          timeout: 3000,
        })
      })
  }

  const deleteUser = id => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        setUsers(values => {
          return values.filter(item => item.id !== id)
        })
        AppToaster.show({
          message: "User deleted successfully",
          intent: "success",
          timeout: 3000,
        })
      })
  }

  const onChangeHandler = (id, key, value) => {
    setUsers(values => {
      return values.map(item =>
        item.id === id ? { ...item, [key]: value } : item
      )
    })
  }

  return (
    <div className="students">     
         <Box
        display="flex"
        flex-direction="column"
        width="40%"
        borderRadius="3px"
       
      >
        <h1> Payments </h1>
        <InputBase sx={{ ml: 2, flex: 1}} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      <table class="bp4-html-table">
      
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><img src={profile} width="50px" borderRadius="10px" overflow="hidden" margin="20px" /></td>
              <td>{user.name}</td>
              <td>
                <EditableText
                  value={user.email}
                  onChange={value => onChangeHandler(user.id, "email", value)}
                />
              </td>
              <td>
                <EditableText
                  value={user.website}
                  onChange={value => onChangeHandler(user.id, "website", value)}
                />
              </td>
              <td>
                <EditableText
                  value={user.address.street}
                  onChange={value => onChangeHandler(user.id, "address", value)}
                />
              </td>
              <td>
                <Button icon={<EditIcon  style={{ fill: '#FFA500'}}/>} onClick={() => updateUser(user.id)}>
                </Button>
                &nbsp;
                <Button icon={<DeleteOutlineOutlinedIcon  style={{ fill: '#FFA500' }}/>} onClick={() => deleteUser(user.id)}>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <InputGroup
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Add name here..."
              />
            </td>
            <td>
              <InputGroup
                placeholder="Add email here..."
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
            </td>
            <td>
              <InputGroup
                placeholder="Add website here..."
                value={newWebsite}
                onChange={e => setNewWebsite(e.target.value)}
              />
            </td>
            <td>
              <InputGroup
                placeholder="Add company here..."
                value={newAddress}
                onChange={e => setNewWebsite(e.target.value)}
              />
            </td>
           
          </tr>
        </tfoot>
      </table>
      </div>
   
  )
}

export default Invoices;