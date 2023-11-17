import React, {useState} from 'react';
import {Box, Container, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import LoadingButton from '@mui/lab/LoadingButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useDispatch, useSelector} from "react-redux";
import {registerRequest} from "../../store/actions/usersActions";
import InputField from "../../components/UI/Form/InputField/InputField";
import FileInput from "../../components/UI/Form/FileInput/FileInput";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

const Registration = () => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.users.registerLoading);
    const error = useSelector(state => state.users.registerError);

    const [user, setUser] = useState({
        username: '',
        password: '',
    });

    // useEffect(() => {
    //     return () => {
    //         dispatch(clearRegisterErrors());
    //     }
    // }, [dispatch]);

    const onChange = e => {
        const {name, value} = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmit = e => {
        e.preventDefault();
        dispatch(registerRequest(user));
    };

    const getFieldError = fieldName => {
        try{
            return error.errors[fieldName].message;
        } catch {
            return undefined;
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{paddingTop: 6}}>
                <Typography component="h1" variant="h5" color="#fff">
                    Sign up
                </Typography>
                <Box component="form" onSubmit={onSubmit}>
                    <InputField
                        name="username"
                        value={user.username}
                        onChange={onChange}
                        label="Username"
                        required={true}
                        error={getFieldError('username')}
                        margin="dense"
                    />
                    <InputField
                        name="password"
                        value={user.password}
                        onChange={onChange}
                        label="Password"
                        type="password"
                        required={true}
                        error={getFieldError('password')}
                        margin="dense"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        disabled={loading}
                        loadingPosition="start"
                        startIcon={<AccountCircleIcon />}
                        variant="contained"
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent={"flex-end"}>
                        <Grid item>
                            <Link to="/login">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Registration;