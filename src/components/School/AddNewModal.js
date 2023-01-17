import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation';
import IntlMessages from '../../helpers/IntlMessages';
import { isEmpty } from 'lodash';

const AddNewModal = ({
  data,
  modalOpen,
  toggleModal,
  onChange,
  onSubmit,
  district,
  subDistricts,
  villages,
  onChangeDistrict,
  onChangeSubDistrict,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Tambah Sekolah</ModalHeader>
      <ModalBody>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <AvGroup>
            <Label>Nama Sekolah</Label>
            <AvInput
              required
              name="name"
              value={data.name}
              onChange={onChange}
            />
            <AvFeedback>Nama wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>No. Telepon</Label>
            <AvInput
              required
              name="contact"
              type="number"
              value={data.contact}
              onChange={onChange}
            />
            <AvFeedback>No Telepon wajib di isi!</AvFeedback>
          </AvGroup>
          <AvRadioGroup
            className="error-l-150 "
            name="schoolType"
            required
            value={data.schoolType}
          >
            <Label className="d-block mt-4">Tipe Sekolah</Label>
            <AvRadio
              customInput
              onChange={onChange}
              label="Dasar"
              value="Dasar"
            />
            <AvRadio
              customInput
              onChange={onChange}
              label="Menengah"
              value="Menengah"
            />
          </AvRadioGroup>
          <AvGroup>
            <Label>Alamat</Label>
            <AvInput
              type="textarea"
              name="address"
              id="description"
              required
              value={data.address}
              onChange={onChange}
            />
            <AvFeedback>Wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <AvField
              type="select"
              name="district"
              required
              label="Kabupaten/Kota"
              errorMessage="Wajib di isi!"
              onChange={onChangeDistrict}
              value={data.district}
            >
              <option value="" />
              {district &&
                district.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.nama}
                  </option>
                ))}
            </AvField>
          </AvGroup>
          <AvGroup>
            <AvField
              type="select"
              name="subDistrict"
              required
              label="Kecamatan"
              errorMessage="Wajib di isi!"
              onChange={onChangeSubDistrict}
              value={data.subDistrict}
              disabled={isEmpty(subDistricts)}
            >
              <option value="" />
              {subDistricts &&
                subDistricts.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.nama}
                  </option>
                ))}
            </AvField>
          </AvGroup>
          <AvGroup>
            <AvField
              type="select"
              name="village"
              required
              label="Kelurahan/Desa"
              errorMessage="Wajib di isi!"
              onChange={onChange}
              value={data.village}
              disabled={isEmpty(villages)}
            >
              <option value="" />
              {villages &&
                villages.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.nama}
                  </option>
                ))}
            </AvField>
          </AvGroup>
          <Button
            color="secondary"
            outline
            onClick={toggleModal}
            className="mt-5 mr-5 ml-4"
          >
            <IntlMessages id="pages.cancel" />
          </Button>
          <Button color="primary" className="mt-5 ml-5">
            <IntlMessages id="pages.submit" />
          </Button>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

export default AddNewModal;
