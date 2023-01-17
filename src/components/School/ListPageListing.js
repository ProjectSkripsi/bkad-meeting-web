import React from 'react';
import { Row } from 'reactstrap';
import Pagination from './Pagination';
import ContextMenuContainer from './ContextMenuContainer';
import DataListView from './DataListView';
// import ImageListView from './ImageListView';
// import ThumbListView from './ThumbListView';

function collect(props) {
  return { data: props.data };
}

const ListPageListing = ({
  items,
  displayMode,
  selectedItems,
  onCheckItem,
  currentPage,
  totalPage,
  onContextMenuClick,
  onContextMenu,
  onChangePage,
  onDelete,
  onUpdate,
}) => {
  return (
    <Row>
      {items.map((school) => {
        return (
          <DataListView
            key={school._id}
            school={school}
            isSelect={selectedItems.includes(school._id)}
            onCheckItem={onCheckItem}
            collect={collect}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        );
      })}
      <Pagination
        currentPage={currentPage}
        totalPage={totalPage}
        onChangePage={(i) => onChangePage(i)}
      />
      <ContextMenuContainer
        onContextMenuClick={onContextMenuClick}
        onContextMenu={onContextMenu}
      />
    </Row>
  );
};

export default React.memo(ListPageListing);
