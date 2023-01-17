import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Card,
  CardBody,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  CardTitle,
  Label,
  Button,
} from "reactstrap";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
} from "availity-reactstrap-validation";
import axios from "axios";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import SingleLightbox from "../../../components/pages/SingleLightbox";
import whotoFollowData from "../../../data/follow";
import UploadZone from "./UploadZone";
import { NotificationManager } from "../../../components/common/react-notifications";
import { getToken } from "../../../helpers/Utils";
import { baseUrl } from "../../../constants/defaultValues";
import { updateProfile } from "../../../redux/actions";
import { size } from "lodash";

const friendsData = whotoFollowData.slice();
const followData = whotoFollowData.slice(0, 5);

const ProfileSocial = ({ match, updateProfileAction }) => {
  const dropzone = useRef();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [notMacth, setNotMatch] = useState(false);

  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      axios
        .get(`${baseUrl}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          return res.data;
        })
        .then((data) => {
          setUser(data);
        });
    }
    fetchData();
  }, []);

  const onSubmit = () => {
    updateProfileAction(user, (callBack) => {
      if (callBack.status === 200) {
        setUser(callBack.data);
        createNotification("success", "Berhasil perbarui profil");
      } else {
        createNotification("error");
      }
    });
  };

  const createNotification = (type, msg, className) => {
    const cName = className || "";
    switch (type) {
      case "success":
        NotificationManager.success("Sukses!", msg, 3000, null, null, cName);
        break;
      case "error":
        NotificationManager.error(
          msg || "Silahkan lengkapi data",
          "Terjadi Kesalahan!",
          3000,
          null,
          null,
          cName
        );
        break;
      default:
        NotificationManager.info("Info message");
        break;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const onUpload = (file) => {
    const img = JSON.parse(file.xhr.response);
    setUser((prevState) => ({ ...prevState, avatarUrl: img.fileUrl }));
  };

  const onChangePass = (e) => {
    const { value } = e.target;
    setOldPassword(value);
  };

  const retypePass = (e) => {
    setNotMatch(false);
    const { value } = e.target;
    setRetypePassword(value);
  };

  const onPassword = async (e, errors) => {
    const token = getToken();
    if (newPassword !== retypePassword) {
      setNotMatch(true);
    } else {
      if (size(errors) === 0) {
        axios
          .patch(
            `${baseUrl}/user/change-password`,
            {
              recentPassword: oldPassword,
              newPassword,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            return res;
          })
          .then((data) => {
            if (data.status === 200) {
              setOldPassword("");
              setNewPassword("");
              setRetypePassword("");
              setNotMatch(false);
              createNotification("success", "Berhasil mengganti password");
            }
          })
          .catch((error) => {
            createNotification("error", "Password lama tidak sesuai");
          });
      }
    }
  };

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h1>{user.name}</h1>
          <Breadcrumb match={match} />

          <Nav tabs className="separator-tabs ml-0 mb-5">
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "profile",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("profile")}
                to="#"
                location={{}}
              >
                <IntlMessages id="pages.profile" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "changePassword",
                  "nav-link": true,
                })}
                onClick={() => setActiveTab("changePassword")}
                to="#"
                location={{}}
              >
                GANTI PASSWORD
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId="profile">
              <Row>
                <Colxx xxs="12" className="mb-5">
                  <Card></Card>
                  <div className="mb-5" />
                  <div className="mb-5" />
                  <div className="mb-5" />
                </Colxx>
                <Colxx xxs="12" lg="5" xl="4" className="col-left">
                  <SingleLightbox
                    thumb={user.avatarUrl || "/assets/img/profiles/l-9.jpg"}
                    large={user.avatarUrl || "/assets/img/profiles/l-9.jpg"}
                    className="img-thumbnail card-img social-profile-img"
                  />

                  <Card className="mb-4">
                    <CardBody>
                      <div className="text-center pt-4">
                        <p className="list-item-heading pt-2">{user.name}</p>
                      </div>
                      <p className="mb-3">{user.bio}</p>
                      <p className="text-muted text-small mb-2">Email</p>
                      <div className="social-icons">
                        <ul className="list-unstyled list-inline">
                          <li className="list-inline-item">
                            <a href={`mailto:${user.email}`}>
                              <i className="iconsminds-mail" />
                              <span
                                className="ml-1"
                                style={{ fontSize: "13.6px" }}
                              >
                                {user.email}
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                </Colxx>
                <Colxx xxs="12" lg="7" xl="8" className="col-right">
                  <Card className="mb-4">
                    <CardBody>
                      <CardTitle>Update Profile</CardTitle>

                      <AvForm
                        className="av-tooltip tooltip-label-right"
                        onSubmit={(event, errors, values) =>
                          onSubmit(event, errors, values)
                        }
                      >
                        <Label className="mb-3">Foto Profile</Label>

                        <div className="row">
                          <div className="col-3">
                            <SingleLightbox
                              thumb={
                                user.avatarUrl || "/assets/img/profiles/l-9.jpg"
                              }
                              large={
                                user.avatarUrl || "/assets/img/profiles/l-9.jpg"
                              }
                              className="img-thumbnail card-img"
                            />
                          </div>
                          <div className="col-9">
                            <UploadZone ref={dropzone} onUpload={onUpload} />
                          </div>
                        </div>

                        <AvGroup>
                          <Label className="mt-3">Nama</Label>
                          <AvInput
                            name="name"
                            required
                            value={user.name}
                            onChange={onChange}
                          />
                          <AvFeedback>Nama wajib diisi!</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                          <Label>Email</Label>
                          <AvInput
                            name="email"
                            required
                            value={user.email}
                            onChange={onChange}
                          />
                          <AvFeedback>Email wajib diisi!</AvFeedback>
                        </AvGroup>
                        <AvGroup>
                          <Label>Biography</Label>
                          <AvInput
                            type="textarea"
                            name="bio"
                            id="bio"
                            value={user.bio}
                            onChange={onChange}
                          />
                          <AvFeedback>Wajib di isi!</AvFeedback>
                        </AvGroup>

                        <Button color="primary" className="text-center">
                          Simpan
                        </Button>
                      </AvForm>
                    </CardBody>
                  </Card>
                </Colxx>
              </Row>
            </TabPane>
            <TabPane tabId="changePassword">
              <Card className="mb-5">
                <CardBody>
                  <h6 className="mb-4">Ganti Password</h6>
                  <AvForm
                    className="av-tooltip tooltip-label-right"
                    onSubmit={(event, errors, values) =>
                      onPassword(event, errors, values)
                    }
                  >
                    <AvGroup>
                      <Label>Password Lama</Label>
                      <AvInput
                        name="oldPassword"
                        required
                        onChange={onChangePass}
                        type="password"
                      />
                      <AvFeedback>Password lama wajib diisi!</AvFeedback>
                    </AvGroup>
                    <hr />
                    <AvGroup>
                      <Label>Password Baru</Label>
                      <AvInput
                        name="newPassword"
                        required
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <AvFeedback>Password baru wajib diisi!</AvFeedback>
                    </AvGroup>

                    <AvGroup>
                      <Label>Ulangi Password</Label>
                      <AvInput
                        name="retypePassword"
                        required
                        type="password"
                        onChange={retypePass}
                      />
                      <AvFeedback>Ulangi Password wajib diisi!</AvFeedback>
                      {notMacth && (
                        <span style={{ color: "red" }}>
                          Password tidak sama
                        </span>
                      )}
                    </AvGroup>

                    <Button color="primary">Submit</Button>
                  </AvForm>
                </CardBody>
              </Card>
            </TabPane>
          </TabContent>
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ authUser }) => ({
  // user: authUser.currentUser,
});
export default connect(mapStateToProps, {
  updateProfileAction: updateProfile,
})(ProfileSocial);
