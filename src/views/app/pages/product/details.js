// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import {
//   Row,
//   Card,
//   CardTitle,
//   CardBody,
//   Nav,
//   NavItem,
//   TabContent,
//   TabPane,
//   CardHeader,
//   Button,
// } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
// import classnames from 'classnames';
// import { injectIntl } from 'react-intl';
// import Breadcrumb from '../../../../containers/navs/Breadcrumb';
// import { adminRoot, baseUrl } from '../../../../constants/defaultValues';
// import {
//   Separator,
//   Colxx,
// } from '../../../../components/common/CustomBootstrap';
// import IntlMessages from '../../../../helpers/IntlMessages';
// import GlideComponentThumbs from '../../../../components/carousel/GlideComponentThumbs';
// import { saveAs } from 'file-saver';
// import GalleryDetail from '../../../../containers/pages/GalleryDetail';
// import { getModelById } from '../../../../redux/actions';
// import axios from 'axios';

// const DetailsPages = ({ match, intl, history, getModelByIdAction }) => {
//   const [activeTab, setActiveTab] = useState('details');
//   const [data, setData] = useState({});
//   const [anyModel, setAnyModel] = useState([]);

//   useEffect(() => {
//     const params = new URLSearchParams(history.location.search);
//     const id = params.get('id'); // bar

//     getModelByIdAction(id, (callBack) => {
//       setData(callBack.data);
//     });
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       axios
//         .get(`${baseUrl}/model/any-model`)
//         .then((res) => {
//           return res.data;
//         })
//         .then((data) => {
//           setAnyModel(data);
//         });
//     }
//     fetchData();
//   }, []);

//   const onDownload = () => {
//     saveAs(data.fileUrl, `${data.title}.pdf`);
//   };

//   const { messages } = intl;
//   return (
//     <>
//       <Row>
//         <Colxx xxs="12">
//           <h1>{data.title}</h1>
//           <div className="text-zero top-right-button-container"></div>

//           <Breadcrumb match={match} />
//           <Separator className="mb-5" />

//           <Row>
//             <Colxx xxs="12" xl="8" className="col-left">
//               <Card className="mb-4">
//                 <CardBody>
//                   <GlideComponentThumbs
//                     settingsImages={{
//                       bound: true,
//                       rewind: false,
//                       focusAt: 0,
//                       startAt: 0,
//                       gap: 5,
//                       perView: 1,
//                       data: [
//                         {
//                           id: 1,
//                           img: data.coverUrl,
//                         },
//                       ],
//                     }}
//                     settingsThumbs={{
//                       bound: true,
//                       rewind: false,
//                       focusAt: 0,
//                       startAt: 0,
//                       gap: 10,
//                       perView: 5,
//                       data: [],
//                       breakpoints: {
//                         576: {
//                           perView: 4,
//                         },
//                         420: {
//                           perView: 3,
//                         },
//                       },
//                     }}
//                   />
//                 </CardBody>
//               </Card>
//               <Card className="mb-4">
//                 <CardHeader>
//                   <Nav tabs className="card-header-tabs ">
//                     <NavItem>
//                       <NavLink
//                         className={classnames({
//                           active: activeTab === 'details',
//                           'nav-link': true,
//                         })}
//                         onClick={() => setActiveTab('details')}
//                         to={`${adminRoot}/pages/model/details?id=${data._id}`}
//                         location={{}}
//                       >
//                         Deskripsi Model
//                       </NavLink>
//                     </NavItem>
//                   </Nav>
//                 </CardHeader>

//                 <TabContent activeTab={activeTab}>
//                   <TabPane tabId="details">
//                     <Row>
//                       <Colxx sm="12">
//                         <CardBody>
//                           <h3 className="mb-5">{data.title}</h3>
//                           <p style={{ textAlign: 'justify' }}>
//                             {data.description}
//                           </p>
//                           <br />
//                         </CardBody>
//                       </Colxx>
//                     </Row>
//                   </TabPane>
//                 </TabContent>
//               </Card>
//             </Colxx>

//             <Colxx xxs="12" xl="4" className="col-right">
//               <Card className="mb-4">
//                 <CardBody>
//                   <CardTitle>Info Model</CardTitle>
//                   <Row>
//                     <Colxx sm="12">
//                       <div className="d-flex flex-row align-items-center">
//                         <h5>Tahun:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.year}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center">
//                         <h5>Pengarang:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.author || '-'}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center ">
//                         <h5>Kesetaraan Modul:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.equivalenceModule}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center ">
//                         <h5>Keahlian Guru:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.teacherExpertise}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center ">
//                         <h5>Kandungan Budaya Lokal:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.score}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center ">
//                         <h5>Kandungan Konten Nasionalisme:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.nasionalismContent}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       <div className="d-flex flex-row align-items-center ">
//                         <h5>Konsep Pembelajaran:</h5>
//                         <div className="pl-3 pt-2 pr-2 pb-2">
//                           <h5>
//                             <p className="list-item-heading mb-1">
//                               {data.learningConcept}
//                             </p>
//                           </h5>
//                         </div>
//                       </div>
//                       {/* <GalleryDetail /> */}
//                       <Button
//                         color="secondary"
//                         block
//                         outline
//                         onClick={onDownload}
//                         className="mt-3"
//                       >
//                         <a className="simple-icon-cloud-download" /> DOWNLOAD (
//                         {data.download || 0})
//                       </Button>
//                     </Colxx>
//                   </Row>
//                 </CardBody>
//               </Card>
//             </Colxx>
//           </Row>
//         </Colxx>
//       </Row>
//     </>
//   );
// };
// export default injectIntl(
//   connect(null, { getModelByIdAction: getModelById })(DetailsPages)
// );
