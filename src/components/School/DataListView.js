import React from 'react';
import { Card, Button, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { Colxx } from '../../components/common/CustomBootstrap';

const DataListView = ({ school, isSelect, onDelete, onUpdate }) => {
  return (
    <Colxx xxs="12" className="mb-3">
      <Card
        className={classnames('d-flex flex-row', {
          active: isSelect,
        })}
      >
        <div className="pl-2 d-flex flex-grow-1 min-width-zero">
          <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
            <NavLink to={`?p=${school._id}`} className="w-40 w-sm-100">
              <p className="list-item-heading mb-1 truncate">{school.name}</p>
            </NavLink>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {school.contact}
            </p>
            <p className="mb-1 text-muted text-small w-15 w-sm-100">
              {school.location.address}, {school.location.village},{' '}
              {school.location.subDistrict}, {school.location.district},{' '}
              {school.location.province}
            </p>
            <div className="w-15 w-sm-100">
              <Badge color={school.statusColor} pill>
                Sekolah {school.schoolType}
              </Badge>
            </div>
          </div>
          <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
            <Button
              color="danger"
              size="xs"
              className="mr-2"
              onClick={() => onDelete(school._id)}
            >
              Hapus
            </Button>
            <Button color="info" size="xs" onClick={() => onUpdate(school)}>
              Edit
            </Button>
          </div>
        </div>
      </Card>
    </Colxx>
  );
};

export default React.memo(DataListView);
