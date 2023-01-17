import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  List,
} from 'reactstrap';

import moment from 'moment';
import 'moment/locale/id';

const ModalNoTulen = ({ isOpen, setIsOpen, data }) => {
  function createMarkup(text) {
    return { __html: text };
  }

  return (
    <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} size='lg'>
      <ModalHeader>Notulen Berjalannya Rapat</ModalHeader>
      <ModalBody>
        {data.map((ticket, index) => {
          return (
            <div key={index} className='d-flex flex-row mb-3 pb-3 border-bottom'>
              <div className='pl-3 pr-2'>
                <p className='font-weight-bold mb-0 '>
                  {ticket?.participant?.name} - {ticket?.participant?.unit?.name}
                </p>
                <p className='text-muted mb-0 text-small'>
                  <div dangerouslySetInnerHTML={createMarkup(ticket?.text)} />
                  {moment(ticket.createdAt).startOf('minutes').fromNow()}
                </p>
              </div>
            </div>
          );
        })}
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
