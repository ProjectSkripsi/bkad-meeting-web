/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import {
  Row,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Collapse
} from 'reactstrap';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
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
  selectedTodoItemsChange
} from '../../../redux/actions';
import TodoListItem from '../../../components/applications/TodoListItem';
import Pagination from '../../../components/Model/Pagination';
import { NotificationManager } from '../../../components/common/react-notifications';

const AddNew = React.lazy(() => import('./AddNew'));

const DataTweet = ({
  match,
  intl,
  todoItems,
  searchKeyword,
  loading,
  orderColumn,
  orderColumns,
  selectedItems,
  getTodoListAction,
  getTodoListWithOrderAction,
  getTodoListSearchAction,
  selectedTodoItemsChangeAction,
  history
}) => {
  const [modalProgressOpen, setModalProgressOpen] = useState(false);
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);

  const [selectedPageSize, setSelectedPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedOrderOption, setSelectedOrderOption] = useState({
    column: 'newest',
    label: 'Terbaru'
  });
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState({});
  const [modalProccess, setModalProccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [state, setState] = useState({
    name: '',
    agenda: '',
    meetingRoom: '',
    description: ''
  });

  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
          `${baseUrl}/event/${currentPage}/${selectedPageSize}${order}${isSearch}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
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
    const order = selectedOrderOption && `?orderBy=${selectedOrderOption.column}`;
    axios
      .get(
        `${baseUrl}/event/${currentPage}/${selectedPageSize}${order}${isSearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
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
      .delete(`${baseUrl}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        createNotification('success', 'Berhasil hapus data meeting');
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
      case 'error':
        NotificationManager.error(
          'Terjadi Kesalahan!',
          'Silahkan coba beberapa saat!',
          3000,
          null,
          null,
          cName
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

  const onSelectMember = (data) => {
    const partId = data && data.map((item) => item.value);
    setState((prevState) => ({ ...prevState, units: partId }));
    setSelectedOptions(data);
  };

  const onSubmit = () => {
    const { name, agenda, meetingRoom, description, units } = state;
    const token = getToken();

    axios
      .post(
        `${baseUrl}/event`,
        {
          name,
          agenda,
          meetingRoom,
          description,
          start: startDateTime,
          end: endDateTime,
          units
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        if (res.status === 201) {
          setModalOpen(!modalOpen);
          fetchNewUpdate();
          setSelectedOptions([]);
          setState({
            name: '',
            agenda: '',
            meetingRoom: '',
            description: ''
          });
          createNotification('success', 'Berhasil menambahkan meeting baru');
        } else {
          createNotification('warning', 'Terjadi kesalahan');
        }
      });
  };

  const onSaveNoTulen = (id, eventResult, next) => {
    const token = getToken();
    axios
      .patch(
        `${baseUrl}/event/notulen/${id}`,
        { eventResult },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        next(res);
        return res.data;
      })
      .then((data) => {
        createNotification('success', 'Berhasil simpan hasil meeting');
        fetchNewUpdate();
      })
      .catch((error) => {
        createNotification('error');
      });
  };

  const onCancel = (id) => {
    const token = getToken();
    axios
      .patch(
        `${baseUrl}/event/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        createNotification('success', 'Berhasil batalkan meeting');
        fetchNewUpdate();
      })
      .catch((error) => {
        console.log(error);
        createNotification('error');
      });
  };

  const { messages } = intl;

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <div className="mb-2">
            <h1>
              <IntlMessages id="menu.master-event" />
            </h1>

            <Breadcrumb match={match} />
            <div className="text-zero top-right-button-container">
              <Button
                color="primary"
                size="lg"
                className="top-right-button"
                onClick={() => setModalOpen(!modalOpen)}
              >
                <IntlMessages id="pages.add-new" />
              </Button>
            </div>
          </div>

          <div className="mb-2">
            <Button
              color="empty"
              className="pt-0 pl-0 d-inline-block d-md-none"
              onClick={() => setDisplayOptionsIsOpen(!displayOptionsIsOpen)}
            >
              <IntlMessages id="todo.display-options" />{' '}
              <i className="simple-icon-arrow-down align-middle" />
            </Button>
            <Collapse
              id="displayOptions"
              className="d-md-block"
              isOpen={displayOptionsIsOpen}
            >
              <div className="d-block mb-2 d-md-inline-block">
                <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                  <DropdownToggle caret color="outline-dark" size="xs">
                    <IntlMessages id="todo.orderby" />
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
                <div className="search-sm d-inline-block float-md-left mr-1 mb-1 align-top">
                  <input
                    type="text"
                    name="keyword"
                    id="search"
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
          <Separator className="mb-5" />
          <Row>
            {isLoaded ? (
              items &&
              items.map((item, index) => {
                return (
                  <TodoListItem
                    key={`todo_item_${index}`}
                    item={item}
                    isSelected={
                      isLoaded ? selectedItems.includes(item.id) : false
                    }
                    deleteData={deleteData}
                    onUpdateProgress={(data, type) => {
                      setSelectedProgress(data);
                    }}
                    onProccess={(data) => {
                      setSelectedProgress(data);
                    }}
                    onSaveNoTulen={onSaveNoTulen}
                    onCancel={onCancel}
                  />
                );
              })
            ) : (
              <div className="loading" />
            )}
            <Pagination
              currentPage={currentPage}
              totalPage={totalPage}
              onChangePage={(i) => setCurrentPage(i)}
            />
          </Row>
        </Colxx>
      </Row>

      <AddNew
        modalOpen={modalOpen}
        data={state}
        toggleModal={() => {
          // setIsUpdate(false);
          setModalOpen(!modalOpen);
        }}
        onChange={onChange}
        onSubmit={onSubmit}
        setStartDateTime={setStartDateTime}
        setEndDateTime={setEndDateTime}
        startDateTime={startDateTime}
        endDateTime={endDateTime}
        setSelectedOptions={onSelectMember}
        selectedOptions={selectedOptions}
      />
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
    selectedItems
  } = todoApp;
  return {
    todoItems,
    searchKeyword,
    loading,
    orderColumn,
    orderColumns,
    selectedItems
  };
};
export default injectIntl(
  connect(mapStateToProps, {
    getTodoListAction: getTodoList,
    getTodoListWithOrderAction: getTodoListWithOrder,
    getTodoListSearchAction: getTodoListSearch,
    selectedTodoItemsChangeAction: selectedTodoItemsChange
  })(DataTweet)
);
