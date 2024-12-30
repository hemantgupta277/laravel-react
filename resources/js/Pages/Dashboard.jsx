import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";

export default function Dashboard({
    auth,
    pendingTasks,
    myPendingTasks,
    myInProgressTasks,
    inProgressTasks,
    myCompletedTasks,
    completedTasks,
    activeTasks
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-2">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-amber-500 font-semibold text-xl">
                                Pending Tasks
                            </h3>
                            <p className="mt-2">
                                {myPendingTasks} / {pendingTasks}
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-blue-500 font-semibold text-xl">
                                In Progress Tasks
                            </h3>
                            <p className="mt-2">
                                {myInProgressTasks} / {inProgressTasks}
                            </p>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-green-500 font-semibold text-xl">
                                Completed Tasks
                            </h3>
                            <p className="mt-2">
                                {myCompletedTasks} / {completedTasks}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 gap-2 mt-4">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-gray-800 text-xl font-semibold">
                                My Active Tasks
                            </h3>
                            <table className="w-full text-sm text-left text-gray-500 rtl:text-right mt-4">
                                <thead className="text-xs bg-gray-100 text-gray-700 uppercase border-b-2">
                                    <tr>
                                        <th className="px-3 py-2">ID</th>
                                        <th className="px-3 py-2">Task</th>
                                        <th className="px-3 py-2">Project</th>
                                        <th className="px-3 py-2">Status</th>
                                        <th className="px-3 py-2">Deadline</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-500">
                                    {activeTasks.data.map(task => (
                                        <tr key={task.id} className="border-b">
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2">
                                                <Link href={route('task.show', task.id)}>
                                                    {task.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                <Link href={route('project.show', task.project_id)}>
                                                    {task.project.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                <span className={"rounded-md px-2 py-1 text-white " + TASK_STATUS_CLASS_MAP[task.status]}>
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
