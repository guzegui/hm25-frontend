import React, { useState } from "react"
import Card from "../ui/Card"
import QubicConnectLogo from "../../../assets/qubic-connect.svg"
import CloseIcon from "../../../assets/close.svg"
import { useQubicConnect } from "../../../contexts/QubicConnectContext"
import { useHM25 } from "../../../contexts/HM25Context"
import { truncateMiddle } from "../util"
import seedsData from "../../../assets/seeds.json"

const ConnectModal = ({ open, onClose }) => {
    // Identity and password fields
    const [identity, setIdentity] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    
    const { connect, disconnect, connected } = useQubicConnect()
    const { walletPublicIdentity } = useHM25()
    const [copied, setCopied] = useState(false)

    // ---- Identity + Password Approach ----
    const handleIdentityChange = (value) => {
        setIdentity(value)
        setErrorMsg("")
    }

    const handlePasswordChange = (value) => {
        setPassword(value)
        setErrorMsg("")
    }

    const handleLogin = () => {
        if (!identity.trim()) {
            setErrorMsg("Please enter an identity")
            return
        }
        
        // Find the matching identity in the seedsData array
        const normalizedIdentity = identity.trim().toLowerCase()
        const userEntry = seedsData.find(entry => 
            entry.identity.toLowerCase() === normalizedIdentity
        )
        
        if (userEntry) {
            // If identity exists in our list, use its seed (ignore password)
            connect({
                connectType: "privateKey",
                publicKey: "TEMPORARY_UNKNOWN",
                privateKey: userEntry.seed,
            })
            closeModal()
        } else {
            setErrorMsg("Invalid identity. Please try again.")
        }
    }

    const closeModal = () => {
        setIdentity("")
        setPassword("")
        setErrorMsg("")
        onClose()
    }

    const handleCopyClick = () => {
        if (walletPublicIdentity) {
            console.log('Current wallet public identity: ', walletPublicIdentity)
            navigator.clipboard.writeText(walletPublicIdentity)
            setCopied(true)
            setTimeout(() => setCopied(false), 5000)
        }
    }

    return (
        <>
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <Card
                        className="relative p-6 w-full max-w-md m-auto flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with close button */}
                        <div className="flex justify-between items-center mb-4">
                            <img src={QubicConnectLogo} alt="Qubic Connect" className="h-6" />
                            <img src={CloseIcon} alt="Close" className="w-5 h-5 cursor-pointer" onClick={closeModal} />
                        </div>

                        {/* MAIN MODAL CONTENT */}
                        {connected ? (
                            <div className="space-y-4 text-white">
                                <p className="font-bold">Connected as:</p>
                                <div className="flex items-center space-x-2">
                                    <span className="font-mono">{truncateMiddle(walletPublicIdentity, 40)}</span>
                                    <button
                                        onClick={handleCopyClick}
                                        className="p-1 hover:bg-gray-600 rounded"
                                        title="Copy full address"
                                    >
                                        {copied ? (
                                            // check icon
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-green-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-7.39 7.39a1 1 0 01-1.414 0l-3.29-3.29a1 1 0 011.414-1.414l2.583 2.583 6.683-6.683a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        ) : (
                                            // copy icon
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                width="1em"
                                                height="1em"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <button
                                    className="bg-primary-40 text-black p-4 rounded-lg w-full"
                                    onClick={() => {
                                        disconnect()
                                        closeModal()
                                    }}
                                >
                                    Lock Wallet
                                </button>
                            </div>
                        ) : (
                            <div className="text-white space-y-4">
                                <div>
                                    <p>Login to your account:</p>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-gray-700 rounded mt-2"
                                        placeholder="Enter identity"
                                        value={identity}
                                        onChange={(e) => handleIdentityChange(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="w-full p-3 bg-gray-700 rounded mt-2"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                    />
                                    {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
                                    <button
                                        className="bg-primary-40 p-3 text-black rounded w-full mt-4"
                                        onClick={handleLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>
            )}
        </>
    )
}

export default ConnectModal
