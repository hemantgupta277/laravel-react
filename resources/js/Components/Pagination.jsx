import {Link} from "@inertiajs/react";

export default function Pagination({links}){
    return (
        <nav className="mt-4 text-center text-black">
            {links.map((link) => (
                <Link
                    preserveScroll
                    href={link.url || ""}
                    key={link.label}
                    className={"inline-block py-2 px-3 rounded-lg text-xs "
                        + (link.active ? "bg-gray-200 border border-gray-500 text-gray-700" : "text-gray-500 ")
                        + (!link.url ? "!text-gray-300 cursor-not-allowed" : "hover:bg-gray-200 cursor-pointer")
                }
                    dangerouslySetInnerHTML={{__html: link.label}}
                >
                </Link>
    )
)}
</nav>
)
}
