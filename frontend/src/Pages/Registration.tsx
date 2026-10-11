import {Alert, Box, Button, FormControl, FormLabel, Input, Link, Sheet, Typography } from '@mui/joy';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {type UserRegisterModel } from '../Components/InterfaceModels';
import api from '../API/api';
import background from "../Images/olive-green-background.jpg";

function Registration(){

    const navigate = useNavigate();
    const[registerData, setRegisterData] = useState<UserRegisterModel>({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })  
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setRegisterData({...registerData,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(registerData.password !== registerData.confirmPassword){
            setErrorMessage("Passwords do not match. Try again!")
            return;
        }

        // API CALL
        try{
            const payload = {
                username: registerData.username,
                email: registerData.email,
                password: registerData.password,
            }
            // BACKEND CHECK
            console.log("TO BACKEND: ", payload)
            const response = await api.post('/register', payload)
            const data = response.data;

            setRegisterData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            })
            // CONSOLE MESSAGE
            console.log("BACKEND RESPONSE: ", data.message)
            navigate("/Login");
        }
        catch(error){
            // const errorReceived = error.response.data.detail;
            console.log(error)
            // setErrorMessage(error)
        }
    }

    return(
        <Sheet 
        // The MAIN CARD 
            sx={{
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row', md: 'row'},
                justifyContent: 'center',
                alignItems: {xs: 'center', sm: 'stretch'},
                mx: 'auto',
                mt: {xs: 5, sm: 8, md:8},
                width: {xs: '70%', sm: '87%', md: 660},
                minHeight: {md: 500},
                // height: { xs: 'auto', sm: 'auto', md: 500},
                overflow: 'hidden',
                boxShadow: { md: '0px 4px 20px rgba(0, 0, 0, 0.4)'},
                border: {xs: 'solid 1px #e2dfdf', md: 'none'},
                borderRadius: {xs: 12, sm: 0},
            }}>
                {/* LEFT SIDE */}
                <Box
                // IMAGE BOX
                sx={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                    backgroundSize: 'cover',
                    width: {sm: '50%', md: 300},
                    // height: 500,
                    boxSizing: {sm: 'border-box', md: 'content-box'},
                    display: {xs: 'none',sm: 'flex', md: 'flex'},
                    flexDirection: 'column',
                    alignItems:'center',
                    justifyContent: 'center',
                    px: 2
                }}>
                    <Typography level='h2' sx={{fontSize: 30, letterSpacing: 2, mb: 5, color: 'white', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.72)'}}> Register</Typography>
                    <Typography sx={{letterSpacing: 2, color: 'white',textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'}} > Already have an account?</Typography>
                    <Button onClick={()=> navigate('/Login')} sx={{mt: 1, width: 150, bgcolor: '#ccc9c92f', border: 'solid 1px #ffffff95',
                        '&:hover': {bgcolor: '#ccc9c95c'}
                    }}> Login</Button>
                </Box>
                {/* RIGHT SIDE */}
                <Box 
                sx={{
                    // bgcolor: 'blue',
                    width: {xs: '100%', sm: '50%', md: 300},
                    minHeight: {xs: 'auto', sm: 500, md: 500},
                    boxSizing: {xs: 'border-box', md: 'content-box'},
                    px: 2,
                }}>
                    <Box>
                        <Typography level='h1' fontFamily={"'Vollkorn SC', serif"}
                        sx={{
                            textAlign: 'center',
                            fontSize: 43,
                            mt: 2, 
                            color: '#2e332a',
                        }}>DishDiary</Typography>
                    </Box>
                    <form onSubmit={handleSubmit}>
                        <Typography sx={{textAlign: 'center', mb: {xs: 4, md: 2}, mt: -1}}> Create your Account</Typography>
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Username</FormLabel>
                            <Input type='text' placeholder='Enter username here' 
                            name='username'
                            value={registerData.username}
                            onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='Enter email here' 
                            name='email'
                            value={registerData.email}
                            onChange={handleChange}
                            />
                        </FormControl>
                        
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Password</FormLabel>
                            <Input type='password' placeholder='8 characters suggested' 
                            name='password'
                            value={registerData.password}
                            onChange={handleChange}
                            />
                        </FormControl>

                        <FormControl
                        sx={{mb: 2,}} >
                            <FormLabel>Confirm Password</FormLabel>
                            <Input type='password' placeholder='Confirm your password' 
                            name='confirmPassword'
                            value={registerData.confirmPassword}
                            onChange={handleChange}
                            />
                        </FormControl>

                        {errorMessage && 
                        <Alert color='danger'
                        sx={{mb:2, }}>
                            {errorMessage}
                        </Alert>}

                        <Button type='submit'
                        sx={{width: '100%', mb: {xs: 0.5, sm: 2}, bgcolor: '#3d6b2c', '&:hover': {bgcolor: '#3d6b2ce4',} }}>
                            Register
                        </Button>
                    </form>
                    <Link component='button' type='button' onClick={()=> navigate('/Login')}
                        sx={{ 
                        display: {xs: 'block', sm: 'none'},
                        width: '100%',
                        justofyContent: 'center',
                        color: '#2e332a',
                        letterSpacing: 1,
                        fontSize: 13,
                        cursor: 'pointer',
                        mb: 2,
                        '&:hover': {textDecoration: 'underline'}
                    }}
                        > Already have an account?</Link>
                </Box>
                
        </Sheet>
    )
}

export default Registration