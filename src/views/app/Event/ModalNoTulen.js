import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  List,
} from 'reactstrap';
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomSelectInput from '../../../components/common/CustomSelectInput';

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
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

const ModalNoTulen = ({
  isOpen,
  setIsOpen,
  onSaveNoTulen,
  data,
  setSelectedOption,
  selectedOption,
}) => {
  const { _id, eventResult, admittedParticipant } = data;
  const [textQuillStandart, setTextQuillStandart] = useState('');
  // const [selectedOption, setSelectedOption] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // setTextQuillStandart(eventResult || '');
    const use =
      admittedParticipant &&
      admittedParticipant.map((rec) => {
        return {
          label: `${rec?.name} - ${rec?.unit?.name}`,
          key: rec?._id,
          participant: rec?._id,
        };
      });
    setUsers(use);
  }, []);

  const onSave = () => {
    onSaveNoTulen(_id, textQuillStandart, (next) => {
      if (next.status === 200) {
        setIsOpen(!isOpen);
        setTextQuillStandart('');
      }
    });
  };

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size='lg'>
      <ModalHeader>Masukkan Hasil Meeting</ModalHeader>
      <ModalBody>
        <label>Anggota Dewan</label>
        <Select
          components={{ Input: CustomSelectInput }}
          className='react-select mb-2'
          classNamePrefix='react-select'
          name='form-field-name'
          value={selectedOption}
          onChange={setSelectedOption}
          options={users}
        />
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
        <Button
          color='primary'
          onClick={() => onSave()}
          disabled={textQuillStandart.length === 0 || selectedOption === ''}
        >
          Simpan
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalNoTulen;
