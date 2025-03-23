import { QubicPackageBuilder } from "qubic-ts-library/dist/QubicPackageBuilder.js"  
// Fix the imports using default exports for CommonJS modules
import IQubicBuildPackagePkg from "qubic-ts-library/dist/qubic-types/IQubicBuildPackage.js";
import PublicKeyPkg from "@qubic-lib/qubic-ts-library/dist/qubic-types/PublicKey.js";
import LongPkg from "@qubic-lib/qubic-ts-library/dist/qubic-types/Long.js";
import DynamicPayloadPkg from "@qubic-lib/qubic-ts-library/dist/qubic-types/DynamicPayload.js";

// Extract the types from the default exports
const { IQubicBuildPackage } = IQubicBuildPackagePkg;
const { PublicKey } = PublicKeyPkg;
const { Long } = LongPkg;
const { DynamicPayload } = DynamicPayloadPkg;


export class CreateProjectPayload implements IQubicBuildPackage {
    private _internalPackageSize = 8; // 0 bytes
    private createProjectInput: CreateProjectInput;    

    constructor(actionInput: CreateProjectInput) {
        this.createProjectInput = actionInput;
    }

    getPackageSize(): number {
        return this._internalPackageSize;
    }

    getPackageData(): Uint8Array {
        const builder = new QubicPackageBuilder(this.getPackageSize());
        builder.add(this.createProjectInput.title);
        return builder.getData();
    }

    getTransactionPayload(): DynamicPayload {
        const payload = new DynamicPayload(this.getPackageSize());
        payload.setPayload(this.getPackageData());
        return payload;
    }

}

export interface CreateProjectInput {
    title: Long;
};