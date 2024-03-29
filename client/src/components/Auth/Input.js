import React from 'react';

import {TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';



 
const Input = ({ name, half, label, handleChange, autoFocus, type, handleShowPassword  }) => {
    return (
    <Grid item xs={6} sm={half ? 6 : 12}>
        <TextField
        variant="outlined"
        required
        fullWidth
        name={name}
        label={label}
        onChange={handleChange}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
            endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={handleShowPassword}>
                    {type === "password" ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
            )
        }  : null} 

        />
    </Grid>
    )
}

export default Input
