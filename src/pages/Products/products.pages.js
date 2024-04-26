import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showAlerts } from '../../helpers/showAlerts';

const ProductPages = () => {

    const url = 'https://localhost:7217/api/Product';
    const [products, setProducts] = useState([]);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState('');
    const [createdate, setCreateDate] = useState('');
    const [modifyDate, setModifyDate] = useState('');
    const [isdeleted, setIsDeleted] = useState('');
    const [createdby, setCreatedBy] = useState('');
    const [modifiedby, setModifiedBy] = useState('');
    const [price, setPrice] = useState('');
    const [operation, setOperation] = useState(1);
    const [title, setTitle] = useState('');

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await axios.get(url, { headers: { accept: '*/*' } });
        setProducts(response.data);
    }

    const openModal = (op, id, name) => {
        setId('');
        setName('');
        setDescription('');
        setCreateDate('');
        setModifyDate('');
        setIsDeleted('');
        setCreatedBy('');
        setModifiedBy('');
        setPrice('');

        setOperation(op);

        if (op === 1) {
            setTitle('Registrar Producto');
        } else if (op === 2) {
            setTitle('Editar producto');
            setId(id);
            setName(name);
            setDescription(description);
        }
        window.setTimeout(function () {
            document.getElementById('name').focus();
        }, 500);
    }

    const validate = () => {
        var params;
        var method;
        if (name.trim() === '') {
            showAlerts('Introduzca el nombre del producto', 'warning');
        } else if (description.trim() === '') {
            showAlerts('Introduzca la descripción del producto', 'warning');
        } else {
            if (operation === 1) {
                params = { name: name.trim(), description: description.trim() };
                method = 'POST';
            } else {
                params = { id: id, name: name.trim(), description: description.trim() };
                method = 'PUT'
            }
            sendRequest(method, params)
        }
    }

    const sendRequest = async (method, params) => {
        await axios({ method: method, url: url, data: params }).then(function (response) {
            var type = response.data[0];
            var message = response.data[1];
            showAlerts(message, type);
            if (type === 'success') {
                document.getElementById('btnClose').click();
                getProducts();
            }

        })
            .catch(function (error) {
                showAlerts('Error in request', 'error');
                console.log(error);
            });
    }

    return (
        <div className='App'>
            <div className='container-fluid'>
                <div className='row mt-3'>
                    <div className='col-md-4 offset-4'>
                        <div className='d-grid mx-auto'>
                            <button onClick={() => openModal(1)} className='btn btn-dark' data-bs-toggle='modal' data-bs-target='#modalProducts'>
                                <i className='fa-solid fa-circle-plus'></i> Add
                            </button>
                        </div>
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-12 col-lg-8 offset-0 offset-lg-12'>
                        <div className='table-responsive'>
                            <table className='table table-bordered'>
                                <thead>
                                    <tr><th>Id</th><th>Producto</th><th>Descripcion</th></tr>
                                </thead>
                                <tbody className='table-group-diver'>
                                    {
                                        products.map((product, index) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>
                                                    <button onClick={() => openModal(2, product.id, product.name, product.description)}
                                                        className='btn btn-warning' data-bs-toggle='modal' data-bs-target='#modalProducts'>
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
            <div id='modalProducts' className='modal fade' aria-hidden='true'>
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <label className='h5'>{title}</label>
                            <button type='button' className='btn-close' id='btnClose' data-bs-dismiss='modal' aria-label='Close'></button>
                        </div>
                        <div className='modal-body'>
                            <input type='hidden' id='id'></input>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-gift'></i></span>
                                <input type='text' id='name' className='form-control' placeholder='Name' value={name}
                                    onChange={(e) => setName(e.target.value)}></input>
                            </div>
                            <div className='input-group mb-3'>
                                <span className='input-group-text'><i className='fa-solid fa-comment'></i></span>
                                <input type='text' id='description' className='form-control' placeholder='Description' value={description}
                                    onChange={(e) => setDescription(e.target.value)}></input>
                            </div>
                            <div className='d-grid col-6 mx-auto'>
                                <button onClick={() => validate()} className='btn btn-success'>
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

export default ProductPages;
