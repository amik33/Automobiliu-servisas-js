import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'react-router-dom';

export function UserTotalTable() {
    const { total } = useContext(GlobalContext);

    return (
        <div className="table-responsive">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Act</th>
                        <th scope="col">Service</th>
                        <th className="text-end" scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                       total.map((tot, i) => (
                            <tr key={tot}>
                                <td>{i + 1}</td>
                                <td>{tot}</td>
                                <td className="d-flex gap-2 justify-content-end">
                                    <Link className="btn btn-success pe-3 rounded-pill" to="/">Select</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-end p-2">
                <Link className="btn btn-warning rounded-pill py-2" to="/">Cancel</Link>
            </div>
        </div>
    )
}