/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';
import Linkify from 'react-linkify';
import IntlMessages from '../../../helpers/IntlMessages';
import DatatablePagination from '../../../components/DatatablePagination';

import products from '../../../data/products';

function Table({ columns, data, divided = false, defaultPageSize = 10 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination,
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-divided': divided })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions={false}
        showPageJump={false}
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
    </>
  );
}

export const ReactTableWithPaginationCard = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    [],
  );

  return (
    <Card className='mb-4'>
      <CardBody>
        <CardTitle>
          <IntlMessages id='table.react-pagination' />
        </CardTitle>
        <Table columns={cols} data={products} />
      </CardBody>
    </Card>
  );
};

export const ReactTableDivided = ({ data, onUpdate, onDelete }) => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Kode Room',
        accessor: 'roomId',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Ruangan',
        accessor: 'room',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Kategory',
        accessor: 'category',
        cellClass: 'text-muted ',
        Cell: (props) => (
          <span style={{ textTransform: 'capitalize' }}>{props.value}</span>
        ),
      },

      {
        Header: 'Description',
        accessor: 'description',
        cellClass: 'text-muted w-60',
        Cell: (props) => <Linkify>{props.value}</Linkify>,
      },
      {
        Header: 'Action',
        accessor: '_id',
        cellClass: 'text-muted w-10',
        Cell: (props) => (
          <>
            <i
              className='simple-icon-note mr-3'
              style={{ cursor: 'pointer' }}
              onClick={() => onUpdate(props.row.original)}
            />
            <i
              className='simple-icon-trash'
              style={{ cursor: 'pointer' }}
              onClick={() => onDelete(props.value)}
            />
          </>
        ),
      },
    ],
    [],
  );
  return (
    <div className='mb-0'>
      <Table columns={cols} data={data} divided />
    </div>
  );
};
