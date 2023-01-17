import React from 'react';
import { Modal, ModalHeader, ModalBody, Badge, List } from 'reactstrap';

import { get, isEmpty } from 'lodash';
import moment from 'moment';

const ModalProgress = ({
  setModalProgressOpen,
  modalProgressOpen,
  data,
  onUpdateClassification,
  onChange,
}) => {
  const renderItem = (data) => {
    if (!isEmpty(data)) {
      return (
        <List type="unstyled">
          <ul>
            {data.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        </List>
      );
    }
  };

  return (
    <Modal
      isOpen={modalProgressOpen}
      toggle={() => setModalProgressOpen(!modalProgressOpen)}
    >
      <ModalHeader>
        {data.name} - {data.age} Tahun{' '}
      </ModalHeader>
      <ModalBody>
        <p className="text-muted text-small mb-2">NIK</p>
        <p className="mb-3">{data.nik}</p>
        <p className="text-muted text-small mb-2">No Handphone</p>
        <p className="mb-3">{data.contact}</p>
        <p className="text-muted text-small mb-2">Alamat</p>
        <p className="mb-3">{data.address}</p>
        <p className="text-muted text-small mb-2">Tempat & Tanggal Lahir</p>
        <p className="mb-3">
          {data.placeBirth} - {moment(data.dateBirth).format('LL')}
        </p>

        <p className="text-muted text-small mb-2">Gejala</p>
        {renderItem(data.symptomsId || [])}

        <p className="text-muted text-small mb-2">Diagnosa</p>
        <p className="mb-3">
          <Badge color="outline-secondary" className="mb-1 mr-1" pill>
            {data.criteriaStatus || '-'}
          </Badge>
        </p>

        <p className="text-muted text-small mb-2">Diperiksa </p>
        <p className="mb-3">
          {' '}
          {get(data, 'inputBy.name', '')} -{' '}
          {moment(data.createdAt).format('LL')}
        </p>
      </ModalBody>
    </Modal>
  );
};

export default ModalProgress;
