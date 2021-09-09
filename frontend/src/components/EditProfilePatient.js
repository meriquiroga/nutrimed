import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";

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
      socialWork: "",
      src:""
    },
  });
  const [previewImg, setPreviewImg] = useState(
    "https://pickaface.net/gallery/avatar/64431738_161013_0015_3fnpl.png"
  );

  const addDocHandler = (e) => {
    if (e.target.name === "street") {
      setActPat({
        ...actPat,
        data: {
          direction: { ...actPat.data.direction, street: e.target.value },
        },
      });
    } else if (e.target.name === "phoneNumber") {
      setActPat({
        ...actPat,
        data: { ...actPat.data, phoneNumber: e.target.value },
      });
    } else if (e.target.name === "num") {
      setActPat({
        ...actPat,
        data: {
          direction: { ...actPat.data.direction, num: e.target.value },
        },
      });
    } else if (e.target.name === "city") {
      setActPat({
        ...actPat,
        data: {
          direction: { ...actPat.data.direction, city: e.target.value },
        },
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

  const avatarsArray = [
    {
      url: "https://st4.depositphotos.com/1012074/20946/v/600/depositphotos_209469984-stock-illustration-flat-and-isolated-vector-illustration.jpg",
      name: "avatar one",
    },
    {
      url: "https://pickaface.net/gallery/avatar/64431738_161013_0015_3fnpl.png",
      name: "avatar two",
    },
    {
      url: "https://image.shutterstock.com/image-vector/man-faceless-cartoon-260nw-1025524036.jpg",
      name: "avatar three",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTea6mpJZODj13Lvutndl6PgvULvVC3tPcreM4doidd7vHImnTOeK0HkfZIrFGeHuN_aJc&usqp=CAU",
      name: "avatar four",
    },
    {
      url: "https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-9-avatar-2754584_120518.png",
      name: "avatar five",
    },
  ];
  const inputValue = (e) => {
    setPreviewImg(e.target.value);
  };
  return (
    <div className="container">
      <div className="signUpForm">
        <img src="/assets/form.png" alt="" />
        <h3>Por favor, completá tus datos</h3>
        <form className="inputs">
          <input
            type="number"
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
            type="number"
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
            <option>Otro.</option>
          </select>
          <div class="containerPreview">
            <div
              class="preview"
              style={{
                backgroundImage: `url("${previewImg}")`,
              }}
            ></div>
            <div class="avatarInput">
              <select onChange={inputValue} name="avatar">
                <option>Seleccioná tu avatar</option>
                {avatarsArray.map((img, index) => (
                  <option key={index} value={img.url}>
                    {img.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <label>Tu historia clínica</label>
               <input
                  id="fileCharger"
                  ref={inputPreview}
                  type="file"
                  name="file"
                  multiple
                  onChange={inputHandler}
               ></input>
               <div className="preview">
                  <img src="" ref={preview} alt="preview" />
               </div> */}
        </form>
        <button type="submit" onClick={submitHandler}>
          ENVIAR
        </button>
        <div>
          <Link to="/patient">Volver al perfil</Link>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePatient);
