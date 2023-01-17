import React from 'react';
import {
	CustomInput,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Label,
} from 'reactstrap';
import {
	AvForm,
	AvField,
	AvGroup,
	AvInput,
	AvFeedback,
	AvRadioGroup,
	AvRadio,
} from 'availity-reactstrap-validation';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import IntlMessages from '../../../helpers/IntlMessages';

const AddNewModal = ({
	modalOpen,
	toggleModal,
	data,
	onChange,
	onSubmit,
	isUpdate,
}) => {
	return (
		<Modal
			isOpen={modalOpen}
			toggle={toggleModal}
			wrapClassName='modal-right'
			backdrop='static'
		>
			<ModalHeader toggle={toggleModal}>Tambah Ruangan</ModalHeader>
			<ModalBody>
				<AvForm
					className='av-tooltip tooltip-label-right'
					onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
				>
					<AvGroup>
						<Label>Kode Ruangan</Label>
						<AvInput
							required
							name='roomId'
							value={data.roomId}
							onChange={onChange}
						/>
						<AvFeedback>Kode Ruangan wajib di isi!</AvFeedback>
					</AvGroup>
					<AvGroup>
						<Label>Ruangan</Label>
						<AvInput
							required
							name='room'
							value={data.room}
							onChange={onChange}
						/>
						<AvFeedback>Ruangan wajib di isi!</AvFeedback>
					</AvGroup>

					<AvRadioGroup
						className='error-l-150 '
						name='category'
						required
						value={data.category}
					>
						<Label className='d-block mt-4'>Kategory</Label>
						<AvRadio
							customInput
							onChange={onChange}
							label='Online'
							value='online'
						/>
						<AvRadio
							customInput
							onChange={onChange}
							label='Offline'
							value='offline'
						/>
					</AvRadioGroup>
					<AvGroup>
						<Label>Keterangan</Label>
						<AvInput
							required
							name='description'
							placeholder='keterangan/url meeting'
							value={data.description}
							onChange={onChange}
							type='textarea'
						/>
						<AvFeedback>Keterangan wajib di isi!</AvFeedback>
					</AvGroup>
					<Button
						color='secondary'
						outline
						onClick={toggleModal}
						className='mt-5 mr-5 ml-4'
					>
						<IntlMessages id='pages.cancel' />
					</Button>
					<Button color='primary' className='mt-5 ml-5'>
						<IntlMessages id='pages.submit' />
					</Button>
				</AvForm>
			</ModalBody>
		</Modal>
	);
};

export default AddNewModal;
