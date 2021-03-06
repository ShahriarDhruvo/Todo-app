import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "../../generic/Modal";
import UpdateTask from "./UpdateTask";
import RemainingTime from "../../generic/RemainingTime";

const Tasks = (props) => {
    const [edit, setEdit] = useState({
        id: null,
        status: false,
    });
    const [status, setStatus] = useState(props.status);
    const [variant, setVariant] = useState(props.variant);

    const markAsCompleted = (task) => {
        const completed = !task.completed;
        const API_URL = `/${props.wid}/task/update/${task.id}`;

        const loadData = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        Authorization: props.token,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        completed: completed,
                        title: task.title,
                    }),
                });

                const data = await response.json();

                if (response.status === 404) {
                    setVariant("info");
                    setStatus(data.detail);
                } else if (response.status === 403) setStatus(data.detail);
                else props.updateFlag();
            } catch (error) {
                setStatus(error);
            }
        };

        loadData();
    };

    const toggleEdit = (id, status) => {
        setEdit({ id, status });
    };

    const deleteItem = (id) => {
        const API_URL = `/${props.wid}/task/delete/${id}`;

        const loadData = async () => {
            const response = await fetch(API_URL, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    Authorization: props.token,
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 404) {
                setVariant("info");
                setStatus("Item not found");
            } else if (response.status === 403)
                setStatus("You are not authorized to delete this item");
            else props.updateFlag();
        };

        loadData();
    };

    return (
        <>
            {props.tasks.length ? (
                <div className="row text-center">
                    <div className="text-center">
                        {status && <Alert variant={variant}>{status}</Alert>}
                    </div>
                    {props.tasks.map((task, index) => (
                        <div key={index} className="col-lg-6 align-self-center">
                            <div
                                className={
                                    "ccard my-1 " +
                                    (task.completed
                                        ? "bg-complete-bg"
                                        : "bg-main-bg")
                                }
                            >
                                {!(edit.status && edit.id === task.id) ? (
                                    <>
                                        <div className="card-body">
                                            {!task.completed ? (
                                                <span>{task.title}</span>
                                            ) : (
                                                <strike>{task.title}</strike>
                                            )}

                                            {task.haveDeadline ? (
                                                <div className="mt-2">
                                                    <small>
                                                        {/* <b>Deadline: </b>
                                                {Moment(task.deadline).format(
                                                    "MMM DD, YY "
                                                )}
                                                at
                                                {Moment(task.deadline).format(
                                                    " hh:mm a"
                                                )} */}
                                                        <RemainingTime
                                                            deadline={
                                                                task.deadline
                                                            }
                                                        />
                                                    </small>
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                        </div>

                                        <div className="card-footer justify-content-around action-button">
                                            <Button
                                                onClick={() =>
                                                    markAsCompleted(task)
                                                }
                                                variant={
                                                    task.completed
                                                        ? "info"
                                                        : "complete"
                                                }
                                                className="w-25"
                                                disabled={edit.status}
                                                size="sm"
                                            >
                                                {!task.completed ? (
                                                    <>
                                                        <FontAwesomeIcon
                                                            className="mb-1 mr-sm-1"
                                                            icon={[
                                                                "fas",
                                                                "check",
                                                            ]}
                                                        />
                                                        <span className="d-none d-sm-inline">
                                                            Complete
                                                        </span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon
                                                            className="mb-1 mr-sm-1"
                                                            icon={["fa", "ban"]}
                                                        />
                                                        <span className="d-none d-sm-inline">
                                                            Incomplete
                                                        </span>
                                                    </>
                                                )}
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="main"
                                                className="w-25"
                                                disabled={edit.status}
                                                onClick={() =>
                                                    toggleEdit(task.id, true)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    className="mb-1 mr-sm-1"
                                                    icon={["fas", "edit"]}
                                                />
                                                <span className="d-none d-sm-inline">
                                                    Edit
                                                </span>
                                            </Button>

                                            <CustomModal
                                                edit={edit.status}
                                                variant="remove"
                                                modalTitle="Delete"
                                                actionButtonSize="sm"
                                                actionVariant="danger"
                                                actionButtonClass="w-25"
                                                handleAction={() =>
                                                    deleteItem(task.id)
                                                }
                                                modalBody="Do you really want to delete this task?"
                                            >
                                                <FontAwesomeIcon
                                                    className="mb-1 mr-sm-1"
                                                    icon={["fas", "trash"]}
                                                />
                                                <span className="d-none d-sm-inline">
                                                    Remove
                                                </span>
                                            </CustomModal>
                                        </div>
                                    </>
                                ) : (
                                    <UpdateTask
                                        task={task}
                                        token={props.token}
                                        tasks={props.tasks}
                                        wid={task.work_name}
                                        toggleEdit={toggleEdit}
                                        updateFlag={props.updateFlag}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="ccard card-body text-center">
                    <Alert variant="info" className="m-0">
                        Your task list is empty!
                    </Alert>
                </div>
            )}
        </>
    );
};

export default Tasks;
