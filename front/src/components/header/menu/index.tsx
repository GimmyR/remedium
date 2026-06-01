"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
    const pathname = usePathname();

    const activeOrNot = (route: string) => pathname == route ? 'text-primary' : 'text-secondary';

    return (
        <div className="d-flex flex-row ms-3 ms-sm-4 ms-xl-5">
            <Link href="/admin" className={`text-decoration-none ${activeOrNot("/admin")} me-3 me-sm-4`}>Compounds</Link>
            <Link href="/admin/tests" className={`text-decoration-none ${activeOrNot("/admin/tests")}`}>Tests</Link>
        </div>
    );
}