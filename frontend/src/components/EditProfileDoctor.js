import { useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions";
import { Link } from "react-router-dom";

const EditProfileDoctor = (props) => {
  const {token} = props
  const {data, dni, description, specialty, registration, src} = props.user
  const { direction, phoneNumber } = data;
  const email = props.user.data.mail;
  const [valueIn, setValueIn] = useState(true);
  const [validEdit, setValidEdit] = useState(false);
  const [textError, setTextError]= useState('')
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
      }else{
        setTextError('No se pudieron actualizar los datos. Por favor, intentalo m??s tarde.')
      }
    });
  };

  return (
    <>
      <div className="container">
        <div className="grayContainer">
          <h3>Complet?? o actualiz?? tus datos</h3>
          {!validEdit ? <span id='editProfile' onClick={editHandler}>EDITAR</span> : <Link to = "/profile">Cancelar y volver al perfil</Link>}
          <form className="inputs">
            <div className="forError">
              <input
                type="text"
                placeholder="INGRESE DNI SIN PUNTOS NI ESPACIOS"
                name="dni"
                onChange={addDocHandler}
                // defaultValue={actDoc.dni}
                defaultValue={dni}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Descripci??n"
                name="description"
                onChange={addDocHandler}
                defaultValue={description}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="N?? de matr??cula"
                name="registration"
                onChange={addDocHandler}
                defaultValue={registration}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Especialidad"
                name="specialty"
                onChange={addDocHandler}
                defaultValue={specialty}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Tel??fono"
                name="phoneNumber"
                onChange={addDocHandler}
                defaultValue={data.phoneNumber}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="Calle"
                name="street"
                onChange={addDocHandler}
                defaultValue={data.direction.street}
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
              <input
                type="text"
                placeholder="N??mero"
                name="num"
                onChange={addDocHandler}
                // defaultValue={actDoc.data.direction.num}
                defaultValue={data.direction.num}
                disabled={validEdit ? false : true}
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
                disabled={validEdit ? false : true}
              />
            </div>
            <div className="forError">
            {<input
              type="text"
              placeholder="URL de imagen"
              name="src"
              onChange={addDocHandler}
              // defaultValue={actDoc.data.direction.city}
              defaultValue={src}
              disabled={validEdit ? false : true}
              onKeyPress={handleKeyPress}
            />}
            </div>
          </form>
          {(!props.socialWork && validEdit) && <h4>??Acept??s Obra Social? </h4>}
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
            {validEdit && <button onClick={submitHandler}>ACTUALIZAR DATOS</button>}
               <div>
                  <Link to="/profile">Volver al perfil</Link>
               </div>
               <span className='red'>{textError}</span>
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
