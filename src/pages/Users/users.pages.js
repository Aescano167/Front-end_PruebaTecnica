import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showAlerts } from '../../helpers/showAlerts';

const UsersPage = () => {

    const url = 'https://localhost:7217/api/User';

    const [users, setUsers] = useState([]);
    const [Id, setUserId] = useState('');
    const [name, setName] = useState('');
    const [lastname,setLastName] = useState('');
    const [cedula, setCedula] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirpassword, setConfirPassword] = useState('');
    const [role, setRole] = useState(0);

    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get(url);
            setUsers(response.data);

        } catch (error) {
            console.error(error);
            showAlerts('Error al obtener usuarios', 'error');
        }
    };

    const openModalUser = (op, Id, name,lastname,cedula,phone,email, role) => {
        setUserId('');
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
        setOperation('');
        setLastName('');
        setCedula('');
        setPhone('');
        setConfirPassword('');

        debugger
        if (op === 1) {
            setTitle('Registrar Usuario');
        } else if (op === 2) {
            setTitle('Editar Usuario');
            setName(name);
            setLastName(lastname);
            setCedula(cedula);
            setPhone(phone);
            setEmail(email);
            setRole(parseInt(role));
        }

        window.setTimeout(function () {
            document.getElementById('name').focus();}, 500);
    };

    const validateUser = async (url) => {
        debugger

        if (name.trim() === '' || email.trim() === '' || cedula.trim() === '' || role.trim() === '') {
            showAlerts('Por favor rellena los campos Nombre,Email,Cedula y Rol', 'warning');
        } else {
            try {
                
                const response = await axios.post(url, {
                    name: name.trim(),
                    lastName: lastname.trim(),
                    cedula: cedula.trim(),
                    phone: phone.trim(),
                    email: email.trim(),
                    password: password.trim(),
                    confirpassword: confirpassword.trim(),
                    role: parseInt(role)
                });
                const data = response.data;
                if (data.success) {
                    showAlerts('Usuario creada con éxito', 'success');
                    document.getElementById('btnClose').click();
                    setTimeout(() => getUsers(), 1000);
                } else {
                    showAlerts(data.message, 'error');
                }
            } catch (error) {
                showAlerts('Error al enviar la solicitud', 'error');
                console.error(error);
            }
        }
    };

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModalUser(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalUsers'>
                                <i className='fa-solid fa-circle-plus'></i> Agregar
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>Id</th><th>Nombre</th><th>Apellido</th><th>Cedula</th><th>Celular</th><th>Email</th><th>Rol</th></tr>
                                </thead>
                                <tbody className='table-group-diver'>
                                    {
                                        users.map((user, index) => (
                                            <tr key={user.Id}>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.lastName}</td>
                                                <td>{user.cedula}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.email}</td>
                                                <td>{user.role}</td>
                                                <td>
                                                    <button onClick={() => openModalUser(2,user.id,user.name, user.lastName,user.phone, user.cedula,user.email, user.role)}
                                                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalUsers'>
                                                        <i className='fa-solid fa-edit'></i>
                                                    </button>
                                                    &nbsp;
                                                    <button className='btn btn-danger'>
                                                        <i className='fa-solid fa-trash'></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div id='modalUsers' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' id='btnClose' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-user'></i></span>
                                <input type='text' id='name' className='form-control' placeholder='Nombre' value={name}
                                    onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='lastname' className='form-control' placeholder='Apellido' value={lastname}
                                    onChange={(e) => setLastName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='cedula' className='form-control' placeholder='Cedula' value={cedula}
                                    onChange={(e) => setCedula(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='phone' className='form-control' placeholder='Celular' value={phone}
                                    onChange={(e) => setPhone(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='email' className='form-control' placeholder='Email' value={email}
                                    onChange={(e) => setEmail(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='password' className='form-control' placeholder='Contraseña' value={password}
                                    onChange={(e) => setPassword(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='confirpassword' className='form-control' placeholder='Contraseña' value={confirpassword}
                                    onChange={(e) => setConfirPassword(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <select id='role' className='form-control' placeholder='Rol' value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Vendedor</option>
                                    <option value={3}>Usuario</option>
                                </select>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validateUser(url)} className='btn btn-success'>
                                    <i className='fa-solid fa-floppy-disk'></i> Guardar
                                </button>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type='button' id='btnCerrar' className='btn btn-secondary' data-bs-dismiss='modal'>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UsersPage;
