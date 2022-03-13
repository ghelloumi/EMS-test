import React from "react";
import {Card, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {isValidDate} from "../../common/utils";

interface CardProps {
    date: string;
    name: string;
    status: string;
}

const useCardStyles = makeStyles({
    root: {
        width: 350,
        margin: 10,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 10,
    },
    status: {
        marginBottom: 10
    }
});

export const ProjectCard: React.FC<CardProps> = ({date, name, status}) => {
    const classes = useCardStyles();
    const toDate = new Date(date);

    return (
        <Card className={classes.root} variant="outlined">
            <div>
                {isValidDate(toDate) && <Typography
                    data-testid="date"
                    className={classes.title}
                    color="textSecondary"
                >
                    {toDate.toUTCString()}
                </Typography>}
                {name && <Typography variant="h5" component="h2" data-testid="name">
                    {name}
                </Typography>}
                {status && <Typography className={classes.status} data-testid="status">
                    {status}
                </Typography>}
            </div>
        </Card>
    );
};
