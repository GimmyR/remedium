"use client";

import { createTest, generateCompounds } from "@/actions/compounds-test";
import TestInput from "@/components/test-medication/test-input";
import Testing from "@/components/test-medication/testing";
import { Compound } from "@/interfaces/compound";
import { CreateTest } from "@/interfaces/compound-test";
import { SubmitEvent, useState } from "react";

type Props = {
    compounds: Compound[];
};

export default function TestMedication({ compounds } : Props) {
    const [error, setError] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [result, setResult] = useState<CreateTest>();

    const findCompound = (compoundId: number) : Compound => {
        const compound = compounds.find(cmp => cmp.id == compoundId);
        return compound ?? { title: "Unknown compound", active: true };
    };

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setStatus(1);
        setResult(undefined);
        const form = new FormData(e.currentTarget);
        const compoundTests = await generateCompounds(compounds);

        setTimeout(async () => {
            setStatus(2);
            try {

                const data = await createTest({
                    applicant: form.get("applicant") as string,
                    reason: form.get("reason") as string,
                    compounds: compoundTests
                });

                setResult(data);
            
            } catch(error: any) {

                setError(error.message);

            } finally {

                setStatus(0);

            }
        }, 2000);
    };

    return (
        <form className="col-12 col-md-8 col-lg-5 col-xl-4 col-xxl-3 px-5 px-md-0 pt-3" onSubmit={handleSubmit}>
            <div className="alert alert-warning mb-4 rounded-0">This app simulates a device that analyzes and tests a medication with arbitrary dosage standards</div>
            {error != "" && <div className="alert alert-danger py-1 rounded-0 mb-4">{error}</div>}
            <div className="mb-3">
                <label htmlFor="applicant" className="form-label">Applicant</label>
                <input type="text" id="applicant" name="applicant" className="form-control rounded-0" placeholder="Dr. John Doe"/>
            </div>
            <div className="mb-4">
                <label htmlFor="reason" className="form-label">Reason</label>
                <textarea id="reason" name="reason" className="form-control rounded-0" placeholder="Treating diabetes"></textarea>
            </div>
            <button type="submit" className="btn btn-dark col-12 rounded-0" disabled={status > 0}>Start test</button>
            <Testing status={status}/>
            {result && <div className="mt-5 pb-5">
                {result.compounds.map(
                    (cmpTest, index) => <TestInput key={index} compound={findCompound(cmpTest.compoundId)} amount={cmpTest.amount} error={{ status: cmpTest.error, message: cmpTest.message }}/>
                )}    
            </div>}
        </form>
    );
}