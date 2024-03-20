import React, { useState, useEffect, useRef } from "react";
import DeleteConfirmation from "../components/DeleteConfirmation"; // Import the delete confirmation modal component
import DeleteAllConfirmation from "../components/DeleteAllConfirmation"; // Import the delete confirmation modal component


export default function MyTodoList() {
    const [todos, setTodos] = useState(getStoredTodos());
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editTask, setEditTask] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [viewTask, setViewTask] = useState({ id: "", title: "", description: "" });
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [deleteAllModalOpen, setDeleteAllModalOpen] = useState(false);

    const ViewModal = ({ isOpen, onClose, task, onEditDescription, onSaveDescription }) => {
        const textAreaRef = useRef(null); // Add useRef hook
    
        useEffect(() => {
            if (isOpen && textAreaRef.current) {
                textAreaRef.current.focus(); // Set focus when the modal is opened
                const length = task.description.length;
                textAreaRef.current.setSelectionRange(length, length); // Set cursor position at the end of the text
            }
        }, [isOpen, task.description]);
    
        const handleSave = () => {
            const trimmedDescription = task.description.trim(); // Trim the description
        
            if (!trimmedDescription) {
                alert("Please provide a description"); // Show alert if the description is empty
                return;
            }
        
            onSaveDescription(task.id, task.title, trimmedDescription); // Pass task id, title, and trimmed description to onSaveDescription function
            onClose(); // Close the modal after saving
            setShowSuccessModal(true); // Show success modal
        };
        
    
        return (
            <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{task.title}</h5>
                            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body textarea-container">
                            <textarea
                                ref={textAreaRef} // Assign the ref to the textarea element
                                className="form-control"
                                placeholder="Task's Description"
                                value={task.description}
                                onChange={(e) => onEditDescription(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary saveButton" onClick={handleSave}>Save</button>
                            <button type="button" className="btn btn-secondary cancelButton" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    function getStoredTodos() {
        let data = localStorage.getItem("todos");
        let parsedData = JSON.parse(data);
        if (parsedData) {
            return parsedData;
        }
        return [];
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(event) {
        event.preventDefault();
        let task = event.target.task.value;
        let description = event.target.description.value;
        if (!task || !description) {
            alert("Please provide a valid task and description");
            return;
        }
        const currentDate = new Date();
        setTodos([...todos, { id: Math.random().toString(36).substr(2, 9), task: task, description: description, completed: false, date: currentDate }]);
        event.target.reset();
    }

    function changeTaskStatus(index) {
        let newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function deleteTask(index) {
        let newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    function handleDeleteConfirmation(taskId) {
        setTaskToDelete(taskId);
        setDeleteModalOpen(true);
    }

    function handleDeleteTask() {
        deleteTask(taskToDelete);
        setDeleteModalOpen(false);
    }

    function handleEdit(index) {
        setEditingIndex(index);
        setEditTask(todos[index].task);
        setEditDescription(todos[index].description);
    }

    function updateTask(index) {
        if (!editTask.trim() || !editDescription.trim()) {
            alert("Please provide a valid task and description");
            return;
        }
    
        let newTodos = [...todos];
        newTodos[index].task = editTask;
        newTodos[index].description = editDescription;
        setTodos(newTodos);
        setEditingIndex(-1);
        setEditTask("");
        setEditDescription("");
    }
    
    function cancelEdit() {
        setEditingIndex(-1);
        setEditTask("");
        setEditDescription("");
    }

    function handleView(index) {
        const taskToView = todos[index];
        setViewTask({ id: taskToView.id, title: taskToView.task, description: taskToView.description });
        setModalOpen(true);
    }

    function onSaveDescription(id, title, updatedDescription) {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task: title, description: updatedDescription } : todo
        );
        setTodos(updatedTodos);
        setModalOpen(false);
        setShowSuccessModal(true); // Show success modal
    }

    function handleDeleteAllConfirmation() {
        setDeleteAllModalOpen(true);
    }
    function handleDeleteAllTasks() {
        setTodos([]); // Clear all tasks
        setDeleteAllModalOpen(false); // Close the delete all modal
    }
    function markAllTasksComplete() {
        const updatedTodos = todos.map(todo => ({
            ...todo,
            completed: true,
        }));
        setTodos(updatedTodos);
    }
    
    function markAllTasksIncomplete() {
        const updatedTodos = todos.map(todo => ({
            ...todo,
            completed: false,
        }));
        setTodos(updatedTodos);
    }
    function removeAllCompletedTasks() {
        const updatedTodos = todos.filter(todo => !todo.completed);
        setTodos(updatedTodos);
    }
    return (
        <div className="container my-5">
            <div className="mx-auto rounded-4 p-4 shadow p-3 mb-5 container-background">
                <h2 className="text-white text-center mb-5 fw-bold">My To-Do List</h2>

                <form className="row g-2" onSubmit={handleSubmit}>
                    <div className="col-12 col-md-8">
                        <input className="form-control" placeholder="Add New Task" name="task" />
                    </div>
                    <div className="col-12 col-md-2">
                        <button className="btn btn-outline-light btn-custom addTask" type="submit">Add Task</button>
                    </div>
                    <div className="col-12 col-md-8">
                        <textarea className="form-control" placeholder="Task's Description" name="description" style={{ width: "100%" }} />
                    </div>
                </form>

                <div className="row g-2" style={{ marginTop: "10px" }}>
                    <div className="col">
                        <button className="btn btn-outline-light btn-custom delete" type="button" onClick={handleDeleteAllConfirmation} style={{ fontSize: "14px", paddingLeft: "45px", paddingRight: "40px" }}>Delete All Task</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-light btn-custom complete" type="button" onClick={markAllTasksComplete} style={{ fontSize: "14px" }}>Mark All As Complete</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-light btn-custom incomplete" type="button" onClick={markAllTasksIncomplete} style={{ fontSize: "14px" }}>Mark All As Incomplete</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-outline-light btn-custom remove" type="button" onClick={removeAllCompletedTasks} style={{ fontSize: "14px" }}>Remove All Completed</button>
                    </div>
                </div>

                <div className="row text-white fw-bold" style={{ marginTop: "12px" }}>
                    <div className="col">Tasks</div>
                    <div className="col">Date Added</div>
                    <div className="col">Actions</div>
                </div>
        <div className="task-container">
            {todos.length === 0 ? (
            <div className="text-center text-white mt-3">You don't have any tasks</div>
            ) : (
            todos.map((todo, index) => (
                <div key={index} className="d-flex flex-row align-items-center rounded mt-3 p-2" style={{ backgroundColor: todo.completed ? "DarkGray" : "LightGray", textDecoration: todo.completed ? 'line-through' : 'none' }}>
                            
                            <div className="col">{editingIndex === index ? (
                                <input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} className="input-editTask" />
                            ) : (
                                todo.task
                            )}</div>
                            <div className="col">{new Date(todo.date).toLocaleString()}</div>
                            <div className="col">
                                {editingIndex === index ? (
                                    <>
                                        <button className="btn btn-outline-primary me-2 saveButton" onClick={() => updateTask(index)}>Save</button>
                                        <button className="btn btn-outline-danger cancelButton" onClick={() => cancelEdit()}>Cancel</button>
                                    </>
                                ) : (
                                    <>
                                        <i className={"h5 me-2 action-btn " + (todo.completed ? "bi bi-check2-square" : "bi bi-square")} onClick={() => changeTaskStatus(index)} title={todo.completed ? "Unmark Task" : "Mark Task"}></i>
                                        <i className="bi bi-eye h5 me-2 action-btn" onClick={() => handleView(index)} title="View Description"></i>
                                        <i className="bi bi-pencil-square h5 me-2 action-btn" onClick={() => handleEdit(index)} title="Edit Task Title"></i>
                                        <i className="bi bi-trash h5 action-btn" onClick={() => handleDeleteConfirmation(todo.id)} title="Delete Task"></i>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                )}
        </div>
                {/* show success modal when description's successfully saved */}
                {showSuccessModal && (
                    <div className="modal show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                        <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "300px" }}>
                            <div className="modal-content">
                                <div className="modal-header" style={{ borderBottom: "none", paddingBottom: "0" }}>
                                    <button type="button" className="btn btn-close" onClick={() => setShowSuccessModal(false)}>
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                </div>
                                <div className="modal-body" style={{ padding: "30px", paddingTop: "10px", fontSize: "20px" }}>
                                    <i className="bi bi-check-circle" style={{ color: "#5E1B89", fontSize: "36px", marginRight: "10px" }}></i> Saved
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Show the delete confirmation modal */}
                <DeleteConfirmation isOpen={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={handleDeleteTask} />
                <DeleteAllConfirmation isOpen={deleteAllModalOpen} onClose={() => setDeleteAllModalOpen(false)} onDeleteAll={handleDeleteAllTasks}/>
                <ViewModal isOpen={modalOpen} onClose={() => setModalOpen(false)} task={viewTask} onEditDescription={(description) => setViewTask({ ...viewTask, description })} onSaveDescription={onSaveDescription} />
            </div>
        </div>
    );
}
