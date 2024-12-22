import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TableHeading from "@/Components/TableHeading.jsx";

export default function Index({auth, projects, queryParams = null}){
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) queryParams[name] = value;
        else delete queryParams[name];
        router.get(route('project.index'), queryParams);
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
        router.get(route('project.index'), queryParams);
    }
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
                <Link
                    href={route('project.create')}
                    className="text-white bg-pink-700 px-3 py-2 rounded-lg font-bold"
                >
                    Add New
                </Link>
            </div>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                    <th className="px-3 py-2">Image</th>
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
                                        name={"status"}
                                        sortChange={sortChange}
                                    >
                                        Status
                                    </TableHeading>
                                    <TableHeading
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                        name={"created_at"}
                                        sortChange={sortChange}
                                    >
                                        Create Date
                                    </TableHeading>
                                    <TableHeading
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                        name={"due_date"}
                                        sortChange={sortChange}
                                    >
                                        Due Date
                                    </TableHeading>
                                    <th className="px-3 py-2">Created By</th>
                                    <th className="px-3 py-2 text-right">Actions</th>
                                </tr>
                                </thead>
                                <thead className="text-xs bg-gray-50 text-gray-700 uppercase border-b-2">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <TextInput
                                            className="w-full"
                                            placeholder="Project Name"
                                            defaultValue={queryParams.name}
                                            onBlur={e => searchFieldChanged('name', e.target.value)}
                                            onKeyPress={e => onKeyPress('name', e)}
                                        />
                                    </th>
                                    <th className="px-3 py-2">
                                        <SelectInput
                                            className="w-full"
                                            defaultValue={queryParams.status}
                                            onChange={e => searchFieldChanged('status', e.target.value)}
                                        >
                                            <option value="">Choose Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </SelectInput>
                                    </th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2 text-right"></th>
                                </tr>
                                </thead>
                                <tbody>
                                {projects.data.map((project) => (
                                    <tr key={project.id} className="border-b">
                                        <td className="px-3 py-2">{project.id}</td>
                                        <td className="px-3 py-2">
                                            <img src={project.image_path} style={{width: 60}}/>
                                        </td>
                                        <td className="px-3 py-2">
                                            <Link href={route('project.show', project.id)}>
                                                {project.name}
                                            </Link>
                                        </td>
                                        <th className="px-3 py-2 text-black hover:underline">
                                            <span
                                                className={"px-2 py-1 text-white rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </th>
                                        <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                                        <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                                        <td className="px-3 py-2">{project.createdBy.name}</td>
                                        <td className="px-3 py-2">
                                            <Link href={route('project.edit', project.id)}
                                                  className="text-blue-600 mx-1 hover:underline">
                                                Edit
                                            </Link>
                                            <Link href={route('project.destroy', project.id)}
                                                  className="text-red-600 mx-1 hover:underline">
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <Pagination links={projects.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
