import React from 'react';

const DeleteConfirmation = ({ isOpen, onClose, onDelete }) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "350px" }}>
                <div className="modal-content">
                <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete Task</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ padding: "35px" }}>
                        Are you sure you want to delete this task?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary DeleteYes" onClick={onDelete}>Yes</button>
                        <button type="button" className="btn btn-secondary DeleteNo" onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
