import React from "react";
import {
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from "reactstrap";
import {
  AvForm,
  AvField,
  AvGroup,
  AvInput,
  AvFeedback,
  AvRadioGroup,
  AvRadio,
} from "availity-reactstrap-validation";
import Select from "react-select";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import IntlMessages from "../../../helpers/IntlMessages";

const AddNewModal = ({
  modalOpen,
  toggleModal,
  data,
  onChange,
  onSubmit,
  notMacth,
}) => {
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>Ganti Password</ModalHeader>
      <ModalBody>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
          <AvGroup>
            <Label>Password Sekarang</Label>
            <AvInput
              required
              name="oldPassword"
              value={data.oldPassword}
              onChange={onChange}
              type="password"
            />
            <AvFeedback>Password Sekarang wajib di isi!</AvFeedback>
          </AvGroup>
          <hr />
          <AvGroup>
            <Label>Password Baru</Label>
            <AvInput
              required
              name="newPassword"
              value={data.newPassword}
              onChange={onChange}
              type="password"
            />
            <AvFeedback>Password Baru wajib di isi!</AvFeedback>
          </AvGroup>
          <AvGroup>
            <Label>Ulangi Password</Label>
            <AvInput
              required
              name="retypePassword"
              value={data.retypePassword}
              onChange={onChange}
              type="password"
            />
            <AvFeedback>Ulangi Password wajib di isi!</AvFeedback>
            {notMacth && (
              <span style={{ color: "red" }}>Password tidak sama</span>
            )}
          </AvGroup>

          <Button
            color="secondary"
            outline
            onClick={toggleModal}
            className="mt-5 mr-5 ml-4"
          >
            <IntlMessages id="pages.cancel" />
          </Button>
          <Button color="primary" className="mt-5 ml-5">
            <IntlMessages id="pages.submit" />
          </Button>
        </AvForm>
      </ModalBody>
    </Modal>
  );
};

export default AddNewModal;
