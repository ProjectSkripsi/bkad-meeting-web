import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	List,
} from 'reactstrap';

const ModalNoTulen = ({ isOpen, setIsOpen, data }) => {
	function createMarkup() {
		return { __html: data };
	}

	return (
		<Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size='lg'>
			<ModalHeader>Hasil Meeting</ModalHeader>
			<ModalBody>
				<div dangerouslySetInnerHTML={createMarkup()} />
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Tutup
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalNoTulen;
