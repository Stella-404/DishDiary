import { Alert, Box, Button, FormControl, FormLabel, Input, Sheet, Typography } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type UserLoginModel } from "../Components/InterfaceModels";
import api from "../API/api";
import { useAuth } from "../Components/AuthContext";
import background from "../Images/olive-green-background.jpg"

function Login() {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [loginData, setLoginData] = useState<UserLoginModel>({
        email: "",
        password: ""
    })
    const{login} = useAuth();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        setLoginData({...loginData,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()

        // API CALL
        try{
            const payload = {
                email: loginData.email,
                password: loginData.password
            }
            // TO BACKEND
            console.log(payload)
            const response = await api.post('/login', payload)
            const data = response.data;

            console.log("BACKEND SENT: ", data.message)
            login(data.access_token);
            navigate('/Homepage')

        } catch(error: any){
            const errorReceived = error.response.data.detail;
            console.log(errorReceived);
            setErrorMessage(errorReceived)

        }
    }

    return(
        // UI
        <Sheet
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            mx: 'auto',
            mt: 15,
            width: 660,
            height: 500,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
        }}>
            {/* LEFT SIDE */}
                <Box
                sx={{
                    // bgcolor: 'red',
                    width: 300,
                    height: 500,
                    px: 2,
                }}>
                    <form onSubmit={handleSubmit}>
                        <Typography level='h3' sx={{justifySelf: 'center',mt: 4, mb: 9,}}> Login</Typography>

                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Email</FormLabel>
                            <Input type='email' placeholder='Enter email here' 
                            name='email'
                            value={loginData.email}
                            onChange={handleChange}
                            />
                        </FormControl>
                        
                        <FormControl required
                        sx={{mb: 2,}} >
                            <FormLabel>Password</FormLabel>
                            <Input type='password' placeholder='8 characters suggested' 
                            name='password'
                            value={loginData.password}
                            onChange={handleChange}
                            />
                        </FormControl>

                        {errorMessage && 
                        <Alert color='danger'
                        sx={{mb:2, height: 10}}>
                            {errorMessage}
                        </Alert>}
                        
                        <Button type='submit'
                        sx={{width: 300, bgcolor: '#3d6b2c', '&:hover': {bgcolor: '#3d6b2ce6',} }}>
                            Login
                        </Button>
                    </form>
                </Box>
            {/* RIGHT SIDE */}
                <Box
                sx={{
                    // bgcolor: '#5a9140',
                    width: 300,
                    height: 500,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems:'center',
                    px: 2,
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <Typography level='h1' sx={{letterSpacing: 1, mt: 19, mb: 2, color: 'white', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'}}> Welcome Back</Typography>
                    <Typography sx={{letterSpacing: 2, color: 'white', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.49)'}} > Don't have an account yet?</Typography>
                    <Button onClick={()=> navigate('/Registration')} sx={{mt: 2, width: 150, bgcolor: '#ccc9c92f', border: 'solid 1px #ffffff95',
                        '&:hover': {bgcolor: '#ccc9c95c'}, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
                    }}> Register</Button>
                </Box>
        </Sheet>
    )
}

export default Login