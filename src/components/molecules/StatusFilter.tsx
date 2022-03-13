import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {ALL_STATUS, STATUS} from "../../common/constants";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../../common/types/ProjectType";

interface StatusFilterType {
    setProjects: any,
    setNoProject: any,
    initialProjects: Array<ProjectType>
}

const useFormStyles = makeStyles({
    root: {
        margin: '10px 0px',
    }
})

export const StatusFilter: React.FC<StatusFilterType> = ({setProjects, initialProjects, setNoProject}) => {
    const classes = useFormStyles();

    const [selectedStatus, setSelectedStatus] = useState<string>(ALL_STATUS);

    // Handle select status
    const handleSelectStatus = (event: React.ChangeEvent<any>) => {
        setSelectedStatus(event.target.value)
    }

    useEffect(() => {
        setProjects(() => {
            if (selectedStatus !== ALL_STATUS) {
                const filteredProjects = initialProjects.filter(project => project.status?.toLowerCase().includes(selectedStatus.toLowerCase()))
                if (!filteredProjects.length) {
                    setNoProject(true)
                    return filteredProjects
                }
                setNoProject(false)
                return filteredProjects
            }

            setNoProject(false)
            return initialProjects
        })
    }, [selectedStatus]);


    return (
        <FormControl className={classes.root}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="status-select"
                value={selectedStatus}
                label={selectedStatus}
                onChange={handleSelectStatus}
                inputProps={{ "data-testid": "status-selector" }}
            >
                {STATUS.map(e =>
                    <MenuItem key={e} value={e}>{e}</MenuItem>
                )}
            </Select>
        </FormControl>
    );
};
