import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import patientActions from "../redux/actions/patientActions";
import userActions from "../redux/actions/userActions";
const EditProfilePatient = (props) => {
  const { data, dni, src, socialWork } = props.user;
  const { direction, phoneNumber } = data;
  const { token } = props;
  const email = props.user.data.mail;
  const [validEdit, setValidEdit] = useState(false);
  const [actPat, setActPat] = useState({
    dni: dni,
    data: {
      direction: {
        street: direction.street,
        num: direction.num,
        city: direction.city,
      },
      mail: email,
      phoneNumber: phoneNumber,
    },
    src: src,
    socialWork: socialWork,
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
      }
    }
    getAllAvatars();

    return false;
  }, []);

  const addDocHandler = (e) => {
    if (e.target.name === "street") {
      setActPat({
        ...actPat,
        data: {
          ...actPat.data,
          direction: { ...actPat.data.direction, street: e.target.value },
        },
      });
    } else if (e.target.name === "num") {
      setActPat({
        ...actPat,
        data: {
          ...actPat.data,
          direction: { ...actPat.data.direction, num: e.target.value },
        },
      });
    } else if (e.target.name === "city") {
      setActPat({
        ...actPat,
        data: {
          ...actPat.data,
          direction: { ...actPat.data.direction, city: e.target.value },
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

  const editHandler = () => {
    setValidEdit(!validEdit);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const submitHandler = () => {
    props.editProfile(props.user.doc, actPat, token).then((res) => {
      if (res.success) {
        props.history.push("/profile");
      }
    });
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
            defaultValue={token ? dni : actPat.dni}
            disabled={!dni ? false : validEdit ? false : true}
          />
          <input
            type="text"
            placeholder="Teléfono"
            name="phoneNumber"
            onChange={addDocHandler}
            defaultValue={token ? data.phoneNumber : actPat.data.phoneNumber}
            disabled={!data.phoneNumber ? false : validEdit ? false : true}
          />
          <input
            type="text"
            placeholder="Calle"
            name="street"
            onChange={addDocHandler}
            defaultValue={
              token ? data.direction.street : actPat.data.direction.street
            }
            disabled={!data.direction.street ? false : validEdit ? false : true}
          />
          <input
            type="text"
            placeholder="Número"
            name="num"
            onChange={addDocHandler}
            defaultValue={
              token ? data.direction.num : actPat.data.direction.num
            }
            disabled={!data.direction.num ? false : validEdit ? false : true}
          />
          <input
            type="text"
            placeholder="Ciudad"
            name="city"
            onChange={addDocHandler}
            defaultValue={
              token ? data.direction.city : actPat.data.direction.city
            }
            disabled={!data.direction.city ? false : validEdit ? false : true}
            onKeyPress={handleKeyPress}
          />
          <span onClick={editHandler}>
            {!validEdit ? "Editar ✏️" : "Cancelar ❌"}
          </span>
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
                  <input
                    className="inputAvatar"
                    name="src"
                    onClick={addDocHandler}
                    defaultValue={div.src}
                  ></input>
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
  editProfile: userActions.editProfile,
  getAvatars: patientActions.getAvatars,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePatient);
