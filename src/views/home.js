import React, { useState, useEffect, useRef } from "react";
import { adminRoot } from "../constants/defaultValues";
import { NavLink } from "react-router-dom";
import {
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
import classnames from "classnames";
import GlideComponent from "../components/carousel/GlideComponent";
import { scroller } from "react-scroll";
import { saveAs } from "file-saver";
import Headroom from "react-headroom";

const slideSettings = {
  type: "carousel",
  gap: 30,
  perView: 4,
  hideNav: true,
  peek: { before: 10, after: 10 },
  breakpoints: {
    600: { perView: 1 },
    992: { perView: 2 },
    1200: { perView: 3 },
  },
};

const slideItems = [
  {
    icon: "iconsminds-mouse-3",
    title: "Right Click Menu",
    detail:
      "Increases overall usability of the project by providing additional actions menu.",
  },
  {
    icon: "iconsminds-electric-guitar",
    title: "Video Player",
    detail:
      "Carefully themed multimedia players powered by Video.js library with Youtube support.",
  },
  {
    icon: "iconsminds-keyboard",
    title: "Keyboard Shortcuts",
    detail:
      "Easily configurable keyboard shortcuts plugin that highly improves user experience.",
  },
  {
    icon: "iconsminds-three-arrow-fork ",
    title: "Two Panels Menu",
    detail:
      "Three states two panels icon menu that looks good, auto resizes and does the job well.",
  },
  {
    icon: "iconsminds-deer",
    title: "Icons Mind",
    detail:
      "1040 icons in 53 different categories, designed pixel perfect and ready for your project.",
  },
  {
    icon: "iconsminds-palette",
    title: "20 Color Schemes",
    detail:
      "Colors, icons and design harmony that creates excellent themes to cover entire project.",
  },
  {
    icon: "iconsminds-air-balloon-1",
    title: "3 Applications",
    detail:
      "Applications that mostly made of components are the way to get started to create something similar.",
  },
  {
    icon: "iconsminds-resize",
    title: "Extra Responsive",
    detail:
      "Custom Bootstrap 4 xxs & xxl classes delivers better experiences for smaller and larger screens.",
  },
];

const features = [
  {
    title: "Pleasant Design",
    img: "/assets/img/landing-page/features/plesant-design.png",
    detail:
      "As a web developer we enjoy to work on something looks nice. It is not an absolute necessity but it really motivates us that final product will look good for user point of view. <br /><br />So we put a lot of work into colors, icons, composition and design harmony. Themed components and layouts with same design language. <br /><br />We kept user experience principles always at the heart of the design process.",
  },
  {
    title: "Extra Responsive",
    img: "/assets/img/landing-page/features/extra-responsive.png",
    detail:
      "Xxs breakpoint is for smaller screens that has a resolution lower than 420px. Xs works between 576px and 420px. Xxl breakpoint is for larger screens that has a resolution higher than 1440px. Xl works between 1200px and 1440px.<br><br>With this approach we were able to create better experiences for smaller and larger screens.",
  },
  {
    title: "Superfine Charts",
    img: "/assets/img/landing-page/features/superfine-charts.png",
    detail:
      "Using charts is a good way to visualize data but they often look ugly and break the rhythm of design. <br /><br />We concentrated on a single chart library and tried to create charts that look good with color, opacity, border and shadow. <br /><br />Used certain plugins and created some to make charts even more useful and beautiful.",
  },
  {
    title: "Layouts for the Job",
    img: "/assets/img/landing-page/features/layouts-for-the-job.png",
    detail:
      "Layouts are the real thing, they need to be accurate and right for the job. They should be functional for both user and developer. <br /><br />We created lots of different layouts for different jobs.<br /><br />Listing pages with view mode changing capabilities, shift select and select all functionality, application layouts with an additional menu, authentication and error layouts which has a different design than the other pages were our main focus. We also created details page with tabs that can hold many components.",
  },
  {
    title: "Smart Menu",
    img: "/assets/img/landing-page/features/smart-menu.png",
    detail:
      "Instead of good old single panel menus with accordion structure that looks over complicated, we created 2 panels and categorized pages accordingly.<br><br>The default menu auto hides sub panel when resolution is under some breakpoint to open some space. You may also hide menu completely or use only main panel open only.",
  },
];

const Home = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [data, setData] = useState({});
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("click", onWindowClick);
    fetch();
    document.body.classList.add("no-footer");
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("click", onWindowClick);
      document.body.classList.remove("no-footer");
    };
  }, []);

  const fetch = async () => {};

  const onWindowResize = (event) => {
    const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    homeSection.style.backgroundPositionX = homeRect.x - 580 + "px";

    const footerSection = refSectionFooter.current;
    footerSection.style.backgroundPositionX =
      event.target.innerWidth - homeRect.x - 2000 + "px";

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
  };

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100,
    });
    return false;
  };

  const onDownload = () => {
    saveAs(data.fileUrl, `${data.title}.pdf`);
  };

  return (
    <div
      className={classnames("landing-page", {
        "show-mobile-menu": showMobileMenu,
      })}
    >
      <div className="mobile-menu" onClick={(event) => event.stopPropagation()}>
        <NavLink to="/">
          <img
            style={{ cursor: "pointer" }}
            src="/assets/logos/white-full.png"
            height="10%"
            alt="Logo"
            onClick={(event) => scrollTo(event, "home")}
          />
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="c-pointer"
              href="#scroll"
              onClick={(event) => scrollTo(event, "features")}
            >
              HOME
            </a>
          </li>
          <li className="nav-item">
            <a className="c-pointer" onClick={onDownload}>
              KURIKULUM PAUD
            </a>
          </li>

          <li className="nav-item">
            <span style={{ color: "#3a3a3a" }}>
              <UncontrolledDropdown setActiveFromChild>
                <DropdownToggle tag="a" className="nav-link" caret>
                  MODEL PEMBELAJARAN
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem tag="a" href="/download">
                    Download
                  </DropdownItem>
                  <DropdownItem tag="a" href="/recomendation">
                    Rekomendasi
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </span>
          </li>
          <li className="nav-item">
            <NavLink to="/login">LOGIN</NavLink>
          </li>
        </ul>
      </div>

      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <React.Fragment>
                <img
                  style={{ cursor: "pointer" }}
                  src="/assets/logos/white-full.png"
                  height="50%"
                  alt="Logo"
                  href="/"
                  onClick={(event) => scrollTo(event, "home")}
                />
              </React.Fragment>

              <ul className="navbar-nav d-none d-lg-flex flex-row">
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "features")}
                  >
                    HOME
                  </a>
                </li>
                <li className="nav-item">
                  <a className="c-pointer" onClick={onDownload}>
                    KURIKULUM PAUD
                  </a>
                </li>
                <li className="nav-item">
                  <span style={{ color: "white" }}>
                    <UncontrolledDropdown setActiveFromChild>
                      <DropdownToggle tag="a" className="nav-link" caret>
                        MODEL PEMBELAJARAN
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem tag="a" href="/download">
                          Download
                        </DropdownItem>
                        <DropdownItem tag="a" href="/recomendation">
                          Rekomendasi
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </span>
                </li>
                <li className="nav-item">
                  <NavLink to="/login">LOGIN</NavLink>
                </li>
              </ul>
              <span
                className="mobile-menu-button"
                onClick={(event) => {
                  setShowMobileMenu(!showMobileMenu);
                  event.stopPropagation();
                }}
              >
                <i className="simple-icon-menu"></i>
              </span>
            </div>
          </nav>
        </Headroom>
        <div className="content-container" id="home">
          <div className="section home" ref={refSectionHome}>
            <div className="container">
              <div className="row home-row" ref={refRowHome}>
                <div className="col-12 d-block d-md-none">
                  <NavLink to="/">
                    <img
                      alt="mobile hero"
                      className="mobile-hero"
                      src="/assets/img/landing-page/home-hero-mobile.png"
                    />
                  </NavLink>
                </div>

                <div className="col-12 col-xl-4 col-lg-5 col-md-6">
                  <div className="home-text">
                    <div className="display-1">
                      BP-PAUD & DIKMAS <br />
                      Sulawesi Selatan
                    </div>
                    <p className="white mb-5">
                      Kementrian Pendidikan dan Kebudayaan Republik Indonesia
                      <br />
                      <br />
                      Balai Pengembangan Pendidikan Anak Usia Dini dan
                      Pendidikan Masyarakat Sulawesi Selatan. <br />
                      <br />
                      Hope you enjoy it!
                    </p>
                  </div>
                </div>
                <div className="col-12 col-xl-7 offset-xl-1 col-lg-7 col-md-6  d-none d-md-block">
                  <a href={adminRoot} target="_blank">
                    <img
                      alt="hero"
                      height="70%"
                      // src="/assets/img/landing-page/home-hero.png"
                      src="/assets/logos/white-full.png"
                    />
                  </a>
                </div>
              </div>

              <div className="row">
                <div className="col-12 p-0">
                  <div className="home-carousel">
                    <GlideComponent settings={slideSettings}>
                      {slideItems.map((f, index) => (
                        <div key={`slide_${index}`} className="card">
                          <div className="card-body text-center">
                            <div>
                              <i className={f.icon + " large-icon"}></i>
                              <h5 className="mb-3 font-weight-semibold">
                                {f.title}
                              </h5>
                            </div>
                            <div>
                              <p className="detail-text">{f.detail}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </GlideComponent>
                  </div>
                </div>
              </div>

              <div className="row">
                <a
                  className="btn btn-circle btn-outline-semi-light hero-circle-button"
                  href="#scroll"
                  onClick={(event) => scrollTo(event, "features")}
                >
                  <i className="simple-icon-arrow-down"></i>
                </a>
              </div>
            </div>
          </div>

          <div className="section">
            <div className="container" id="features">
              <div className="row">
                <div className="col-12 offset-0 col-lg-8 offset-lg-2 text-center">
                  <h1>Features At a Glance</h1>
                  <p>
                    We tried to create an admin theme that we would like to use
                    ourselves so we listed our priorities. We would like to have
                    a theme that is not over complicated to use, does the job
                    well, contains must have omponents and looks really nice.
                  </p>
                </div>
              </div>
              {features.map((feature, i) => (
                <div key={`feature_${i}`}>
                  {i % 2 === 0 && (
                    <div className="row feature-row">
                      <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: feature.detail,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 offset-lg-1 offset-md-0 position-relative">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className="feature-image-right feature-image-charts position-relative"
                        />
                      </div>
                    </div>
                  )}
                  {/* {i % 2 === 1 && (
                    <div className="row feature-row">
                      <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
                        <img
                          alt={feature.title}
                          src={feature.img}
                          className="feature-image-left feature-image-charts"
                        />
                      </div>
                      <div className="col-12 col-md-6 offset-md-0 col-lg-5 offset-lg-1 d-flex align-items-center order-1 order-md-2">
                        <div className="feature-text-container">
                          <h2>{feature.title}</h2>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: feature.detail,
                            }}
                          ></p>
                        </div>
                      </div>
                    </div>
                  )} */}
                </div>
              ))}
            </div>
          </div>

          <div className="section footer mb-0" ref={refSectionFooter}>
            <div className="container">
              <div className="row footer-row">
                <div className="col-12 text-right">
                  <a
                    className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "home")}
                  >
                    <i className="simple-icon-arrow-up"></i>
                  </a>
                </div>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, "home")}
                  >
                    <img
                      className="footer-logo"
                      alt="footer logo"
                      src="/assets/logos/white-full.png"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12"></div>
                <div className="col-12 text-center">
                  <p className="mb-0">2020 © djaduls</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
