import React from 'react';
import { Modal, ModalHeader, ModalBody, Badge, List, Table } from 'reactstrap';

import { get, isEmpty } from 'lodash';
import moment from 'moment';

const ModalProgress = ({ setModalProccess, modalProccess, data }) => {
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
      isOpen={modalProccess}
      toggle={() => setModalProccess(!modalProccess)}
    >
      <ModalHeader>
        {data.name} - {data.age} Tahun{' '}
      </ModalHeader>
      <ModalBody>
        <Table striped>
          <thead>
            <tr>
              <th>Kode Gejala</th>
              <th>Gejala</th>
              <th>Bobot</th>
              <th>Diagnosa</th>
            </tr>
          </thead>
          <tbody>
            {data.analyse &&
              data.analyse.data.map((item) => (
                <tr key={item._id}>
                  <th scope="row">{item.code} </th>
                  <th scope="row">{item.name} </th>
                  <td>{item.bobot}</td>
                  <td>{item.diagnose}</td>
                </tr>
              ))}
            <tr>
              <th colSpan="2">Total Analisa Bobot Pasien: </th>
              <td colSpan="2">{get(data, 'analyse.totalBobotInput', 0)}</td>
            </tr>
            <tr>
              <th colSpan="2">Total Keseluruhan Bobot: </th>
              <td colSpan="2">
                {get(data, 'analyse.totalBobotTypeDiagnose', 0)}
              </td>
            </tr>
            {/* <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default ModalProgress;
