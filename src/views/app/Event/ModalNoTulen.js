import React, { useState, useEffect } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	List,
} from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillModules = {
	toolbar: [
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' },
		],
		['link', 'image'],
		['clean'],
	],
};

const quillFormats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
];
const ModalNoTulen = ({ isOpen, setIsOpen, onSaveNoTulen, data }) => {
	const { _id, eventResult } = data;
	const [textQuillStandart, setTextQuillStandart] = useState(eventResult);
	useEffect(() => {
		setTextQuillStandart(eventResult || '');
	}, []);

	const onSave = () => {
		onSaveNoTulen(_id, textQuillStandart, (next) => {
			if (next.status === 200) {
				setIsOpen(!isOpen);
			}
		});
	};

	return (
		<Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size='lg'>
			<ModalHeader>Masukkan Hasil Meeting</ModalHeader>
			<ModalBody>
				<ReactQuill
					theme='snow'
					value={textQuillStandart}
					onChange={(val) => setTextQuillStandart(val)}
					modules={quillModules}
					formats={quillFormats}
				/>
			</ModalBody>
			<ModalFooter>
				<Button color='secondary' onClick={() => setIsOpen(false)}>
					Tutup
				</Button>
				<Button color='primary' onClick={() => onSave()}>
					Simpan
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default ModalNoTulen;
