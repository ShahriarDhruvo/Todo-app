import React, { useState, useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import Header from "../../generic/Header";
import { TokenContext } from "../../contexts/TokenContext";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [workTitle, setWorkTitle] = useState(undefined);
    const [status, setStatus] = useState(undefined);
    const [variant, setVariant] = useState("danger");
    const [flag, setFlag] = useState(true);

    const params = useParams();
    const { token } = useContext(TokenContext);

    useEffect(() => {
        let API_URL = `/${params.wid}/task/list/`;

        const loadData = async () => {
            let response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            let data = await response.json();

            if (response.status === 404) {
                setVariant("info");
                setStatus(data.detail);
            } else if (response.status === 403) setStatus(data.detail);
            else setTasks(data);

            API_URL = "/work/details/" + params.wid;

            response = await fetch(API_URL, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });

            data = await response.json();

            response.ok ? setWorkTitle(data[0].title) : setStatus(data.detail);
        };

        if (token) loadData();
    }, [params.wid, flag, token]);

    const updateFlag = () => setFlag(!flag);

    return (
        <Container>
            <Header title={workTitle} subTitle=" " />
            <AddTask
                token={token}
                tasks={tasks}
                wid={params.wid}
                updateFlag={updateFlag}
            />
            <Tasks
                tasks={tasks}
                token={token}
                status={status}
                wid={params.wid}
                variant={variant}
                updateFlag={updateFlag}
            />
        </Container>
    );
};

export default Task;
