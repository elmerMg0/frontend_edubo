import React from 'react'
import { Modal } from 'react-bootstrap'
import { useEffect, useRef, useState } from "react";
import { validateInputRequired, validateName, validatePassword, validateSelect } from "../../../helpers/validations";
import { typesValidation } from "../../../utilities/constans";
import { EyesIconGlobal } from '../../global/icons/IconsGlobal';
const APIURLIMG = import.meta.env.VITE_REACT_APP_API_URL_IMG;

export default function ModalCreateUser({ show, onHide, createuser, userToUpdate, setUserToUpdate, updateUser }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const [nombres, setNombres] = useState({ value: '', estado: 0, errorText: '' })//0 sin accion, 1 valido, 2 error
  const [username, setUsername] = useState({ value: '', estado: 0, errorText: '' });
  const [password, setPassword] = useState({ value: '', estado: 0, errorText: '' })
  const [passwordConfirm, setPasswordConfirm] = useState({value: '', estado: 0, errorText: ''});
  const [tipo, setTipo] = useState({ value: '', estado: 0, errorText: '' })
  const [image, setImage] = useState('')
  const [estado, setEstado] = useState({ value: '', estado: 0, errorText: '' });
  const [showPassword, setShowPassword] = useState(false);


  const user = useRef('')

  useEffect(() => {
    if (userToUpdate && Object.keys(userToUpdate).length !== 0) {
        setNombres({ value: userToUpdate.nombres, estado: 1, helperText: '' })
        setUsername({ value: userToUpdate.username, estado: 1, helperText: '' })
        setTipo({ value: userToUpdate.tipo, estado: 1, helperText: '' })
        setEstado({ value: userToUpdate.estado, estado: 1, helperText: '' })
        setImage(userToUpdate.url_image);
        user.current = userToUpdate;
    } else {
        user.current = {}
    }
  }, [userToUpdate])

  const updateStateInput = () => {
    validateInput(nombres.value, setNombres, typesValidation.NOMBRE);
    handleValidateRequired(nombres.value, setNombres);
    validateInput(username.value, setUsername, typesValidation.NOMBRE);
    handleValidateRequired(username.value, setUsername);
    validateInput(password.value, setPassword, typesValidation.PASSWORD);
    handleValidateRequired(password.value, setPassword);
    validateInput(passwordConfirm.value, setPasswordConfirm, typesValidation.PASSWORD, 'passwordConfirm');
    handleValidateRequired(passwordConfirm.value, setPasswordConfirm);
    validateInput(estado.value, setEstado, typesValidation.SELECT);
    validateInput(tipo.value, setTipo, typesValidation.SELECT);
  }

  const handleValidateRequired = (value, set, env) => {
    const { code, helperText } = validateInputRequired(value);
    if (code === 2) {
        set(lastState => ({ ...lastState, estado: 2, errorText: helperText }));
    }
  }

  const validateInput = (value, set, tipo, nameTipo) => {
    let types = {
        nombre: () => validateName(value),
        select: () => validateSelect(value),
        password: () => validatePassword(value),
    }
    let { code, helperText } = types[tipo]();
    if(nameTipo === 'passwordConfirm'){
        if(value !== password.value)  code = 2, helperText = 'Las contraseñas deben ser iguales';
    }

    set({ value, estado: code, errorText: helperText });
  }

  const handleChangeImage = (event) => {
    setImage(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    updateStateInput()
    if (nombres.estado !== 1 || username.estado !== 1 || estado.estado !== 1 || tipo.estado !== 1) return;
    if (!user.current.id && (password.estado !== 1  || passwordConfirm.estado !== 1)) return;
    onHide(false);
    const body = {
        nombres: nombres.value,
        username: username.value,
        password: password.value,
        estado: estado.value,
        tipo: tipo.value,
    }

    if (user.current.id) {
        updateUser(body, image);
    } else {
        createuser(body, image);
    }
    setUserToUpdate({});
    updateStates('', 0);
    setSelectedImage(null);
  };

  const handleCancel = () => {
    onHide(false)
    setUserToUpdate({})
    updateStates("", 0);
    setSelectedImage('')
  }

  const updateStates = (value, code) => {
    setNombres({ value, estado: code, helperText: '' })
    setUsername({ value, estado: code, helperText: '' })
    setEstado({ value, estado: code, helperText: '' })
    setPassword({ value, estado: code, helperText: '' })
    setTipo({ value, estado: code, helperText: '' })
    setPasswordConfirm({ value, estado: code, helperText: '' })
    setImage('');
    setShowPassword(false)
  }

  const handleHidePassword = () => {
    setShowPassword(lastValue => !lastValue)
  }
    return (
    <>
        <Modal
            show={show}
            size="lg-sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    <h5>{ user.current?.id ? 'Editar Usuario': 'Crear Usuario'}</h5>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='ms-3 me-3'>
            <div className="user">
                <label className="mt-2" htmlFor="userName">Nombre de Usuario *</label>
                <input
                    className={`input ${nombres.estado === 1 ? 'border-validation-green' : nombres.estado === 2 ? 'border-validation-red' : ''}`}
                    placeholder="Nombre de usuario"
                    id="userName"
                    type="text"
                    onChange={(e) => validateInput(e.target.value, setNombres, typesValidation.NOMBRE)}
                    value={nombres.value}
                    onBlur={(e) => handleValidateRequired(nombres.value, setNombres, e)}
                />
                {nombres.estado === 2 ? <p className="helper-text">{nombres.errorText}</p> : ''}

                <label className="mt-2" htmlFor="userUsername">Username *</label>
                <input
                    className={`input ${username.estado === 1 ? 'border-validation-green' : username.estado === 2 ? 'border-validation-red' : ''}`}
                    placeholder="Username"
                    id="userUsername"
                    type="text"
                    onChange={(e) => validateInput(e.target.value, setUsername, typesValidation.NOMBRE)}
                    value={username.value}
                    onBlur={(e) => handleValidateRequired(username.value, setUsername, e)}
                />
                {username.estado === 2 ? <p className="helper-text">{username.errorText}</p> : ''}

                {!user.current.id && (
                    <div style={{position: 'relative'}}>
                        <label className="mt-2" htmlFor="userPassword">Contraseña *</label>
                        <input
                            className={`input ${password.estado === 1 ? 'border-validation-green' : password.estado === 2 ? 'border-validation-red' : ''}`}
                            placeholder="Contraseña"
                            id="userPassword"
                            type={showPassword ? 'text': 'password'}
                            onChange={(e) => validateInput(e.target.value, setPassword, typesValidation.PASSWORD)}
                            value={password.value}
                            onBlur={(e) => handleValidateRequired(password.value, setPassword, e)}
                        />
                        <div className='eye-password' onClick={handleHidePassword}>
                            <EyesIconGlobal/>
                        </div>
                        {password.estado === 2 ? <p className="helper-text">{password.errorText}</p> : ''}
                    </div>

                )}

                {!user.current.id && (
                    <div style={{position: 'relative'}}>
                        <label className="mt-2" htmlFor="userPasswordConfirm">Confirmacion de Contraseña *</label>
                        <input
                            className={`input ${passwordConfirm.estado === 1 ? 'border-validation-green' : passwordConfirm.estado === 2 ? 'border-validation-red' : ''}`}
                            placeholder="Contraseña"
                            id="userPasswordConfirm"
                            type={showPassword ? 'text': 'password'}
                            onChange={(e) => validateInput(e.target.value, setPasswordConfirm, typesValidation.PASSWORD, 'passwordConfirm')}
                            value={passwordConfirm.value}
                            onBlur={(e) => handleValidateRequired(passwordConfirm.value, setPasswordConfirm, e)}
                        />
                        <div className='eye-password' onClick={handleHidePassword}>
                            <EyesIconGlobal/>
                        </div>
                        {passwordConfirm.estado === 2 ? <p className="helper-text">{passwordConfirm.errorText}</p> : ''}
                    </div>

                )}

                <label className="mt-2" htmlFor="userState">Estado *</label>
                <select
                    className={`select ${estado.estado === 1 ? 'border-validation-green' : estado.estado === 2 ? 'border-validation-red' : ''}`}
                    value={estado.value}
                    id='userState'
                    onChange={(e) => validateInput(e.target.value, setEstado, typesValidation.SELECT)}
                >
                    <option value=''>Seleccione un estado</option>
                    <option value='Activo'>Activo</option>
                    <option value='Inactivo'>Inactivo</option>

                </select>
                {estado.estado === 2 ? <p className="helper-text" htmlFor>{estado.errorText}</p> : ''}

                <label className="mt-2" htmlFor="userType">Tipo *</label>
                <select
                    className={`select mb-2 ${tipo.estado === 1 ? 'border-validation-green' : tipo.estado === 2 ? 'border-validation-red' : ''}`}
                    id="userType"
                    value={tipo.value}
                    onChange={(e) => validateInput(e.target.value, setTipo, typesValidation.SELECT)}
                >
                    <option value="">Seleccione un tipo</option>
                    <option value="administrador">Administrador</option>
                    <option value="cajero">Cajero</option>
                    <option value="cocina">Cocina</option>
                </select>
                {tipo.estado === 2 ? <p className="helper-text" htmlFor>{tipo.errorText}</p> : ''}

                <label className="custom-file-upload" htmlFor="userImage" >
                    Seleccione una imagen
                </label>
                <input
                    type="file"
                    name="url_image"
                    id="userImage"
                    accept='.jpg,.png,.jpng,.jpeg,.webp'
                    onChange={handleChangeImage}
                    hidden
                />
                {selectedImage ? (
                    <div className="modal-category-image">
                        <img src={selectedImage} alt="preview" />htmlFor
                    </div>
                ) : (
                    <>
                        {image?.length > 0 && (
                            <div className="modal-category-image">
                                <img src={`${APIURLIMG}${image}`} alt="foto de usuario" />
                            </div>
                        )}
                    </>
                )}
                </div>
        </Modal.Body>
        <Modal.Footer>
            <button className="btn-main-red" onClick={handleCancel}>
                Cancelar
            </button>
            <button className="btn-main" onClick={handleSubmit}>
                Confirmar
            </button>
        </Modal.Footer>
    </Modal>
    </>
    )
}
