import React from 'react'
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

function Greeting() {
    return (
        <Grid>
            <Typography>THANK YOU FOR ORDERING FROM US!!!</Typography>
            <Typography component={Link} to="/">Back to Home...</Typography>
        </Grid>
    )
}

export default Greeting
