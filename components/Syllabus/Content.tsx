import React from "react";
import Loading from "@components/Loading";
import { UpdateButton, UpdateInfo } from "@components/UpdatableResource";
import { useUpdatableResource } from "@hooks/useUpdatableResource";
import { Course } from "@types";
import { useEffect, useState } from "react";
import FormattedContent from "@components/Lessons/FormattedContent";
import moment from "moment";
import InnerHTMLComponent from "@components/InnerHTMLComponent";
import { isMobile } from "@syncfusion/ej2-react-schedule";
import { AccountTree, Timeline, Help, Equalizer, MenuBook, Language } from "@mui/icons-material";
import { Box, Typography, Paper, Accordion, AccordionSummary, AccordionDetails, Collapse } from "@mui/material";
import { useTheme } from '@mui/system'

export type SyllabusDay = {
    description: string;
    startDate?: string;
    endDate?: string;
}
export type SyllabusReference = {
    type?: string;
    description: string;
}
export type Exam = {
    description: string;
    date?: string;
}
export type Syllabus = {
    methods: string;
    assessmentProcedures: string;
    attendanceSchedule: string;
    schedule: SyllabusDay[];
    exams: Exam[];
    references: {
        basic: SyllabusReference[];
        supplementary: SyllabusReference[];
    }
}
export default function Syllabus(props: { course?: Course; loading: boolean; updateSyllabus: () => void }) {
    const updateHook = useUpdatableResource<Course>(props.course);
    const [courseTitle, setCourseTitle] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (props.course) {
            setCourseTitle(props.course.title);
        }
    }, [props.course]);
    const updateResource = () => updateHook.updateResource(props.updateSyllabus);
    const isLoading = props.loading || updateHook.isUpdating;
    return (
        <Box padding={1} minWidth={"50%"}>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <Typography
                    textAlign="center"
                    fontWeight="500"
                    fontSize={"1.5rem"}
                    whiteSpace="break-spaces"
                    mb={1}
                >
                    Plano de ensino
                </Typography>
            </Box>
            <Typography
                textAlign="center"
                fontWeight="400"
                fontSize={"1.2rem"}
                whiteSpace="break-spaces"
                mb={1}
            >
                {courseTitle}
            </Typography>
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                <UpdateButton updateHook={updateHook} update={updateResource} />
                {!props.course || isLoading ? (
                    <Loading value={isLoading} />
                ) : (
                    <>
                        <UpdateInfo updateHook={updateHook} timestamp={props.course.timestamp} />
                        {props.course.syllabus ? (
                            <>
                                <Box mt={1}>
                                    <Paper elevation={2} sx={{ padding: ".5rem", maxWidth: "1000px", margin: ".5rem" }}>
                                        <AccordionTopicSyllabus title={"Metodologia"} icon={<AccountTree />} >
                                            <FormattedContent>
                                                {props.course.syllabus.methods}
                                            </FormattedContent>
                                        </AccordionTopicSyllabus>
                                            <AccordionTopicSyllabus title={"Procedimentos de avaliação"} icon={<Timeline />} defaultExpanded={!isMobile()}>
                                            <FormattedContent>
                                                {props.course.syllabus.assessmentProcedures}
                                            </FormattedContent>
                                        </AccordionTopicSyllabus>
                                    </Paper>
                                </Box>
                                <Box mt={1} width={"100%"} display={"flex"} justifyContent="space-evenly" flexWrap={"wrap"} maxWidth={"1500px"}>
                                    <Paper elevation={2} sx={{ padding: ".5rem", margin: ".5rem", width: "100%", height: "100%", maxWidth: "350px" }}>
                                        <CollapseTopicSyllabus title={"Horário de atendimento"} icon={<Help sx={{ mr: "0.5rem" }} />} defaultExpanded={true}>
                                            <Typography m={1} >
                                                {props.course.syllabus.attendanceSchedule ? props.course.syllabus.attendanceSchedule.split("\n").map((item, key) => {
                                                    return <>
                                                        <InnerHTMLComponent key={key}>{item}</InnerHTMLComponent>
                                                        <br />
                                                    </>
                                                }) : "Não informado"}
                                            </Typography>
                                        </CollapseTopicSyllabus>
                                    </Paper>
                                    <Paper elevation={2} sx={{ padding: ".5rem", margin: ".5rem", width: "100%", height: "100%", maxWidth: "350px" }}>
                                        <CollapseTopicSyllabus title={"Avaliações programadas"} icon={<Equalizer sx={{ mr: "0.5rem" }} />} defaultExpanded={true}>
                                            <Box sx={{ display: "flex", flexDirection: "column", mb: ".5rem", justifyContent: "space-around" }}>
                                                {props.course?.syllabus?.exams.map((exam, index) => (
                                                    <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: ".5rem", alignItems: "center" }}>
                                                        <Typography fontSize={"1.2rem"} mb={".5rem"}>{exam.description}</Typography>
                                                        <Typography mb={".5rem"}>{exam.date ? moment(exam.date).format("DD/MM/YYYY") : "-"}</Typography>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </CollapseTopicSyllabus>
                                    </Paper>
                                </Box>
                                <Box mt={1} display={"flex"} flexWrap={"wrap"} justifyContent={"space-evenly"} width={"100%"} maxWidth={"2500px"}>
                                    <Paper elevation={2} sx={{ padding: ".5rem", width: "130%", maxWidth: "500px", margin: ".5rem" }}>
                                        <Typography variant="h6" fontWeight="500" mb={".5rem"}>Bibliografia básica</Typography>
                                        {props.course.syllabus.references.basic.map((reference, index) => (
                                            <ReferenceComponent key={index} reference={reference} />
                                        ))}
                                    </Paper>
                                    <Paper elevation={2} sx={{ padding: ".5rem", width: "130%", maxWidth: "500px", margin: ".5rem" }}>
                                        <Typography variant="h6" fontWeight="500" mb={".5rem"}>Bibliografia Complementar</Typography>
                                        {props.course.syllabus.references.supplementary.map((reference, index) => (
                                            <ReferenceComponent key={index} reference={reference} />
                                        ))}
                                    </Paper>
                                </Box>
                            </>
                        ) : null}
                    </>
                )}
            </Box>
        </Box>
    )
}

function ReferenceComponent(props: { reference: SyllabusReference }): JSX.Element {
    return <Typography variant="body1" fontWeight="400" mb={".5rem"}>
        <Box sx={{ display: "flex", flexDirection: "row", mb: "1rem" }}>
            <span style={{ marginRight: ".5rem" }}>
                {props.reference.type === "Livro" ? <MenuBook />
                    : props.reference.type === "Site" ? <Language />
                        : <b>{props.reference.type}</b>}
            </span>
            <InnerHTMLComponent>{props.reference.description}</InnerHTMLComponent>
        </Box>
    </Typography>;
}

export function AccordionTopicSyllabus(props: { title: string; children: React.ReactNode; icon: JSX.Element; defaultExpanded?: boolean }) {
    const theme = useTheme();
    return <Accordion defaultExpanded={props.defaultExpanded}>
        <AccordionSummary sx={{
            flexDirection: "row-reverse",
            backgroundColor: theme.palette.primary[900],
        }} expandIcon={props.icon}>
            <Typography m={1}>{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Typography mb={".5rem"} sx={{ textAlign: "justify", }}>
                {props.children}
            </Typography>
        </AccordionDetails>
    </Accordion >;
}
export function CollapseTopicSyllabus(props: { title: string; children: React.ReactNode; icon: JSX.Element; defaultExpanded?: boolean }) {
    const [expanded, setExpanded] = React.useState(props.defaultExpanded);
    return (
        <Box>
            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} height="64px" onClick={() => setExpanded(!expanded)}
                sx={{ cursor: "pointer", userSelect: "none" }} p={1}
                component={Paper} elevation={1}
            >
                {props.icon}
                <Typography>
                    {props.title}
                </Typography>
            </Box>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Box sx={{ display: "flex", flexDirection: "column" }} component={Paper} elevation={1}>
                    <Typography m={1}>
                        {props.children}
                    </Typography>
                </Box>
            </Collapse >
        </Box>
    )
}
