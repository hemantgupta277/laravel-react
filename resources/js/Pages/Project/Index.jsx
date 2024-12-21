import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import {PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP} from "@/constants.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Index({auth, projects}){
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Projects
                </h2>
            }
        >
            <Head title="Projects" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/*<pre>{JSON.stringify(projects, undefined, 2)}</pre>*/}
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right">
                                <thead className="text-xs bg-gray-50 text-gray-700 uppercase border-b-2">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2">ID</th>
                                    <th className="px-3 py-2">Image</th>
                                    <th className="px-3 py-2">Name</th>
                                    <th className="px-3 py-2">Status</th>
                                    <th className="px-3 py-2">Create Date</th>
                                    <th className="px-3 py-2">Due Date</th>
                                    <th className="px-3 py-2">Created By</th>
                                    <th className="px-3 py-2 text-right">Actions</th>
                                </tr>
                                </thead>
                                <thead className="text-xs bg-gray-50 text-gray-700 uppercase border-b-2">
                                <tr className="text-nowrap">
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2"></th>
                                    <th className="px-3 py-2">
                                        <TextInput />
                                    </th>
                                    <th className="px-3 py-2">
                                        <SelectInput/>
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
                                        <td className="px-3 py-2">{project.name}</td>
                                        <td className="px-3 py-2">
                                            <span
                                                className={"px-2 py-1 text-white rounded " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                {PROJECT_STATUS_TEXT_MAP[project.status]}
                                            </span>
                                        </td>
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
                            {/*<pre>{JSON.stringify(projects.meta.links, undefined, 2)}</pre>*/}
                            <Pagination links={projects.meta.links}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
