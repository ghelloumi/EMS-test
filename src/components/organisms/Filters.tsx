import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../../common/types/ProjectType";
import {StatusFilter} from "../molecules/StatusFilter";
import {SearchBar} from "../molecules/SearchBar";
import {SortByDate} from "../molecules/SortByDate";
import {SearchInDateRange} from "../molecules/SearchInDateRange";

interface FiltersType {
    setProjects: any,
    setNoProject: any,
    initialProjects: Array<ProjectType>
}

const useStyles = makeStyles({
    root: {
        width: '50%',
        margin: "20px auto"
    }
})

export const Filters: React.FC<FiltersType> = ({setProjects, initialProjects, setNoProject}) => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <StatusFilter setProjects={setProjects} initialProjects={initialProjects} setNoProject={setNoProject}/>
            <SearchBar setProjects={setProjects} initialProjects={initialProjects} setNoProject={setNoProject}/>
            <SortByDate setProjects={setProjects}/>
            <SearchInDateRange setProjects={setProjects} setNoProject={setNoProject}
                               initialProjects={initialProjects}/>
        </div>
    );
};
