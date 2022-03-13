import React, {useEffect, useState} from "react";
import {ProjectCard} from "./ProjectCard";
import {makeStyles} from "@material-ui/core/styles";
import {ProjectType} from "../../common/types/ProjectType";

interface ProjectsListProps {
    projects: Array<ProjectType>;
}

const useProjectsListStyles = makeStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});

export const ProjectsList: React.FC<ProjectsListProps> = ({projects}) => {
    const classes = useProjectsListStyles();
    const projectsPerPage = 20;
    const [projectToShowOnPage, setProjectsToShowOnPage] = useState<Array<ProjectType>>([...projects.slice(0, projectsPerPage + 1)]);

    let projectsNumber = projectsPerPage;

    function handleScroll() {
        const isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;

        if (isAtBottom) {
            projectsNumber += projectsPerPage;
            setProjectsToShowOnPage([...projects.slice(0, projectsNumber + 1)]);
        }
    }

    useEffect(() => {
        setProjectsToShowOnPage([...projects.slice(0, projectsPerPage + 1)])
        projectsNumber = projectsPerPage
    }, [projects]);


    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, []);

    return (
        <div className={classes.container}>
            {projectToShowOnPage.map((project: ProjectType) => (
                <ProjectCard
                    key={project.uniqueId}
                    date={project.creationDate}
                    name={project.projectName}
                    status={project.status}
                />
            ))}
        </div>
    );
};
