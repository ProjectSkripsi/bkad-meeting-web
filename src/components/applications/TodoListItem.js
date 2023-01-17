import React, { useState } from 'react';
import {
	Card,
	CardBody,
	Badge,
	ButtonDropdown,
	DropdownToggle,
	DropdownItem,
	DropdownMenu,
	Button,
	CardFooter,
	CardHeader,
	List,
	CardTitle,
	CardText,
} from 'reactstrap';
import QRCode from 'qrcode.react';
import Linkify from 'react-linkify';
import { NavLink, Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/id';
import { Colxx } from '../common/CustomBootstrap';
import { get } from 'lodash';
import { adminRoot } from '../../constants/defaultValues';
import ModalInvite from '../../views/app/Event/ModalInvite';
import ModalNoTulen from '../../views/app/Event/ModalNoTulen';
import ModalResult from '../../views/app/Event/ModalEventResult';

moment.locale('id');

const TodoListItem = ({
	item,
	deleteData,
	onUpdateProgress,
	className,
	onProccess,
	onSaveNoTulen,
	onCancel,
}) => {
	const [dropdownBasicOpen, setDropdownBasicOpen] = useState(false);
	const [modalInvite, setModalInvite] = useState(false);
	const [dataMember, setDataMember] = useState([]);
	const [titleModal, setTitleModal] = useState('');
	const [modalNoTulen, setModalNoTulen] = useState(false);
	const [modalResult, setModalResult] = useState(false);

	const renderItem = (data) => {
		return (
			<List type='unstyled'>
				<ul>
					{data.map((i, index) => (
						<li key={index}>{i.name}</li>
					))}
				</ul>
			</List>
		);
	};

	const downloadQRCode = (value) => {
		// Generate download with use canvas and stream
		const canvas = document.getElementById('qr-gen');
		const pngUrl = canvas
			.toDataURL('image/png')
			.replace('image/png', 'image/octet-stream');
		let downloadLink = document.createElement('a');
		downloadLink.href = pngUrl;
		downloadLink.download = `${value}.png`;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	const onViewodal = (type, data) => {
		if (type === 'count') {
			setDataMember(data);
			setTitleModal('Data Absensi Meeting');
			setModalInvite(true);
		} else {
			setModalInvite(true);
			setTitleModal('Peserta Meeting Hadir');
			setDataMember(data);
		}
	};

	const activeCheck = (date) => {
		const isBefore = moment(date).isAfter(Date.now());
		return isBefore;
	};

	return (
		<Colxx xxs='12' className='mb-3'>
			<Card className={className}>
				<CardBody>
					<div className='d-flex flex-row mb-3 justify-content-between'>
						<div className='flex-grow-1'>
							<p className='font-weight-medium mb-0 '>
								<CardTitle>
									{item.name} {'     '}
									<Badge
										color={
											activeCheck(item.end) && item.status === 'active'
												? 'primary'
												: item.status === 'active' && !activeCheck(item.end)
												? 'secondary'
												: 'danger'
										}
										pill
									>
										{item.status === 'active' && activeCheck(item.end)
											? 'Upcoming'
											: item.status === 'active' && !activeCheck(item.end)
											? 'Expired'
											: 'Cancel'}
									</Badge>
								</CardTitle>
								&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
							</p>
						</div>

						<div className='comment-likes'>
							<ButtonDropdown
								direction='left'
								isOpen={dropdownBasicOpen}
								toggle={() => setDropdownBasicOpen(!dropdownBasicOpen)}
							>
								<DropdownToggle caret size='xs' color='secondary' outline>
									Actions
								</DropdownToggle>
								<DropdownMenu>
									<DropdownItem onClick={() => setModalNoTulen(true)}>
										NoTulen
									</DropdownItem>
									{item.status === 'active' && activeCheck(item.end) && (
										<DropdownItem onClick={() => onCancel(item._id)}>
											Batalkan
										</DropdownItem>
									)}
									{item.eventResult && (
										<DropdownItem
											onClick={() =>
												window.open(`/rekapitulasi/${item._id}`, '_blank')
											}
										>
											Rekapitulasi Meeting
										</DropdownItem>
									)}
									<hr />
									<DropdownItem onClick={() => deleteData(item._id)}>
										Hapus
									</DropdownItem>
								</DropdownMenu>
							</ButtonDropdown>
						</div>
					</div>
					<hr />
					<div className='row'>
						<div className='col-md-8'>
							<p>
								Agenda: <b> {item.agenda || '-'} </b>
							</p>
							<p>
								Jadwal:{' '}
								<b>
									{moment(item.start).format('LLL')} -{' '}
									{moment(item.end).format('LLL')}
								</b>
							</p>
							<p>
								Jumlah Absensi:{' '}
								<b>
									<a
										style={{ cursor: 'pointer', color: 'blue' }}
										onClick={() => onViewodal('count', item.units)}
									>
										{item.units.length} Bidang
									</a>{' '}
								</b>
							</p>
							{item.admittedParticipant.length > 0 && (
								<p>
									Peserta Hadir:{' '}
									<b>
										<a
											style={{ cursor: 'pointer', color: 'blue' }}
											onClick={() =>
												onViewodal('countAdmit', item.admittedParticipant)
											}
										>
											{item.admittedParticipant.length} Peserta{' '}
										</a>
									</b>
								</p>
							)}

							<p>
								Hasil Meeting:{' '}
								<b>
									{item.eventResult ? (
										<a
											style={{ cursor: 'pointer', color: 'blue' }}
											onClick={() => setModalResult(true)}
										>
											Lihat
										</a>
									) : (
										<a>Belum Tersedia</a>
									)}
								</b>
							</p>

							<p>Info Meeting:</p>
							<List type='unstyled'>
								<ul>
									<li>
										Kategori Meeting:{' '}
										<b>{item.meetingRoom.category.toUpperCase()}</b>
									</li>
									<li>
										Ruangan: <b>{item.meetingRoom.room}</b>
									</li>
									<li>
										Catatan:
										<b>
											{' '}
											<Linkify>{item.meetingRoom.description}</Linkify>{' '}
										</b>
									</li>
								</ul>
							</List>
						</div>
						<div className='col-md-4 text-right'>
							<div className='col'>
								<QRCode
									id='qr-gen'
									value={item._id}
									size={220}
									level={'H'}
									includeMargin={true}
								/>
							</div>
							<Button
								color='primary'
								className='mr-5'
								onClick={() => downloadQRCode(item._id)}
							>
								Download QR Code
							</Button>
						</div>
					</div>
				</CardBody>
				<CardFooter className='text-muted'>
					Dibuat oleh {get(item, 'createdBy.name', '-')} -{' '}
					{moment(item.createdAt).startOf('second').fromNow()}
				</CardFooter>
			</Card>
			<ModalResult
				isOpen={modalResult}
				setIsOpen={setModalResult}
				data={item.eventResult}
			/>
			<ModalNoTulen
				isOpen={modalNoTulen}
				setIsOpen={setModalNoTulen}
				onSaveNoTulen={onSaveNoTulen}
				data={item}
			/>
			<ModalInvite
				isOpen={modalInvite}
				setIsOpen={setModalInvite}
				data={dataMember}
				titleModal={titleModal}
			/>
		</Colxx>
	);
};

export default React.memo(TodoListItem);
