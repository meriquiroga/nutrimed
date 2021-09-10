import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";
import patientActions from "../redux/actions/patientActions";

const EditProfilePatient = (props) => {
  const mail = props.user.userExist.data.mail;
  const [actPat, setActPat] = useState({
    dni: "",
    data: {
      direction: {
        street: "",
        num: "",
        city: "",
      },
      phoneNumber: "",
      src: "",
    },
    socialWork: "",
  });
  const [previewImg, setPreviewImg] = useState(
    "https://i.postimg.cc/Hn7rq5TV/avatar5.png"
  );
  const [avatars, setAvatars] = useState([]);

  useEffect(() => {
    async function getAllAvatars() {
      let response = await props.getAvatars();
      if (response.success) {
        setAvatars(response.res);
        console.log(response.res);
      } else {
        console.log("no fetchea avatares");
      }
    }
    getAllAvatars();

    return false;
  }, []);

  const addDocHandler = (e) => {
    if (
      e.target.name === "street" ||
      e.target.name === "num" ||
      e.target.name === "city"
    ) {
      setActPat({
        ...actPat,
        data: {
          direction: {
            ...actPat.data.direction,
            [e.target.name]: e.target.value,
          },
        },
      });
    } else if (e.target.name === "phoneNumber") {
      setActPat({
        ...actPat,
        data: { ...actPat.data, phoneNumber: e.target.value },
      });
    } else {
      setActPat({ ...actPat, [e.target.name]: e.target.value });
    }
  };

  const submitHandler = () => {
    props.upgradePat(props.user.doc, actPat, props.token);
  };

  const allSocialWork = [
    "MEDICAL",
    "SWISS",
    "APMA",
    "OSDE",
    "CARA",
    "UDE",
    "OSPIM",
    "PREVENCIOON SALUD",
    "SANCOR",
    "LIAW",
  ];
  const inputValue = (e) => {
    setPreviewImg(e.target.value);
  };

  return (
    <div className="container">
      <div className="grayContainer">
        <img src="/assets/form.png" alt="" />
        <h3>Por favor, completá tus datos</h3>
        <form className="inputs">
          <input
            type="text"
            placeholder="DNI"
            name="dni"
            onChange={addDocHandler}
            defaultValue={actPat.dni}
          />
          <input
            type="text"
            placeholder="Teléfono"
            name="phoneNumber"
            onChange={addDocHandler}
            defaultValue={actPat.data.phoneNumber}
          />
          <input
            type="text"
            placeholder="Calle"
            name="street"
            onChange={addDocHandler}
            defaultValue={actPat.data.direction.street}
          />
          <input
            type="text"
            placeholder="Número"
            name="num"
            onChange={addDocHandler}
            defaultValue={actPat.data.direction.num}
          />
          <input
            type="text"
            placeholder="Ciudad"
            name="city"
            onChange={addDocHandler}
            defaultValue={actPat.data.direction.city}
          />
          <select
            id="optionObraSocial"
            name="socialWork"
            onChange={addDocHandler}
            defaultValue={actPat.socialWork}
          >
            <option>Seleccioná tu obra social </option>
            {allSocialWork.map((social, index) => (
              <option key={index}>{social}</option>
            ))}
            <option>Otra</option>
          </select>
          <div className="containerPreview">
            <div
              className="preview"
              style={{
                backgroundImage: `url("${previewImg}")`,
              }}
            ></div>

            <div className="thumbNails">
              {avatars.map((div, index) => (
                <div
                  onClick={inputValue}
                  className="thumbNail"
                  key={index}
                  style={{
                    backgroundImage: `url("${div.src}")`,
                  }}
                >
                  <input className="inputAvatar" defaultValue={div.src}></input>
                </div>
              ))}
            </div>
          </div>
        </form>
        <button type="submit" onClick={submitHandler}>
          ENVIAR
        </button>
        <div>
          <Link to="/profile">Volver al perfil</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  upgradePat: doctorActions.editProfile,
  getAvatars: patientActions.getAvatars,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePatient);
