import { Title } from "../../components/Title";
import { UsersTable } from "../../components/usersTable/UsersTable";

export function AdminUsers() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Title title="Users" />
                </div>
                <div className="col-12">
                    <UsersTable />
                </div>
            </div>
        </div>
    )
}