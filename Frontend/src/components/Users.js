import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])

    const [editing, setEditing] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(API+'/users');
        const res = await fetch(API+'/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const data = await res.json();
        console.log(data);

    }

    const getUsers = async () => {
        const res = await fetch(API+'/users');
        const data = await res.json();
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, [])

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure do you want to delete user ?')
        if(userResponse) {
            const res = await fetch(API+'/user/${id}',{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await res.json();
            console.log(data);
            await getUsers();
        }
    }

    const editUser = async(id) => {
        const res = await fetch(API+'/user/${id}');
        const data = await res.json();

        setEditing(true);
        
        setName(data.name);
        setEmail(data.email);
        setPassword(data.password);

        
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name}
                            className="form-control"
                            placeholder="Name"
                            autoFocus
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                            className="form-control"
                            placeholder="Email"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            className="form-control"
                            placeholder="Some pass"
                        />
                    </div>
                    <button className="btn btn-primary btn-block">
                        Create
                    </button>
                </form>
            </div>
            <div className="col-md-6">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            <td>
                                <button className="btn btn-secondary btn-sm btn-block" onClick={(e) =>editUser(user._id)}>
                                    EDIT
                                </button>
                                <button className="btn btn-danger btn-sm btn-block" onClick={(e) => deleteUser(user._id)}>
                                    DELETE
                                </button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}