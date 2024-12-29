import {Head, Link, useForm} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import TextAreaInput from "@/Components/TextAreaInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Edit({auth, task}) {
    const {data, setData, post, errors, reset} = useForm({
        image: '',
        image_path: task.image_path || '',
        name: task.name || '',
        status: task.status || '',
        description: task.description || '',
        due_date: task.due_date || '',
        _method: 'PUT'
    })
    const onSubmit = (e) => {
        e.preventDefault();
        post(route("task.update", task.id));
    }
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Edit Task "{task.name}"
                    </h2>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="p-6 text-gray-900">
                        <form
                            onSubmit={onSubmit}
                            className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <div className="mb-4">
                                <img src={task.image_path} className="w-64"/>
                            </div>
                            <div>
                                <InputLabel htmlFor="task_image_path" value="Task Image"/>
                                <TextInput
                                    id="task_image_path"
                                    type="file"
                                    name="image"
                                    className="mt-1 block w-full border"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                />
                                <InputError message={errors.image} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_name" value="Task Name"/>
                                <TextInput
                                    id="task_name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_description" value="Task Description"/>
                                <TextAreaInput
                                    id="task_description"
                                    name="description"
                                    value={data.description}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData("description", e.target.value)}
                                />
                                <InputError message={errors.description} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_due_date" value="Deadline"/>
                                <TextInput
                                    id="task_due_date"
                                    type="date"
                                    name="due_date"
                                    value={data.due_date}
                                    className="mt-1 block w-full border"
                                    onChange={(e) => setData('due_date', e.target.value)}
                                />
                                <InputError message={errors.due_date} className="mt-2"/>
                            </div>
                            <div className="mt-4">
                                <InputLabel htmlFor="task_status" value="Task Status"/>
                                <SelectInput
                                    id="task_status"
                                    name="status"
                                    value={data.status}
                                    className="mt-1 block w-full border"
                                    onChange={(e) => setData('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} className="mt-2"/>
                            </div>
                            <div className="mt-4 text-right">
                                <Link
                                    href={route("task.index")}
                                    className="bg-gray-100 py-2 px-3 text-gray-800 rounded shadow hover:bg-gray-200 mr-2"
                                >
                                    Cancel
                                </Link>
                                <button
                                    className="bg-pink-700 py-1.5 px-3 text-white font-semibold rounded shadow hover:bg-pink-800"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
