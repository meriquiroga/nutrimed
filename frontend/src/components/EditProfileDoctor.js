import { useState } from "react";
import { connect } from "react-redux";
import doctorActions from "../redux/actions/doctorActions";
import { Link } from "react-router-dom";

const EditProfileDoctor = (props) => {
  const mail = props.user.userExist.data.mail;
  const [valueIn, setValueIn] = useState(true);
  const [actDoc, setActDoc] = useState({
    dni: "",
    description: "",
    registration: "",
    specialty: "",
    data: {
      direction: {
        street: "",
        num: "",
        city: "",
      },
      mail,
      phoneNumber: "",
    },
    socialWork: "",
  });

  const addDocHandler = (e) => {
    // if (e.target.name === "socialWork"){
    //   console.log("aca")
    //   console.log(valueIn)
    //   setActDoc({...actDoc, [e.target.name]: valueIn})
    //   }
    if (e.target.name === "street") {
      setActDoc({
        ...actDoc,
        data: {
          direction: { ...actDoc.data.direction, street: e.target.value },
        },
      });
    } else if (e.target.name === "phoneNumber") {
      setActDoc({
        ...actDoc,
        data: { ...actDoc.data, phoneNumber: e.target.value },
      });
    } else if (e.target.name === "num") {
      setActDoc({
        ...actDoc,
        data: { direction: { ...actDoc.data.direction, num: e.target.value } },
      });
    } else if (e.target.name === "city") {
      setActDoc({
        ...actDoc,
        data: { direction: { ...actDoc.data.direction, city: e.target.value } },
      });
    } else {
      setActDoc({ ...actDoc, [e.target.name]: e.target.value });
    }
  };

  const socialWorkHandler = (e) => {
    setValueIn(!valueIn);
    setActDoc({ ...actDoc, [e.target.name]: valueIn });
  };

  const submitHandler = () => {
    props.upgradeDoc(props.user.doc, actDoc, props.token);
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
  console.log(actDoc);
  return (
    <>
      <div className="container">
        <div className="grayContainer">
          <h3>Completá o actualizá tus datos</h3>
          <form className="inputs">
            <input
              type="text"
              placeholder="DNI"
              name="dni"
              onChange={addDocHandler}
              defaultValue={actDoc.dni}
            />
            <input
              type="text"
              placeholder="Descripción"
              name="description"
              onChange={addDocHandler}
              defaultValue={actDoc.description}
            />
            <input
              type="text"
              placeholder="N° de matrícula"
              name="registration"
              onChange={addDocHandler}
              defaultValue={actDoc.registration}
            />
            <input
              type="text"
              placeholder="Especialidad"
              name="specialty"
              onChange={addDocHandler}
              defaultValue={actDoc.specialty}
            />
            <input
              type="text"
              placeholder="Teléfono"
              name="phoneNumber"
              onChange={addDocHandler}
              defaultValue={actDoc.data.phoneNumber}
            />
            <input
              type="text"
              placeholder="Calle"
              name="street"
              onChange={addDocHandler}
              defaultValue={actDoc.data.direction.street}
            />
            <input
              type="text"
              placeholder="Número"
              name="num"
              onChange={addDocHandler}
              defaultValue={actDoc.data.direction.num}
            />
            <input
              type="text"
              placeholder="Ciudad"
              name="city"
              onChange={addDocHandler}
              defaultValue={actDoc.data.direction.city}
            />
          </form>
          <h4>¿Acepta Obra Social? </h4>
          <div className="radio">
            <div>
              Si{" "}
              <input
                type="radio"
                name="socialWork"
                onChange={addDocHandler}
                onClick={socialWorkHandler}
                value={true}
              />
            </div>
            <div>
              No{" "}
              <input
                type="radio"
                name="socialWork"
                onChange={addDocHandler}
                onClick={socialWorkHandler}
                value={false}
              />
            </div>
          </div>
          <button onClick={submitHandler}>Actualizar datos</button>
          <div><Link to="/profile">Volver al perfil</Link></div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  upgradeDoc: doctorActions.editProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDoctor);
