import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomAlert from "../../generic/CustomAlert";

const UpdateTask = (props) => {
    const [status, setStatus] = useState(undefined);
    const [haveDeadline, setHaveDeadline] = useState(props.task.haveDeadline);

    const form = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        for (let i = 0; i < props.tasks.length; i++) {
            if (
                props.tasks[i].id !== props.task.id &&
                props.tasks[i].title === e.target.title.value
            ) {
                return setStatus(
                    "You have already added a similar work title..."
                );
            }
        }

        const deadline =
            haveDeadline && e.target.date.value && e.target.time.value
                ? `${e.target.date.value}T${e.target.time.value}`
                : `${new Date().toLocaleDateString(
                      "en-CA"
                  )}T${new Date().toLocaleTimeString("en-US", {
                      hour12: false,
                      hour: "2-digit",
                      minute: "2-digit",
                  })}:00`;

        const API_URL = `/${props.wid}/task/update/${props.task.id}`;

        const loadData = async () => {
            try {
                fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        deadline,
                        haveDeadline,
                        title: e.target.title.value,
                    }),
                });

                // Try to create a universal status to handle all this kind of shits
                // const data = await response.json();

                // if (!response.ok) setStatus(data.detail);
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();

        props.updateFlag();
        props.toggleEdit({ id: null, status: false });
    };

    return (
        <Form ref={form} onSubmit={handleSubmit}>
            <div className="card-body">
                {status && <CustomAlert status={status} />}

                <Form.Label>Task Title</Form.Label>
                <Form.Group>
                    <Form.Control
                        required
                        type="text"
                        name="title"
                        defaultValue={props.task.title}
                        placeholder="Task..."
                    />
                </Form.Group>

                {haveDeadline ? (
                    <>
                        <Form.Check
                            defaultChecked
                            type="checkbox"
                            label="Deadline"
                            name="haveDeadline"
                            className="mt-3 mb-2"
                            onClick={() => setHaveDeadline(!haveDeadline)}
                        />
                        <div className="form-inline justify-content-center">
                            <Form.Control
                                type="date"
                                name="date"
                                className="mr-2"
                                defaultValue={props.task.deadline.split("T")[0]}
                            />
                            <Form.Control
                                type="time"
                                name="time"
                                defaultValue={props.task.deadline.split("T")[1]}
                            />
                        </div>

                        <Form.Text className="text-muted">
                            Safari browser is not supported for editing deadline
                        </Form.Text>
                    </>
                ) : (
                    <>
                        <Form.Check
                            type="checkbox"
                            label="Add Deadline"
                            name="haveDeadline"
                            className="mt-3"
                            onClick={() => setHaveDeadline(!haveDeadline)}
                        />
                    </>
                )}
            </div>

            <div className="card-footer justify-content-around">
                <Button size="sm" type="submit" variant="main" className="w-25">
                    <FontAwesomeIcon
                        className="mb-1 mr-sm-1"
                        icon={["fa", "wrench"]}
                    />
                    <span className="d-none d-sm-inline">Update</span>
                </Button>
            </div>
        </Form>
    );
};

export default UpdateTask;
