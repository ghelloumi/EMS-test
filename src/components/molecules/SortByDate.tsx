import React from "react";
import {Button, FormControl, FormLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../../common/types/ProjectType";
import {SortingByDateType} from "../../common/types/sortingTypes";
import {sortArrayByDate} from "../../common/utils";

interface SortByDateType {
    setProjects: any
}

const useFormStyles = makeStyles({
    root: {
        margin: '10px 0px',
        display: 'flex',
        gap: 15,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export const SortByDate: React.FC<SortByDateType> = ({setProjects}) => {
    const classes = useFormStyles();

    // Handle sort projects by date
    const handleChange = (sortedType: SortingByDateType): void => {
        setProjects((prevProjects: Array<ProjectType>) =>
            sortArrayByDate(prevProjects, "creationDate", sortedType)
        )
    }

    return (
        <FormControl className={classes.root}>
            <FormLabel id="date-sort-label">Sort Projects By Date</FormLabel>
            <Button
                id="date-sort-label-earliest"
                onClick={() => handleChange("earliest")}
                data-testid="earliest-button"
                variant="contained"
            >
                Earliest
            </Button>
            <Button
                id="date-sort-label-latest"
                onClick={() => handleChange("latest")}
                data-testid="latest-button"
                variant="contained"
            >
                Latest
            </Button>
        </FormControl>
    );
};
