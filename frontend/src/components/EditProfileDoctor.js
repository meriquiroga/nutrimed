import { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { Link } from "react-router-dom";

const EditProfileDoctor = (props) => {
  console.log(props)
  const {token} = props
  const {data, dni, description, specialty, registration, src} = props.user
  const { direction, phoneNumber } = data;
  const email = props.user.data.mail;
  const [valueIn, setValueIn] = useState(true);
  const [validEdit, setValidEdit] = useState(false);
  const [actDoc, setActDoc] = useState({
    dni: dni,
    description: description,
    registration: registration,
    specialty: specialty,
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
   socialwork: "",
})
 
  const editHandler = () => {
    setValidEdit(!validEdit);
  };

  const addDocHandler = (e) => {
    if (e.target.name === "street") {
      setActDoc({
        ...actDoc,
        data: {
          ...actDoc.data,
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
        data: {
          ...actDoc.data,
          direction: { ...actDoc.data.direction, num: e.target.value },
        },
      });
    } else if (e.target.name === "city") {
      setActDoc({
        ...actDoc,
        data: {
          ...actDoc.data,
          direction: { ...actDoc.data.direction, city: e.target.value },
        },
      });
    } else {
      setActDoc({ ...actDoc, [e.target.name]: e.target.value });
    }
  };

  const socialWorkHandler = (e) => {
    setValueIn(!valueIn);
    setActDoc({ ...actDoc, [e.target.name]: valueIn });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      submitHandler();
    }
  };

  const submitHandler = () => {
    props.editProfile(props.user.doc, actDoc, props.token).then((res) => {
      if (res.success) {
        props.history.push("/profile");
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="grayContainer">
          <h3>Completá o actualizá tus datos</h3>
          {!validEdit ? <span className='editProfile' onClick={editHandler}>Editar</span> : <Link to = "/profile">Cancelar y volver al perfil</Link>}
          <form className="inputs">
            <div className="forError">
              <input
                type="text"
                placeholder="DNI"
                name="dni"
                onChange={addDocHandler}
                // defaultValue={actDoc.dni}
                defaultValue={dni}
                disabled={!dni ? false : validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Descripción"
                name="description"
                onChange={addDocHandler}
                defaultValue={description}
                disabled={
                  !description ? false : validEdit ? false : true
                }
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="N° de matrícula"
                name="registration"
                onChange={addDocHandler}
                defaultValue={registration}
                disabled={!registration ? false : validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Especialidad"
                name="specialty"
                onChange={addDocHandler}
                defaultValue={specialty}
                disabled={!specialty ? false : validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Teléfono"
                name="phoneNumber"
                onChange={addDocHandler}
                defaultValue={data.phoneNumber}
                disabled={!data.phoneNumber ? false : validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Calle"
                name="street"
                onChange={addDocHandler}
                defaultValue={data.direction.street}
                disabled={
                  !data.direction.street ? false : validEdit ? false : true
                }
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Número"
                name="num"
                onChange={addDocHandler}
                // defaultValue={actDoc.data.direction.num}
                defaultValue={data.direction.num}
                disabled={
                  !data.direction.num ? false : validEdit ? false : true
                }
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Ciudad"
                name="city"
                onChange={addDocHandler}
                // defaultValue={actDoc.data.direction.city}
                defaultValue={
                  token ? data.direction.city : actDoc.data.direction.city
                }
                disabled={
                  !data.direction.city ? false : validEdit ? false : true
                }
              />
            </div>
            <div className="forError">
            {<input
              type="text"
              placeholder="Url de imágen"
              name="src"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.direction.city}
              defaultValue={src}
              disabled={validEdit ? false : true}
              onKeyPress={handleKeyPress}
            />}
            </div>
          </form>
          {(!props.socialWork && validEdit) && <h4>¿Acepta Obra Social? </h4>}
          {(!props.socialWork && validEdit) && 
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
            </div>}
               <button onClick={submitHandler}>Actualizar datos</button>
               <div>
                  <Link to="/profile">Volver al perfil</Link>
               </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.dataUser,
    token: state.users.token,
  };
};

const mapDispatchToProps = {
  editProfile: userActions.editProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileDoctor);
