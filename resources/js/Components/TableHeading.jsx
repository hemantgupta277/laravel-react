import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/16/solid/index.js";

export default function TableHeading({
        sort_field = null,
        sort_order = null,
        name,
        sortable = true,
        sortChange = () => {},
        children
    })
{
    return (
        <th onClick={(e) => sortChange(name)}
            className="px-3 py-2">
            <div className='gap-1 flex justify-between items-center cursor-pointer'>
                {children}
                {sortable && (
                    <div>
                        <ChevronUpIcon className={"w-4 "
                            + (sort_field === name && sort_order === "asc" ? "text-pink-700" : "")
                        }/>
                        <ChevronDownIcon className={"w-4 -mt-2 "
                            + (sort_field === name && sort_order === "desc" ? "text-pink-700" : "")
                        }/>
                    </div>
                )}
            </div>
        </th>
    )
}
