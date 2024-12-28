import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({auth, users, queryParams = null, success}){
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) queryParams[name] = value;
        else delete queryParams[name];
        router.get(route('user.index'), queryParams);
    }
    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    }
    const sortChange = (name) => {
        if(name === queryParams.sort_field) {
            if(queryParams.sort_order === 'desc') queryParams.sort_order = 'asc';
            else queryParams.sort_order = 'desc';
        }
        else {
            queryParams.sort_field = name;
            queryParams.sort_order = 'asc';
        }
        router.get(route('user.index'), queryParams);
    }
    const deleteUser = (user) => {
        if(!window.confirm('Are you sure you want to delete this user?')){
            return;
        }
        router.delete(route('user.destroy', user.id))
    }
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
                </h2>
                <Link
                    href={route('user.create')}
                    className="text-white bg-pink-700 px-3 py-1.5 rounded-lg font-bold hover:bg-pink-800"
                >
                    Add New
                </Link>
            </div>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {success && (
                        <div className="bg-green-400 text-white rounded shadow-md py-2 px-4 mb-4">
                            {success}
                        </div>
                    )}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="overflow-auto">
                                <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                                    <thead className="text-xs bg-gray-50 text-gray-700 uppercase border-b-2">
                                    <tr className="text-nowrap">
                                        <TableHeading
                                            sort_field={queryParams.sort_field}
                                            sort_order={queryParams.sort_order}
                                            name={"id"}
                                            sortChange={sortChange}
                                        >
                                            ID
                                        </TableHeading>
                                        <TableHeading
                                            sort_field={queryParams.sort_field}
                                            sort_order={queryParams.sort_order}
                                            name={"name"}
                                            sortChange={sortChange}
                                        >
                                            Name
                                        </TableHeading>
                                        <TableHeading
                                            sort_field={queryParams.sort_field}
                                            sort_order={queryParams.sort_order}
                                            name={"email"}
                                            sortChange={sortChange}
                                        >
                                            Email
                                        </TableHeading>
                                        <TableHeading
                                            sort_field={queryParams.sort_field}
                                            sort_order={queryParams.sort_order}
                                            name={"created_at"}
                                            sortChange={sortChange}
                                        >
                                            Create Date
                                        </TableHeading>
                                        <th className="px-3 py-2 text-right">Actions</th>
                                    </tr>
                                    </thead>
                                    <thead className="text-xs bg-gray-50 text-gray-700 uppercase border-b-2">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                placeholder="User Name"
                                                defaultValue={queryParams.name}
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                placeholder="User Email"
                                                defaultValue={queryParams.email}
                                                onBlur={e => searchFieldChanged('email', e.target.value)}
                                                onKeyPress={e => onKeyPress('email', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2 text-right"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id} className="border-b">
                                            <td className="px-3 py-2">{user.id}</td>
                                            <td className="px-3 py-2">{user.name}</td>
                                            <td className="px-3 py-2">{user.email}</td>
                                            <td className="px-3 py-2 text-nowrap">{user.created_at}</td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <Link href={route('user.edit', user.id)}
                                                      className="text-blue-600 mx-1 hover:underline">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={(e) => deleteUser(user)}
                                                      className="text-red-600 mx-1 hover:underline">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination links={users.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
