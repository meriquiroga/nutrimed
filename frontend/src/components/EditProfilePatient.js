import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import patientActions from "../redux/actions/patientActions";
import userActions from "../redux/actions/userActions";

const EditProfilePatient = ({
  user,
  token,
  getAvatars,
  getSocialWork,
  editProfile,
  history,
}) => {
  const { data, dni, src, socialWork } = user;
  const { direction, phoneNumber } = data;
  const email = user.data.mail;
  const [validEdit, setValidEdit] = useState(false);
  const [allSocialWork, setAllSocialWork] = useState([]);
  const [avatars, setAvatars] = useState([]);
  const [previewImg, setPreviewImg] = useState(src);
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

  useEffect(() => {
    async function getAllAvatars() {
      let response = await getAvatars();
      if (response.success) {
        setAvatars(response.res);
      }
    }
    getAllAvatars();
    getSocialWork().then((res) => setAllSocialWork(res.res));

    return false;
    // eslint-disable-next-line
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
    editProfile(user.doc, actPat, token).then((res) => {
      if (res.success) {
        history.push("/profile");
      }
    });
  };

  const inputValue = (e) => {

    setPreviewImg(e.target.value)
 }
  return (
    <div className="container">
      <div className="grayContainer">
        <img src="/assets/form.png" alt="" />
        <h3>Por favor, completá tus datos</h3>
        {!validEdit ? <span className='editProfile' onClick={editHandler}>Editar</span> : <Link to = "/profile">Cancelar y volver al perfil</Link>}
        <form className="inputs">
          <div className="forError">
            <input
              type="text"
              placeholder="DNI"
              name="dni"
              onChange={addDocHandler}
              defaultValue={token ? dni : actPat.dni}
              disabled={!dni ? false : validEdit ? false : true}
            />
          </div>
          <div className="forError">
            <input
              type="text"
              placeholder="Teléfono"
              name="phoneNumber"
              onChange={addDocHandler}
              defaultValue={token ? data.phoneNumber : actPat.data.phoneNumber}
              disabled={!data.phoneNumber ? false : validEdit ? false : true}
            />
          </div>

          <div className="forError">
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
          </div>
          <div className="forError">
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
          </div>

          <div className="forError">
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
          </div>

          <div className="forError">
          {<select
                  id="optionObraSocial"
                  name="socialWork"
                  onChange={addDocHandler}
                  defaultValue={actPat.socialWork}
                  disabled={
                     !socialWork ? false : validEdit ? false : true
                  }
               >
                  <option>Seleccioná tu obra social </option>
                  {(socialWork.length && validEdit) ? allSocialWork.map((social, index) => (
                     <option key={index}>{social}</option>
                  )) : <option defaultValue>{socialWork}</option>}
                  <option>Otra</option>
               </select>}
          </div>
          {(src.length && validEdit) && <div className="containerPreview">
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
                  
               </div>}
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
  getSocialWork: patientActions.getSocialWork,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePatient);
