import { patchActive } from "@/actions/compound";
import { Compound } from "@/interfaces/compound";
import Link from "next/link";

type Props = {
    compound: Compound,
    confirm: (compound: Compound) => void
};

export default function CompoundItem({ compound, confirm } : Props) {
    const toggleActive = async (id: number, active: boolean) => {
        await patchActive(id, !active);
    };

    return (
        <tr className="align-middle">
            <td>{compound.id}</td>
            <td>{compound.title}</td>
            <td>{compound.unit}</td>
            <td>{compound.min}</td>
            <td>{compound.max}</td>
            <td className="text-center">
                <Link href={`/admin/compound/edit/${compound.id}`} className="btn btn-light">
                    <i className="bi bi-pencil"></i><span className="d-none d-md-inline ms-2 me-1">Edit</span>
                </Link>
            </td>
            <td className="text-center">
                <button type="button" onClick={() => toggleActive(compound.id ? compound.id : 0, compound.active)} className={`btn btn-${compound.active ? 'dark' : 'secondary'}`}>
                    <i className="bi bi-archive"></i>
                    <span className="d-none d-md-inline ms-2 me-1">{compound.active ? 'Archive' : 'Unarchive'}</span>
                </button>
            </td>
            <td className="text-center">
                <button type="button" onClick={() => confirm(compound)} className="btn btn-warning fw-bold">
                    <i className="bi bi-trash"></i><span className="d-none d-md-inline ms-2 me-1">Remove</span>
                </button>
            </td>
        </tr>
    );
}