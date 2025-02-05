import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import TasksTable from "@/Pages/Task/TasksTable.jsx";

export default function Show({auth, user, tasks = null, queryParams}){
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {`User "${user.name}"`}
                </h2>
            }
        >
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div>
                            <img src={user.image_path} alt="" className="w-full h-64 object-cover"/>
                        </div>
                        <div className="p-6 text-gray-900">
                            <div className="grid gap-1 grid-cols-2 mt-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">User ID</label>
                                        <p>{user.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">User Name</label>
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Created By</label>
                                        <p>{user.createdBy.name}</p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">Due Date</label>
                                        <p>{user.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Create Date</label>
                                        <p>{user.created_at}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">Updated By</label>
                                        <p>{user.updatedBy.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="font-bold text-lg">Description</label>
                                <p>{user.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pb-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <TasksTable
                                tasks={tasks}
                                queryParams={queryParams}
                                showUserColumn={false}
                                routeParam={"user.show"}
                                userParam={user.id}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}
