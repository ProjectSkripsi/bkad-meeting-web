import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardSubtitle, CardText } from 'reactstrap';
import ThumbnailImage from './ThumbnailImage';
import { ContextMenuTrigger } from 'react-contextmenu';

const UserCardBasic = ({ link = '#', data, collect }) => {
  return (
    <ContextMenuTrigger id='menu_id' data={data} collect={collect}>
      <Card className='d-flex flex-row mb-4'>
        <NavLink to={link} className='d-flex'>
          <ThumbnailImage
            rounded
            small
            src={
              data?.avatarUrl ||
              'https://storage.googleapis.com/pb-hmi/1673936447522-hmi-242843952_163910312580823_2083055988702944791_n.jpg'
            }
            alt='profile'
            className='m-4'
          />
        </NavLink>
        <div className=' d-flex flex-grow-1 min-width-zero'>
          <CardBody className=' pl-0 align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero'>
            <div className='min-width-zero'>
              <NavLink to={link}>
                <CardSubtitle className='truncate mb-1'>
                  {data?.name} {data?.memberId && `- ${data?.memberId}`}
                </CardSubtitle>
              </NavLink>
              <CardText className='text-muted text-small mb-2'>
                {data?.email} {data?.contact && `- ${data?.contact}`}
              </CardText>
              <CardText className='text-muted text-small mb-2'>
                {data?.unit?.name}
              </CardText>
              {data?.party && (
                <CardText className='text-small'>
                  {data?.party} - {data?.fraksi}
                </CardText>
              )}
            </div>
          </CardBody>
        </div>
      </Card>
    </ContextMenuTrigger>
  );
};

export default React.memo(UserCardBasic);
