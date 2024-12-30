import TableHeading from "@/Components/TableHeading.jsx";
import TextInput from "@/Components/TextInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import {TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP} from "@/constants.jsx";
import {Link, router} from "@inertiajs/react";
import Pagination from "@/Components/Pagination.jsx";

export default function TasksTable({tasks, queryParams = null, showProjectColumn = true, routeParam, projectParam = null}) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) queryParams[name] = value;
        else delete queryParams[name];
        router.get(route(routeParam, projectParam), queryParams);
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
        router.get(route(routeParam, projectParam), queryParams);
    }
    const deleteTask = (task) =>{
        if(!window.confirm('Are you sure you want to delete this project?')){
            return;
        }
        router.delete(route('task.destroy', task.id))
    }
    return (
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
                    <th className="px-3 py-2">Image</th>
                    {showProjectColumn && (
                        <th className="px-3 py-2">Project Name</th>
                    )}
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
                    {showProjectColumn && (
                        <th className="px-3 py-2"></th>
                    )}
                    <th className="px-3 py-2">
                        <TextInput
                            className="w-full"
                            placeholder="Task Name"
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
                {tasks.data.map((task) => (
                    <tr key={task.id} className="border-b">
                        <td className="px-3 py-2">{task.id}</td>
                        <td className="px-3 py-2">
                            <img src={task.image_path} style={{width: 60}}/>
                        </td>
                        {showProjectColumn && (
                            <td className="px-3 py-2">{task.project.name}</td>
                        )}
                        <td className="px-3 py-2">
                            <Link href={route('task.show', task.id)}>
                                {task.name}
                            </Link>
                        </td>
                        <td className="px-3 py-2">
                            <span
                                className={"px-2 py-1 text-white rounded " + TASK_STATUS_CLASS_MAP[task.status]}>
                                {TASK_STATUS_TEXT_MAP[task.status]}
                            </span>
                        </td>
                        <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                        <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                        <td className="px-3 py-2">{task.createdBy.name}</td>
                        <td className="px-3 py-2 text-nowrap">
                            <Link href={route('task.edit', task.id)}
                                  className="text-blue-600 mx-1 hover:underline">
                                Edit
                            </Link>
                            <button onClick={(e) => deleteTask(task)}
                                  className="text-red-600 mx-1 hover:underline">
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination links={tasks.meta.links}/>
        </div>
    )
}
