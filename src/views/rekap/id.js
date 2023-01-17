import React, { useEffect, useState } from 'react';
import { Row, Button, Card, CardBody, Table } from 'reactstrap';
import axios from 'axios';
import { Colxx } from '../../components/common/CustomBootstrap';
import { get } from 'lodash';
import ReactToPdf from 'react-to-pdf';
import moment from 'moment';
import QRCode from 'qrcode.react';
import Linkify from 'react-linkify';

import 'moment/locale/id';

import { baseUrl } from '../../constants/defaultValues';

const PdfReport = (props) => {
  const ref = React.createRef();
  const [data, setData] = useState({});
  const { id } = props.match.params;
  useEffect(() => {
    async function fetchData() {
      axios
        .get(`${baseUrl}/event/${id}`)
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setData(data);
        });
    }
    fetchData();
  }, []);

  const createMarkup = (text) => {
    return { __html: text };
  };

  return (
    <>
      <div ref={ref} className='content ml-4'>
        <Row className='invoice-react mt-3 ml-4'>
          <Colxx xxs='12' className='mb-4'>
            <Card className='mb-5 invoice-contents'>
              <CardBody className='d-flex flex-column justify-content-between'>
                <div className='d-flex flex-column'>
                  {/* <div className='d-flex flex-row justify-content-center pt-2 pb-2'> */}
                  <div className='text-center'>
                    <div className='align-self-center'>
                      <img
                        src='/assets/logos/dprd.png'
                        height='80'
                        alt='Logo'
                        className='mr-3'
                      />
                    </div>
                    <div>
                      <h3 className='mt-4'>
                        DEWAN PERWAKILAN RAKYAT DAERAH <br /> PROVINSI SULAWESI
                        SELATAN
                      </h3>
                      <p className='text-small mb-0'>
                        Jalan Jendral Urip Sumoharjo No. 59 Tlp. (0411)
                        453344-453645 <br />
                        Fax. 453562 Makassar 90232
                      </p>
                    </div>
                    <div className='w-30 text-center align-self-center'></div>
                    {/* </div> */}
                  </div>
                  <div className='border-bottom pt-4 mb-4' />
                  <p className='text-center'>
                    <b>
                      CATATAN DAN LAPORAN TERTULIS RAPAT BADAN MUSYAWARAH <br />{' '}
                      DEWAN PERWAKILAN RAKYAT DAERAH PROVINSI SULAWESI SELATAN
                    </b>
                  </p>
                  <div className='d-flex flex-row justify-content-between mb-5'>
                    <div className='d-flex flex-column mr-2 p-4 bg-semi-muted'>
                      <p className='mb-0'>Agenda Meeting: {data.agenda}</p>
                      <p className='mb-0' style={{ textTransform: 'capitalize' }}>
                        Pelaksanaan Via : {data?.meetingRoom?.category}
                      </p>
                      <p className='mb-0' style={{ textTransform: 'capitalize' }}>
                        Tempat/Room : {data?.meetingRoom?.roomId}
                        {'-'}
                        {data?.meetingRoom?.room}
                      </p>
                      <p className='mb-0' style={{ textTransform: 'capitalize' }}>
                        Waktu Pelaksanaan : {moment(data?.start).format('LLL')}
                        {' - '}
                        {moment(data?.end).format('LLL')}
                      </p>
                      <p className='mb-0' style={{ textTransform: 'capitalize' }}>
                        Catatan Rapat :{' '}
                        <Linkify>{data?.meetingRoom?.description}</Linkify>
                      </p>
                      <p className='mb-0' style={{ textTransform: 'capitalize' }}>
                        Peserta Meeting :{' '}
                        {data &&
                          data.units &&
                          data.units.map((item) => {
                            return `${item.name}, `;
                          })}
                      </p>
                    </div>
                    {/* <div className='d-flex w-20 flex-column text-center p-4 text-semi-muted bg-semi-muted'>
                      <QRCode id='qr-gen' value={id} size={170} level={'H'} />
                    </div> */}
                  </div>
                  <p className='text-left'>
                    <u>
                      <b>Pimpinan dan Anggota Badan Musyawarah Yang Hadir:</b>
                    </u>
                  </p>
                  <Table borderless>
                    <thead>
                      <tr>
                        <th className='text-muted text-extra-small mb-2'>Nama</th>
                        <th className='text-muted text-extra-small mb-2'>
                          Bidang
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data &&
                        data.admittedParticipant &&
                        data.admittedParticipant.map((item) => {
                          return (
                            <tr key={item._id}>
                              <td>{item.name}</td>
                              <td>{item.unit.name}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>

                <div className='d-flex flex-row justify-content-between'>
                  <div className='d-flex flex-column w-100 mr-2 p-4 bg-semi-muted'>
                    <div className='mb-3'>Jalannya Rapat: </div>
                    <div dangerouslySetInnerHTML={createMarkup()} />
                    {data.noTulens &&
                      data.noTulens.map((ticket, index) => {
                        return (
                          <div
                            key={index}
                            className='d-flex flex-row mb-3 pb-3 border-bottom'
                          >
                            <div className='pl-3 pr-2'>
                              <p className='font-weight-bold mb-0 '>
                                {ticket?.participant?.name} -{' '}
                                {ticket?.participant?.unit?.name}
                              </p>
                              <p className='mb-0 text-small'>
                                <div
                                  dangerouslySetInnerHTML={createMarkup(
                                    ticket?.text,
                                  )}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    {/* </p> */}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    </>
  );
};

export default PdfReport;
