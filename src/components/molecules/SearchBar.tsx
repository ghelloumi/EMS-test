import React, {useEffect, useState} from "react";
import {FormControl, Input, InputLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../../common/types/ProjectType";

interface SearchBarType {
    setProjects: any,
    setNoProject: any,
    initialProjects: Array<ProjectType>
}

const useFormStyles = makeStyles({
    root: {
        margin: '10px 0px',
    }
})

export const SearchBar: React.FC<SearchBarType> = ({setProjects, initialProjects, setNoProject}) => {
    const classes = useFormStyles();

    const [searchField, setSearchField] = useState<string>("");

    // Handle search projects
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchField(event.target.value)
    }

    useEffect(() => {
        setProjects((prevProjects: Array<ProjectType>) => {
            if (searchField) {
                const filteredProjects = prevProjects.filter(project => project.projectName?.toLowerCase().includes(searchField.toLowerCase()))
                setNoProject(!filteredProjects.length)
                return filteredProjects
            }
            setNoProject(false)
            return initialProjects
        })
    }, [searchField]);


    return (
        <FormControl className={classes.root} fullWidth>
            <InputLabel id="search-label">Search project by name</InputLabel>
            <Input id="search-input" onChange={handleSearch} value={searchField} inputProps={{ "data-testid": "search-bar" }}/>
        </FormControl>
    );
};
