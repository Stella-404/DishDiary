import { Alert, Box, Button, FormControl, FormLabel, Input, Link, Sheet, Typography } from "@mui/joy";
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
        // the Main Card
        <Sheet
        sx={{
            display: 'flex',
            flexDirection: {xs: 'column', sm: 'row'},
            justifyContent: 'center',
            alignItems: {xs: 'center', sm: 'stretch'},
            mx: 'auto',
            mt: {xs: 5, sm: 8},
            width: {xs: '70%', sm: '87%', md: 660},
            minHeight: {md: 500},
            boxShadow: {md: '0px 4px 20px rgba(0, 0, 0, 0.4)'},
            border: {xs: 'solid 1px #e2dfdf', md: 'none'},
            borderRadius: {xs: 12, sm: 0},
        }}>
            {/* LEFT SIDE */}
                <Box
                sx={{
                    // bgcolor: 'red',
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
                        <Typography sx={{textAlign: 'center', mt: -1, mb: {xs: 4, md: 8},}}> Login to your account</Typography>

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
                        sx={{mb:2}}>
                            {errorMessage}
                        </Alert>}
                        
                        <Button type='submit'
                        sx={{width: '100%',mb: {xs: 0.5, sm: 2}, bgcolor: '#3d6b2c', '&:hover': {bgcolor: '#3d6b2ce6',} }}>
                            Login
                        </Button>
                    </form>
                    <Link component='button' type='button' onClick={()=> navigate('/Registration')}
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
                        > Don't have an account?</Link>
                </Box>
            {/* RIGHT SIDE */}
                <Box
                // THE IMAGE BOX
                sx={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'right center',
                    backgroundRepeat: 'no-repeat',
                    width: {sm: '50%',md: 300},
                    display: {xs: 'none', sm: 'flex'},
                    boxSizing: {sm: 'border-box', md: 'content-box'},
                    flexDirection: 'column',
                    alignItems:'center',
                    justifyContent: 'center',
                    px: 2,
                    
                }}>
                    <Typography level='h2' sx={{fontSize: 30, letterSpacing: 2, mb: 5, color: 'white', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.99)'}}> Welcome Back</Typography>
                    <Typography sx={{letterSpacing: 2, color: 'white', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.9)'}} > Don't have an account yet?</Typography>
                    <Button onClick={()=> navigate('/Registration')} sx={{mt: 2, width: 150, bgcolor: '#ccc9c92f', border: 'solid 1px #ffffff95',
                        '&:hover': {bgcolor: '#ccc9c95c'}, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)',
                    }}> Register</Button>
                </Box>
        </Sheet>
    )
}

export default Login