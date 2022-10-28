import { React, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../context/user";
import { updateUser, updateUserPassword } from "../DAL/user";
import { useSnackbar } from "notistack";
import {
  Container,
  Card,
  Stack,
  TextField,
  Avatar,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function User() {
  const router = useRouter();
  const {enqueueSnackbar} = useSnackbar();
  const { user, email, id, checkLogin } = useContext(UserContext);
  const [username, setUsername] = useState(user);
  const [emailAddress, setEmailAddress] = useState(email);
  const [currentPassword, setCurrentPassword] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState();
  const [profileChange, setProfileChange] = useState(false);
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  const handleUpdateProfile = async () => {
    if (profileChange && username!=="" && emailAddress!=="") {
        console.log(id)
        const response = await updateUser(id, {username, emailAddress})
        if(response.code===200) {
            enqueueSnackbar("User data updated successfully", {variant:'success'})
        } else {
            enqueueSnackbar(response.message, {variant:'error'})
        }
    } else {
        enqueueSnackbar("Fields cannot be empty", {variant:"error"})
    }
  };

  const handlePasswordChange = async () => {
    if (currentPassword && password && (password === passwordConfirmation)) {
        const response = await updateUserPassword({currentPassword, password, passwordConfirmation})
        if(response.code===200) {
            enqueueSnackbar("Password updated successfully", {variant:'success'})
            console.log(response)
            localStorage.setItem('token',response.data.jwt);
            setPassword()
            setPasswordConfirmation()
            setCurrentPassword()
        } else {
            enqueueSnackbar(response.message, {variant:'error'})
        }
    } else {
        enqueueSnackbar("Invalid Password", {variant:'error'})
    }
  }
useEffect(()=>{
    checkLogin();
},[])
  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={4.5}
        >
          <Typography variant="h4">Profile</Typography>
        </Stack>

        <Card
          sx={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            mb: 1,
            width: "70%",
            margin: "auto",
          }}
        >
          <Stack
            spacing={5}
            marginTop={6}
            marginLeft={3}
            marginRight={3}
            marginBottom={6}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                // fullWidth
                sx={{ width: "50%" }}
                required
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setProfileChange(true);
                }}
              />

              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ width: "50%" }}
                // sx={{ width: 250 }}
                required
                name="email"
                value={emailAddress}
                onChange={(e) => {
                  setEmailAddress(e.target.value);
                  setProfileChange(true);
                }}
              />
            </Stack>
            <div className="d-flex  justify-content-center w-64 text-center ">
              <LoadingButton
                loading={false}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={handleUpdateProfile}
                variant="contained"
              >
                Save Changes
              </LoadingButton>
            </div>
          </Stack>
        </Card>
      </Container>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={4.5}
        >
          <Typography variant="h4">Password</Typography>
        </Stack>

        <Card
          sx={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            mb: 1,
            width: "70%",
            margin: "auto",
          }}
        >
          <Stack
            spacing={5}
            marginTop={6}
            marginLeft={3}
            marginRight={3}
            marginBottom={6}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                id="outlined-basic"
                label="Old Password"
                variant="outlined"
                type="password"
                sx={{ width: "50%" }}
                required
                value={currentPassword}
                onChange={e=>setCurrentPassword(e.target.value)}
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <TextField
                id="outlined-basic"
                label="New Password"
                variant="outlined"
                sx={{ width: "50%" }}
                type="password"
                required
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Confirm New Password"
                variant="outlined"
                sx={{ width: "50%" }}
                type="password"
                required
                value={passwordConfirmation}
                onChange={e=>setPasswordConfirmation(e.target.value)}
              />
            </Stack>

            <div className="d-flex  justify-content-center w-64 text-center ">
              <LoadingButton
                loading={false}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                onClick={handlePasswordChange}
                variant="contained"
              >
                Update Password
              </LoadingButton>
            </div>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
export default User;
