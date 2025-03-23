import { QubicTransaction } from "@qubic-lib/qubic-ts-library/dist/qubic-types/QubicTransaction.js";
import { CreateProjectPayload } from "./utils/CreateProyectpayload.ts";
import { PublicKey } from "@qubic-lib/qubic-ts-library/dist/qubic-types/PublicKey.js";
import { Long } from "@qubic-lib/qubic-ts-library/dist/qubic-types/Long.js";
import { QubicDefinitions } from "@qubic-lib/qubic-ts-library/dist/QubicDefinitions.js";
import { getRPCStatus } from "./utils/getRpcStatus.ts";
import { broadcastTransaction } from "./utils/BroadcastTransaction.ts";

const BaseURL = process.env.REACT_APP_BASE_URL;


export async function createProject() {
    const sourceID = process.env.sourceID
    const sourceSeed = process.env.sourceSeed

    const title: Long = new Long(3);

    const ProjectPayload = new CreateProjectPayload({title: title});
    const rpcStatus = await getRPCStatus();
    const currentTick = rpcStatus.tickInfo.tick;
    const targetTick = currentTick + 15;
    console.log("Current tick: " + currentTick);
    console.log("Target tick: " + targetTick);

    const tx = new QubicTransaction().setSourcePublicKey(sourceID)
        .setDestinationPublicKey("MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWLWD")
        .setAmount(10)
        .setTick(targetTick)
        .setInputType(3)
        .setInputSize(ProjectPayload.getPackageSize())
        .setPayload(ProjectPayload.getTransactionPayload())

    await tx.build(sourceSeed);

    console.log(tx);

    const response = await broadcastTransaction(tx);
    const responseData = await response.json();

    console.log("Transaction broadcasted successfully");
    console.log("Transaction ID: " + responseData.transactionId)
    console.log("Scheduled for tick: " + targetTick)
}

await createProject();
