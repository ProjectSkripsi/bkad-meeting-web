/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
	Row,
	Button,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	Collapse,
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';

import { getToken } from '../../../helpers/Utils';
import IntlMessages from '../../../helpers/IntlMessages';
import { Colxx, Separator } from '../../../components/common/CustomBootstrap';
import Breadcrumb from '../../../containers/navs/Breadcrumb';
import axios from 'axios';
import { baseUrl } from '../../../constants/defaultValues';
import {
	getTodoList,
	getTodoListWithOrder,
	getTodoListSearch,
	selectedTodoItemsChange,
	addSymptomsRequest,
	updateSymptomsRequest,
} from '../../../redux/actions';
import TodoListItem from '../../../components/applications/TodoListItem';
import Pagination from '../../../components/Model/Pagination';
import { NotificationManager } from '../../../components/common/react-notifications';
import { ReactTableDivided } from './SymptomsTable';

const AddNew = React.lazy(() =>
	import(/* webpackChunkName: "dashboard-default" */ './AddNew'),
);

const getIndex = (value, arr, prop) => {
	for (let i = 0; i < arr.length; i += 1) {
		if (arr[i][prop] === value) {
			return i;
		}
	}
	return -1;
};

const DataSymptoms = ({
	match,
	intl,

	searchKeyword,
	loading,
	orderColumn,
	orderColumns,
	selectedItems,
	getTodoListAction,
	getTodoListWithOrderAction,
	getTodoListSearchAction,
	selectedTodoItemsChangeAction,
}) => {
	const dispatch = useDispatch();
	const [modalProgressOpen, setModalProgressOpen] = useState(false);
	const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedPageSize, setSelectedPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const [selectedOrderOption, setSelectedOrderOption] = useState({
		column: 'newest',
		label: 'Terbaru',
	});
	const [totalItemCount, setTotalItemCount] = useState(0);
	const [totalPage, setTotalPage] = useState(1);
	const [items, setItems] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const [selectedProgress, setSelectedProgress] = useState({});
	const [state, setState] = useState({
		roomId: '',
		room: '',
		category: '',
		description: '',
	});
	const [isUpdate, setIsUpdate] = useState(false);

	useEffect(() => {
		document.body.classList.add('right-menu');
		setCurrentPage(1);
		return () => {
			document.body.classList.remove('right-menu');
		};
	}, [selectedPageSize]);

	useEffect(() => {
		const token = getToken();
		async function fetchData() {
			const isSearch = search && `&search=${search}`;
			const order =
				selectedOrderOption && `?orderBy=${selectedOrderOption.column}`;
			axios
				.get(
					`${baseUrl}/room/${currentPage}/${selectedPageSize}${order}${isSearch}`,
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
	}, [selectedPageSize, currentPage, selectedOrderOption, search]);

	const fetchNewUpdate = () => {
		const token = getToken();

		const isSearch = search && `&search=${search}`;
		const order =
			selectedOrderOption && `?orderBy=${selectedOrderOption.column}`;
		axios
			.get(
				`${baseUrl}/room/${currentPage}/${selectedPageSize}${order}${isSearch}`,
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

	const deleteData = (id) => {
		const token = getToken();
		axios
			.delete(`${baseUrl}/room/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				createNotification('success', 'Berhasil hapus data room');
				fetchNewUpdate();
			})
			.catch((error) => {
				createNotification('error');
			});
	};

	const createNotification = (type, msg, className) => {
		const cName = className || '';
		switch (type) {
			case 'success':
				NotificationManager.success('Sukses!', msg, 3000, null, null, cName);
				break;
			case 'warning':
				NotificationManager.warning('Oppss!', msg, 3000, null, null, cName);
				break;
			case 'error':
				NotificationManager.error(
					'Terjadi Kesalahan!',
					'Silahkan coba beberapa saat!',
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

	const orderBy = (order) => {
		setSelectedOrderOption(order);
	};

	const onChange = (e) => {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const onSubmit = (event, errors, values) => {
		const { _id, roomId, room, category, description } = state;

		if (errors.length === 0) {
			if (!isUpdate) {
				if ((roomId, room, category, description)) {
					dispatch(
						addSymptomsRequest(
							roomId,
							room,
							category,
							description,
							(callBack) => {
								if (callBack.status === 201) {
									setModalOpen(!modalOpen);
									fetchNewUpdate();
									setState({
										roomId: '',
										room: '',
										category: '',
										description: '',
									});
									createNotification('success', 'Berhasil menambahkan ruangan');
								} else {
									createNotification('warning', 'Kode Ruangan telah terdaftar');
								}
							},
						),
					);
				} else {
					createNotification('error');
				}
			} else {
				dispatch(
					updateSymptomsRequest(
						_id,
						roomId,
						room,
						category,
						description,
						(callBack) => {
							if (callBack.status === 200) {
								fetchNewUpdate();
								setModalOpen(!modalOpen);
								createNotification('success', 'Berhasil update data ruangan');
								setState({
									code: '',
									name: '',
									description: '',
								});
							} else {
								createNotification('warning', 'Kode Ruangan telah terdaftar');
							}
						},
					),
				);
			}
		}
	};

	const { messages } = intl;

	return (
		<>
			<Row>
				<Colxx xxs='12'>
					<div className='mb-2'>
						<h1>
							<IntlMessages id='menu.master-symptoms' />
						</h1>
						<Breadcrumb match={match} />
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
					</div>
					<div className='mb-2'>
						<Button
							color='empty'
							className='pt-0 pl-0 d-inline-block d-md-none'
							onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
						>
							<IntlMessages id='todo.display-options' />{' '}
							<i className='simple-icon-arrow-down align-middle' />
						</Button>
						<Collapse
							id='displayOptions'
							className='d-md-block'
							isOpen={displayOptionsIsOpen}
						>
							<div className='d-block mb-2 d-md-inline-block'>
								<UncontrolledDropdown className='mr-1 float-md-left btn-group mb-1'>
									<DropdownToggle caret color='outline-dark' size='xs'>
										<IntlMessages id='todo.orderby' />
										{orderColumn ? orderColumn.label : ''}
									</DropdownToggle>
									<DropdownMenu>
										{orderColumns.map((o, index) => {
											return (
												<DropdownItem key={index} onClick={() => orderBy(o)}>
													{o.label}
												</DropdownItem>
											);
										})}
									</DropdownMenu>
								</UncontrolledDropdown>
								<div className='search-sm d-inline-block float-md-left mr-1 mb-1 align-top'>
									<input
										type='text'
										name='keyword'
										id='search'
										placeholder={messages['menu.search']}
										onKeyPress={(e) => {
											if (e.key === 'Enter') {
												setSearch(e.target.value.toLowerCase());
											}
										}}
									/>
								</div>
							</div>
						</Collapse>
					</div>
					<Separator className='mb-0' />
					{isLoaded ? (
						<ReactTableDivided
							data={items}
							onUpdate={(dataUpdate) => {
								setState(dataUpdate);
								setIsUpdate(true);
								setModalOpen(!modalOpen);
							}}
							onDelete={deleteData}
						/>
					) : (
						<div className='loading' />
					)}
				</Colxx>
				<AddNew
					modalOpen={modalOpen}
					data={state}
					toggleModal={() => {
						setIsUpdate(false);
						setModalOpen(!modalOpen);
						setState({
							roomId: '',
							room: '',
							category: '',
							description: '',
						});
					}}
					onChange={onChange}
					onSubmit={onSubmit}
				/>
			</Row>
		</>
	);
};

const mapStateToProps = ({ todoApp }) => {
	const {
		todoItems,
		searchKeyword,
		loading,
		orderColumn,
		orderColumns,
		selectedItems,
	} = todoApp;
	return {
		todoItems,
		searchKeyword,
		loading,
		orderColumn,
		orderColumns,
		selectedItems,
	};
};
export default injectIntl(
	connect(mapStateToProps, {
		getTodoListAction: getTodoList,
		getTodoListWithOrderAction: getTodoListWithOrder,
		getTodoListSearchAction: getTodoListSearch,
		selectedTodoItemsChangeAction: selectedTodoItemsChange,
	})(DataSymptoms),
);
