import React, { useRef, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from 'availity-reactstrap-validation';
import Lightbox from 'react-image-lightbox';
import IntlMessages from '../../helpers/IntlMessages';
import DropzoneExample from '../../containers/forms/DropzoneExample';
import DropzoneCover from '../../containers/forms/DropzoneCover';
import { SliderTooltip } from '../../components/common/SliderTooltips';

const AddNewModal = ({
  modalOpen,
  toggleModal,
  data,
  onChange,
  onSubmit,
  setScore,
  onUploadImg,
  onUploadFile,
  isUpdate,
  isRemoveCover,
  setIsRemoveCover,
  isRemoveFile,
  setIsRemoveFile,
  setNasionalism,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropzone = useRef();

  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Tambah Model Pembelajaran</ModalHeader>
      <ModalBody>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <AvGroup>
            <Label>Judul</Label>
            <AvInput
              required
              value={data.title}
              name="title"
              onChange={onChange}
            />

            <AvFeedback>Judul wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Tahun</Label>
            <AvInput
              required
              value={data.year}
              name="year"
              type="number"
              onChange={onChange}
            />
            <AvFeedback>Tahun wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Pengarang</Label>
            <AvInput
              required
              value={data.author}
              name="author"
              onChange={onChange}
            />
            <AvFeedback>Wajib di isi!</AvFeedback>
          </AvGroup>

          <AvGroup>
            <AvField
              type="select"
              name="equivalenceModule"
              required
              label="Kesetaraan Modul"
              errorMessage="Wajib di isi!"
              onChange={onChange}
              value={data.equivalenceModule}
            >
              {/* <option value="" /> */}
              <option>Tidak Ada</option>
              <option>Kurang</option>
              <option>Cukup</option>
            </AvField>
          </AvGroup>

          <AvGroup>
            <AvField
              type="select"
              name="teacherExpertise"
              required
              label="Keahlian Guru"
              errorMessage="Wajib di isi!"
              onChange={onChange}
              value={data.teacherExpertise}
            >
              {/* <option value="" /> */}
              <option>Tidak Ada</option>
              <option>Kurang</option>
              <option>Cukup</option>
            </AvField>
          </AvGroup>
          <AvGroup>
            <Label>Deskripsi</Label>
            <AvInput
              type="textarea"
              name="description"
              id="description"
              required
              value={data.description}
              onChange={onChange}
            />
            <AvFeedback>Wajib di isi!</AvFeedback>
          </AvGroup>
          <Label className="mt-3">Kandungan Budaya Lokal</Label>
          <SliderTooltip
            min={0}
            max={100}
            defaultValue={data.score}
            className="mb-5"
            step={1}
            onChange={setScore}
          />

          <Label className="mt-3">Kandungan Konten Nasionalisme</Label>
          <SliderTooltip
            min={0}
            max={100}
            defaultValue={data.nasionalismContent}
            className="mb-5"
            step={1}
            onChange={setNasionalism}
          />

          <AvRadioGroup
            className="error-l-150 "
            name="learningConcept"
            required
            value={data.learningConcept}
          >
            <Label className="d-block mt-4">Konsep Pembelajaran</Label>
            <AvRadio
              customInput
              onChange={onChange}
              label="Kontekstual"
              value="Kontekstual"
            />
            <AvRadio
              customInput
              onChange={onChange}
              label="Tekstual"
              value="Tekstual"
            />
          </AvRadioGroup>
          <Label className="mt-4">Cover Model</Label>

          {isUpdate ? (
            isRemoveCover ? (
              <DropzoneCover ref={dropzone} onUpload={onUploadImg} />
            ) : (
              <div />
            )
          ) : (
            <DropzoneCover ref={dropzone} onUpload={onUploadImg} />
          )}

          {isUpdate && !isRemoveCover && (
            <div className="col-6">
              <NavLink to="#" location={{}}>
                <div className="position-absolute card-top-buttons">
                  <Button
                    outline
                    color="white"
                    className="icon-button"
                    onClick={() => {
                      setIsRemoveCover(true);
                    }}
                  >
                    <i className="simple-icon-trash" />
                  </Button>
                </div>
                <img
                  className="img-fluid border-radius"
                  src={data.coverUrl}
                  alt="thumbnail"
                  style={{ height: '130px' }}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                />
              </NavLink>
            </div>
          )}

          <Label className="mt-3">File Model</Label>
          {isUpdate ? (
            isRemoveFile ? (
              <DropzoneExample ref={dropzone} onUpload={onUploadFile} />
            ) : (
              <div />
            )
          ) : (
            <DropzoneExample ref={dropzone} onUpload={onUploadFile} />
          )}

          {isUpdate && !isRemoveFile && (
            <div className="col-6">
              <div className="position-absolute card-top-buttons">
                <Button
                  outline
                  color="white"
                  className="icon-button"
                  onClick={() => {
                    setIsRemoveFile(true);
                  }}
                >
                  <i className="simple-icon-trash" />
                </Button>
              </div>
              <a href={data.fileUrl} target="_blank">
                <img
                  className="img-fluid border-radius"
                  src="https://icons.iconarchive.com/icons/graphicloads/filetype/256/pdf-icon.png"
                  alt="thumbnail"
                  style={{ height: '130px' }}
                />
              </a>
            </div>
          )}

          {/* <DropzoneExample ref={dropzone} onUpload={onUploadFile} /> */}

          <Button color="primary" className="mt-5 mr-5 ml-4">
            Submit
          </Button>
          <Button
            color="secondary"
            outline
            className="mt-5 ml-5"
            onClick={toggleModal}
          >
            <IntlMessages id="pages.cancel" />
          </Button>
        </AvForm>
        {isOpen && (
          <Lightbox
            mainSrc={data.coverUrl}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </ModalBody>
    </Modal>
  );
};

export default AddNewModal;
