import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation';
import axios from 'axios';
import Select from 'react-select';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { baseUrl } from '../../../constants/defaultValues';
import IntlMessages from '../../../helpers/IntlMessages';
import { getToken } from '../../../helpers/Utils';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  data,
  onChange,
  onSubmit,
  isUpdate,
  setStartDateTime,
  setEndDateTime,
  startDateTime,
  endDateTime,
  selectedOptions,
  setSelectedOptions
}) => {
  const [rooms, setRooms] = useState([]);
  const [selectData, setSeletData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = getToken();
      axios
        .get(`${baseUrl}/room/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setRooms(data);
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      axios
        .get(`${baseUrl}/unit`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          const newData = data.map((item) => ({
            label: item.name,
            key: item._id,
            value: item._id
          }));

          setSeletData(newData);
        });
    }
    fetchData();
  }, []);

  var date = new Date();
  const minDate = date.setDate(date.getDate());

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Buat Meeting</ModalHeader>
      <ModalBody>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <AvGroup>
            <Label>Nama</Label>
            <AvInput required name="name" value={data.name} onChange={onChange} />
            <AvFeedback>Nama di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Agenda</Label>
            <AvInput
              required
              name="agenda"
              value={data.agenda}
              onChange={onChange}
            />
            <AvFeedback>Agenda di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <AvField
              type="select"
              name="meetingRoom"
              label="Ruangan"
              onChange={onChange}
            >
              <option value=""></option>
              {rooms &&
                rooms.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.room}
                  </option>
                ))}
            </AvField>
            <AvFeedback>Ruangan wajib di isi!</AvFeedback>
          </AvGroup>
          <Label>Mulai</Label>
          <DatePicker
            className="mb-5"
            selected={startDateTime}
            onChange={setStartDateTime}
            placeholderText={'Mulai Rapat'}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="d MMMM, yyyy HH:mm"
            timeCaption="Time"
            showDisabledMonthNavigation
            minDate={minDate}
          />
          <Label>Berakhir</Label>
          <DatePicker
            className="mb-5"
            selected={endDateTime}
            onChange={setEndDateTime}
            placeholderText={'Rapat Berakhir'}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="d MMMM, yyyy HH:mm"
            timeCaption="Time"
            showDisabledMonthNavigation
            minDate={startDateTime}
          />
          <label>Peserta</label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            isMulti
            name="form-field-name"
            value={selectedOptions}
            onChange={setSelectedOptions}
            options={selectData}
          />

          <AvGroup className="mt-4">
            <Label>Keterangan</Label>
            <AvInput
              required
              name="description"
              placeholder="keterangan/url meeting"
              value={data.description}
              onChange={onChange}
              type="textarea"
            />
            <AvFeedback>Keterangan wajib di isi!</AvFeedback>
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
