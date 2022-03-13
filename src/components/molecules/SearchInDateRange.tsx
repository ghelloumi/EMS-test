import React, {useState} from "react";
import {FormControl, Button, FormLabel} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../../common/types/ProjectType";
import moment from 'moment';
import {DatePicker} from "../atoms/DatePicker";
import {isValidDate} from "../../common/utils";


interface SearchInDateRangeType {
    setProjects: any,
    setNoProject: any,
    initialProjects: Array<ProjectType>
}

const useFormStyles = makeStyles({
    root: {
        margin: '10px 0px',
    },
    formElementsContainer: {
        display: 'flex',
        alignItems: 'center'
    }
})

export const SearchInDateRange: React.FC<SearchInDateRangeType> = ({setProjects, initialProjects, setNoProject}) => {
    const classes = useFormStyles();
    const [date1, setDate1] = useState(moment(new Date()).format("YYYY-MM-DD"));
    const [date2, setDate2] = useState(moment(new Date()).format("YYYY-MM-DD"));


    // Handle search projects
    const handleSearch = () => {
        setProjects(() => {
                const filteredProjects = initialProjects.filter((project: ProjectType) =>
                    isValidDate(project) &&
                    moment(project.creationDate).isAfter(date1) &&
                    moment(project.creationDate).isBefore(date2) && project
                )

                setNoProject(!filteredProjects.length)

                return filteredProjects
            }
        )
    }


    return (
        <FormControl className={classes.root} fullWidth>
            <FormLabel id="date-range-filter-label">Search Projects in Date Range</FormLabel>
            <div className={classes.formElementsContainer}>
                <div>
                    <DatePicker label="Start" handleChange={(date: string) => {
                        setDate1(date)
                    }} value={date1}
                                maxDate={date2} testId="start-date-picker"/>
                    <DatePicker label="End" handleChange={(date: string) => setDate2(date)} value={date2}
                                minDate={date1} testId="end-date-picker"/>
                </div>
                <Button
                    onClick={handleSearch}
                    variant="contained"
                    data-testid="search-button"
                >
                    Search
                </Button>
            </div>
        </FormControl>
    );
};
