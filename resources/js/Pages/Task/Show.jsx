import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {TASK_PRIORITY_CLASS_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import {Link} from "@inertiajs/react";

export default function Show({auth, task}){
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`Task "${task.name}"`}
                </h2>
                <Link
                    href={route('task.edit', task.id)}
                    className="text-white bg-pink-700 px-3 py-1.5 rounded-lg font-bold hover:bg-pink-800"
                >
                    Edit
                </Link>
            </div>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <img src={task.image_path} alt="" className="w-full h-64 object-cover"/>
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Task ID</label>
                                        <p>{task.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Name</label>
                                        <p>{task.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Status</label>
                                        <div className="mt-1">
                                            <span
                                                className={"font-bold text-white rounded-lg px-3 py-2 " + TASK_STATUS_CLASS_MAP[task.status]}>{TASK_STATUS_TEXT_MAP[task.status]}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Task Priority</label>
                                        <div className="mt-1">
                                            <span
                                                className={"font-bold text-white rounded-lg px-3 py-2 capitalize " + TASK_PRIORITY_CLASS_MAP[task.priority]}>{task.priority}</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Project</label>
                                        <div className="mt-1">
                                            <Link href={route('project.show', task.project.id)}>
                                                {task.project.name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Created By</label>
                                        <p>{task.createdBy.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Assigned User</label>
                                        <div className="mt-1">
                                            <p>{task.assignedUser.name}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p>{task.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Create Date</label>
                                        <p>{task.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p>{task.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
