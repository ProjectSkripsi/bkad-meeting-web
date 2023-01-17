import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import axios from 'axios';
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
import { getToken } from '../../../helpers/Utils';
import { baseUrl } from '../../../constants/defaultValues';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  data,
  onChange,
  onSubmit,
  isUpdate,
}) => {
  const [units, setUnit] = useState([]);
  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      axios
        .get(`${baseUrl}/unit`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setUnit(data);
        });
    }
    fetchData();
  }, []);

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName='modal-right'
      backdrop='static'
    >
      <ModalHeader toggle={toggleModal}>
        {!isUpdate ? ' Tambah Anggota Dewan' : 'Update Anggota Dewan'}
      </ModalHeader>
      <ModalBody>
        <AvForm
          className='av-tooltip tooltip-label-right'
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <AvGroup>
            <Label>NIP</Label>
            <AvInput
              required
              name='memberId'
              value={data.memberId}
              onChange={onChange}
            />
            <AvFeedback>NIP wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Nama</Label>
            <AvInput required name='name' value={data.name} onChange={onChange} />
            <AvFeedback>Nama wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Email</Label>
            <AvInput
              required
              name='email'
              value={data.email}
              onChange={onChange}
            />
            <AvFeedback>Email wajib di isi!</AvFeedback>
          </AvGroup>
          {!isUpdate && (
            <AvGroup>
              <Label>Password</Label>
              <AvInput
                required
                name='password'
                value={data.password}
                onChange={onChange}
                type='password'
              />
              <AvFeedback>Password wajib di isi!</AvFeedback>
            </AvGroup>
          )}
          {/* <AvGroup>
            <Label>Fraksi</Label>
            <AvInput
              required
              name='fraksi'
              value={data.fraksi}
              onChange={onChange}
            />
            <AvFeedback>Fraksi wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Partai</Label>
            <AvInput
              required
              name='party'
              value={data.party}
              onChange={onChange}
            />
            <AvFeedback>Partai wajib di isi!</AvFeedback>
          </AvGroup> */}
          <AvGroup>
            <Label>No Hp</Label>
            <AvInput
              required
              name='contact'
              value={data.contact}
              onChange={onChange}
            />
            <AvFeedback>No Hp wajib di isi!</AvFeedback>
          </AvGroup>

          {/* <AvGroup>
						<Label>Foto Profile</Label>
						<AvInput
							required
							name='avatarUrl'
							value={data.avatarUrl}
							onChange={onChange}
						/>
						<AvFeedback>Foto wajib di isi!</AvFeedback>
					</AvGroup> */}

          {/* <AvGroup>
            <AvField
              type='select'
              name='unit'
              label='Bidang'
              onChange={onChange}
              value={data?.unit?._id}
            >
              <option value=''></option>
              {units &&
                units.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
            </AvField>
            <AvFeedback>Bidang wajib di isi!</AvFeedback>
          </AvGroup> */}
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
