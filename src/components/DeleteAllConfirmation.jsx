import React from 'react';

const DeleteAllConfirmation = ({ isOpen, onClose, onDeleteAll }) => {
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Delete All Tasks</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        Are you sure you want to delete all tasks?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger DeleteYes" onClick={onDeleteAll}>Delete All</button>
                        <button type="button" className="btn btn-secondary DeleteNo" onClick={onClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DeleteAllConfirmation;
