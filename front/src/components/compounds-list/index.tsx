import { Compound } from "@/interfaces/compound";
import Link from "next/link";

type Props = {
    compounds: Compound[]
};

export default function CompoundsList({ compounds } : Props) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Unit</th>
                    <th>Min</th>
                    <th>Max</th>
                    <th className="col-2"></th>
                    <th className="col-2"></th>
                    <th className="col-2"></th>
                </tr>
            </thead>
            <tbody>
                {compounds.map(compound => <tr key={compound.id} className="align-middle">
                    <td>{compound.id}</td>
                    <td>{compound.title}</td>
                    <td>{compound.unit}</td>
                    <td>{compound.min}</td>
                    <td>{compound.max}</td>
                    <td className="text-center">
                        <Link href={`/admin/compound/edit/${compound.id}`} className="btn btn-secondary">
                            <i className="bi bi-pencil"></i><span className="d-none d-md-inline ms-2 me-1">Edit</span>
                        </Link>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-dark">
                            <i className="bi bi-archive"></i><span className="d-none d-md-inline ms-2 me-1">Archive</span>
                        </button>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning fw-bold">
                            <i className="bi bi-trash"></i><span className="d-none d-md-inline ms-2 me-1">Remove</span>
                        </button>
                    </td>
                </tr>)}
            </tbody>
        </table>
    );
}