import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  List
} from 'reactstrap';
import moment from 'moment';
moment.locale('id');

const ModalInvite = ({
  isOpen,
  setIsOpen,
  titleModal,
  data,
  modalType,
  info
}) => {
  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)}>
      <ModalHeader>{titleModal}</ModalHeader>
      {modalType === 'count' ? (
        <ModalBody>
          <ul>
            {data &&
              data.map((item) => <li key={item._id}>{item?.name || ''}</li>)}
          </ul>
        </ModalBody>
      ) : (
        <ModalBody>
          <table>
            <tbody>
              <tr>
                <td style={{ width: '100px' }}>Rapat </td>
                <td>
                  : {info?.name} - {info?.agenda}
                </td>
              </tr>
              <tr>
                <td style={{ width: '100px' }}>Jam </td>
                <td>
                  : {moment(info?.start).format('LT')} -{' '}
                  {moment(info?.end).format('LT')}
                </td>
              </tr>
              <tr>
                <td style={{ width: '100px' }}>Tanggal </td>
                <td>: {moment(info?.start).format('LL')}</td>
              </tr>
            </tbody>
          </table>
          <ul style={{ marginTop: '30px' }}>
            {data &&
              data.map((item) => (
                <li key={item._id}>
                  {item?.participant?.name || ''} -{' '}
                  {moment(item?.updatedAt).format('LT')}
                </li>
              ))}
          </ul>
        </ModalBody>
      )}
      <ModalFooter>
        <Button color="secondary" onClick={() => setIsOpen(false)}>
          Tutup
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalInvite;
