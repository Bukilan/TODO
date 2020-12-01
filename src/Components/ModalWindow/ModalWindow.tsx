import React, { ReactElement } from 'react';
import Modal from '@material-ui/core/Modal';
import './ModalWindow.scss';

type Props = {
    isOpen: boolean,
    handleClose: () => void
    children: ReactElement,
}

const ModalWindow = ({ isOpen, handleClose, children }: Props): ReactElement => {
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            {children}
        </Modal>
    );
}

export default ModalWindow;
