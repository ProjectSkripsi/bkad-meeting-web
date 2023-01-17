import React, { useState, useEffect } from 'react';
import {
	Row,
	Card,
	CardBody,
	Nav,
	NavItem,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	TabContent,
	TabPane,
	Badge,
	CardTitle,
	Button,
} from 'reactstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { NotificationManager } from '../../../components/common/react-notifications';
import GalleryDetail from '../../../containers/pages/GalleryDetail';
import GalleryProfile from '../../../containers/pages/GalleryProfile';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import { Colxx } from '../../../components/common/CustomBootstrap';
import IntlMessages from '../../../helpers/IntlMessages';
import SingleLightbox from '../../../components/pages/SingleLightbox';
import whotoFollowData from '../../../data/follow';
import UserCardBasic from '../../../components/cards/UserCardBasic';
import ContextMenuContainer from './ContextMenu';
import AddNewModal from './AddNewModal';
import { getToken } from '../../../helpers/Utils';
import { baseUrl } from '../../../constants/defaultValues';
import Pagination from '../../../components/Model/Pagination';
import { connect } from 'react-redux';
import {
	addOfficerRequest,
	deleteRequest,
	updateOfficerRequest,
} from '../../../redux/actions';
import { size } from 'lodash';
import ChangePassword from './ChangePassword';

const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

function collect(props) {
	return { data: props.data };
}

const MasterOfficer = ({ match, dispatch }) => {
	const [activeTab, setActiveTab] = useState('friends');
	const [selectedItems, setSelectedItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(true);
	const [selectedPageSize, setSelectedPageSize] = useState(10);
	const [modalOpen, setModalOpen] = useState(false);
	const [passwordOpen, setPasswordOpen] = useState(false);
	const [isUpdate, setIsUpdate] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [search, setSearch] = useState('');
	const [items, setItems] = useState([]);
	const [totalItemCount, setTotalItemCount] = useState(0);
	const [state, setState] = useState({
		_id: '',
		name: '',
		email: '',
		password: '',
		avatarUrl: '',
		unit: '',
	});
	const [statePassword, setStatePassword] = useState({
		oldPassword: '',
		newPassword: '',
		retypePassword: '',
	});

	const [userPassword, setUserPassword] = useState({});

	useEffect(() => {
		setCurrentPage(1);
	}, [selectedPageSize]);

	useEffect(() => {
		const token = getToken();
		async function fetchData() {
			const isSearch = search && `?search=${search}`;

			axios
				.get(
					`${baseUrl}/participant/${currentPage}/${selectedPageSize}${isSearch}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					},
				)
				.then((res) => {
					return res.data;
				})
				.then((data) => {
					setTotalPage(data.totalPage);
					setItems(data.data);
					setTotalItemCount(data.totalItem);
					setIsLoaded(true);
				});
		}
		fetchData();
	}, [selectedPageSize, currentPage, search]);

	const onContextMenuClick = (e, data) => {
		const { action } = data;
		if (action === 'update') {
			setState(selectedItems[0]);
			setModalOpen(!modalOpen);
			setIsUpdate(true);
		} else if (action === 'delete') {
			const { _id } = selectedItems[0];
			dispatch(
				deleteRequest(_id, (next) => {
					console.log(next);
					fetchNew();
					createNotification('success', 'Berhasil hapus officer');
				}),
			);
		} else {
			setUserPassword(selectedItems[0]);
			setPasswordOpen(!passwordOpen);
		}
	};

	const onContextMenu = (e, data) => {
		const clickedProductId = data.data;
		if (!selectedItems.includes(clickedProductId)) {
			setSelectedItems([clickedProductId]);
		}
		return true;
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const onChangePassword = (e) => {
		const { name, value } = e.target;
		setStatePassword((prevState) => ({ ...prevState, [name]: value }));
	};

	const onSubmit = (event, errors, values) => {
		const { _id, name, email, password, avatarUrl, unit } = state;
		const data = {
			_id,
			name,
			email,
			password,
			avatarUrl,
			unit,
		};
		if (errors.length === 0) {
			if (!isUpdate) {
				if ((name, email, password, unit)) {
					dispatch(
						addOfficerRequest(
							name,
							email,
							password,
							avatarUrl,
							unit,
							(callBack) => {
								if (callBack.status === 201) {
									setModalOpen(!modalOpen);
									fetchNew();
									createNotification('success', 'Berhasil menambahkan officer');
								} else {
									createNotification(
										'warning',
										'Email/ID Petugas telah terdaftar',
									);
								}
							},
						),
					);
				} else {
					createNotification('error');
				}
			} else {
				dispatch(
					updateOfficerRequest(
						_id,
						name,
						email,
						avatarUrl,
						unit,
						(callBack) => {
							setModalOpen(!modalOpen);
							fetchNew();
							createNotification('success', 'Berhasil update data officer');
							setState({
								_id: '',
								name: '',
								email: '',
								password: '',
								unit: '',
							});
						},
					),
				);
			}
		}
	};

	const createNotification = (type, msg, className) => {
		const cName = className || '';
		switch (type) {
			case 'success':
				NotificationManager.success('Sukses!', msg, 3000, null, null, cName);
				break;
			case 'warning':
				NotificationManager.warning(
					msg,
					'Terjadi Kesalahan!',
					3000,
					null,
					null,
					cName,
				);
				break;
			case 'error':
				NotificationManager.error(
					'Terjadi Kesalahan!',
					'Silahkan lengkapi data',
					3000,
					null,
					null,
					cName,
				);
				break;
			default:
				NotificationManager.info('Info message');
				break;
		}
	};

	const fetchNew = () => {
		const token = getToken();
		const isSearch = search && `?search=${search}`;
		axios
			.get(
				`${baseUrl}/participant/${currentPage}/${selectedPageSize}${isSearch}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				setTotalPage(data.totalPage);
				setItems(data.data);
				setTotalItemCount(data.totalItem);
				setIsLoaded(true);
			});
	};
	const [notMacth, setNotMatch] = useState(false);
	const submitPassword = (e, errors) => {
		const token = getToken();
		const { newPassword, retypePassword, oldPassword } = statePassword;
		const { _id } = userPassword;
		if (newPassword !== retypePassword) {
			setNotMatch(true);
		} else {
			if (size(errors) === 0) {
				axios
					.patch(
						`${baseUrl}/participant/change-password-participant/${_id}`,
						{
							recentPassword: oldPassword,
							newPassword,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.then((res) => {
						return res;
					})
					.then((data) => {
						if (data.status === 200) {
							setPasswordOpen(!passwordOpen);
							setStatePassword({
								oldPassword: '',
								newPassword: '',
								retypePassword: '',
							});
							setNotMatch(false);
							createNotification('success', 'Berhasil mengganti password');
						} else {
							createNotification('error', 'Password lama tidak sesuai');
						}
					})
					.catch((error) => {
						createNotification('error', 'Password lama tidak sesuai');
					});
			}
		}
	};

	return (
		<>
			<Row>
				<Colxx xxs='12'>
					<h1>Master Pegawai</h1>
					<div className='text-zero top-right-button-container'>
						<Button
							color='primary'
							size='lg'
							className='top-right-button'
							onClick={() => setModalOpen(!modalOpen)}
						>
							<IntlMessages id='pages.add-new' />
						</Button>
					</div>

					<Breadcrumb match={match} />
					<div className='mb-2'>
						<div className='d-block mb-2 d-md-inline-block'>
							<div className='search-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
								<input
									type='text'
									name='keyword'
									id='search'
									placeholder='Cari'
									onKeyPress={(e) => {
										if (e.key === 'Enter') {
											setSearch(e.target.value.toLowerCase());
										}
									}}
								/>
							</div>
						</div>
					</div>
					<Nav tabs className='separator-tabs ml-0 mb-5'>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeTab === 'friends',
									'nav-link': true,
								})}
								onClick={() => setActiveTab('friends')}
								to='#'
								location={{}}
							>
								Daftar Pegawai
							</NavLink>
						</NavItem>
					</Nav>

					{isLoaded ? (
						<TabContent activeTab={activeTab}>
							<TabPane tabId='friends'>
								<Row>
									{items.map((itemData) => {
										return (
											<Colxx
												xxs='12'
												md='6'
												lg='4'
												key={`friend_${itemData._id}`}
											>
												<UserCardBasic data={itemData} collect={collect} />
											</Colxx>
										);
									})}
									<ContextMenuContainer
										onContextMenuClick={onContextMenuClick}
										onContextMenu={onContextMenu}
									/>
								</Row>
							</TabPane>
						</TabContent>
					) : (
						<div className='loading' />
					)}
					<Pagination
						currentPage={currentPage}
						totalPage={totalPage}
						onChangePage={(i) => setCurrentPage(i)}
					/>
				</Colxx>
				<AddNewModal
					modalOpen={modalOpen}
					toggleModal={() => {
						setIsUpdate(false);
						setState({
							_id: '',
							name: '',
							email: '',
							password: '',
							avatarUrl: '',
						});
						setModalOpen(!modalOpen);
					}}
					data={state}
					onChange={onChange}
					onSubmit={onSubmit}
					isUpdate={isUpdate}
				/>
				<ChangePassword
					modalOpen={passwordOpen}
					data={statePassword}
					toggleModal={() => {
						setPasswordOpen(!passwordOpen);
						setUserPassword({});
					}}
					onChange={onChangePassword}
					onSubmit={submitPassword}
					notMacth={notMacth}
				/>
			</Row>
		</>
	);
};
export default connect()(MasterOfficer);
