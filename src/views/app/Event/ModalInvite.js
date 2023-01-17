import React, { useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	List,
} from 'reactstrap';

const ModalInvite = ({ isOpen, setIsOpen, titleModal, data }) => {
	return (
		<Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
			<ModalHeader>{titleModal}</ModalHeader>
			<ModalBody>
				<ul>
					{data &&
						data.map((item) => <li key={item._id}>{item?.name || ''}</li>)}
				</ul>
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Tutup
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalInvite;
