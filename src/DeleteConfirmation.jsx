import React from 'react';

const DeleteConfirmation = ({ isOpen, onClose, onDelete }) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ maxWidth: "350px" }}>
                <div className="modal-content">
                    <div className="modal-body" style={{ padding: "35px" }}>
                        Are you sure you want to delete this task?
                    </div>
                    <div className="modal-footer" style={{ borderTop: "none", paddingBottom: "0" }}>
                        <button type="button" className="btn btn-primary DeleteYes" onClick={onDelete}>Yes</button>
                        <button type="button" className="btn btn-secondary DeleteNo" onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmation;
