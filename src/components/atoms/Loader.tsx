import React from "react";
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useLoaderStyles = makeStyles({
    root: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate3d(-50%, -50%, 0)"
    }
});

export const Loader: React.FC<any> = () => {
    const classes = useLoaderStyles();

    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    );
};
