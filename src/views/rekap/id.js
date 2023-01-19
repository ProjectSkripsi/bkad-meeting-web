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

  const createMarkup = () => {
    return { __html: data?.eventResult };
  };

  return (
    <>
      {/* <div
				className='col-md-12 text-center mt-5'
				style={{ height: 'auto !important', width: '50%' }}
			>
				<ReactToPdf targetRef={ref} filename={`${data.name}.pdf`}>
					{({ toPdf }) => <Button onClick={toPdf}>Unduh PDF</Button>}
				</ReactToPdf>
			</div> */}
      <div ref={ref} className='content ml-4'>
        <Row className='invoice-react mt-3 ml-4'>
          <Colxx xxs='12' className='mb-4'>
            <Card className='mb-5 invoice-contents'>
              <CardBody className='d-flex flex-column justify-content-between'>
                <div className='d-flex flex-column'>
                  <div className='d-flex flex-row justify-content-between pt-2 pb-2'>
                    <div className='d-flex align-self-center'>
                      <img
                        src='/assets/logos/bkad.png'
                        height='80'
                        alt='Logo'
                        className='mr-3'
                      />
                      {/* <h3 className='mt-4'>Dinas Perhubungan Sulawesi Selatan</h3> */}
                    </div>
                    <div className='d-flex w-30 text-right align-self-center'>
                      <p className='text-small text-semi-muted mb-0'>
                        Jl. Urip Sumoharjo No.269, Karampuang, Kec. Panakkukang,
                        Kota Makassar, Sulawesi Selatan 90231
                      </p>
                    </div>
                  </div>
                  <div className='border-bottom pt-4 mb-4' />
                  <p className='text-center'>
                    Rekapitulasi Hasil Meeting {data.name}
                  </p>
                  <div className='d-flex flex-row justify-content-between mb-5'>
                    <div className='d-flex flex-column w-80 mr-2 p-4 text-semi-muted bg-semi-muted'>
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
                        Catatan Room :{' '}
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
                    <div className='d-flex w-20 flex-column text-center p-4 text-semi-muted bg-semi-muted'>
                      <QRCode id='qr-gen' value={id} size={110} level={'H'} />
                    </div>
                  </div>
                  <p className='text-left'>Peserta Hadir</p>
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

                <div className='d-flex flex-row justify-content-between mb-5'>
                  <div className='d-flex flex-column w-100 mr-2 p-4 bg-semi-muted'>
                    <p className='mb-0'>
                      Hasil Meeting:{' '}
                      <div dangerouslySetInnerHTML={createMarkup()} />
                    </p>
                  </div>
                </div>

                <div className='d-flex flex-column'>
                  <div className='border-bottom pt-3 mb-5' />

                  <p className='text-muted text-small text-center'>
                    Badan Keuangan & Aset Daerah Provinsi Sulawesi Selatan
                  </p>
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
