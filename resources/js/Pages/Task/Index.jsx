import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Index({auth, tasks, queryParams = null}){
    queryParams = queryParams || {};
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Tasks
                    </h2>
                    <Link
                        href={route('task.create')}
                        className="text-white bg-pink-700 px-3 py-1.5 rounded-lg font-bold hover:bg-pink-800"
                    >
                        Add New
                    </Link>
                </div>
            }
        >
            <Head title="Tasks"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TasksTable tasks={tasks} queryParams={queryParams} routeParam={"task.index"}/>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
