import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQubicConnect } from '../contexts/QubicConnectContext';
import { useHM25 } from '../contexts/HM25Context';
import { motion } from 'framer-motion';

function StartPage() {
    const navigate = useNavigate();
    const { connected, toggleConnectModal } = useQubicConnect();
    const { state, balance } = useHM25();

    if (!connected) {
        return (
            <motion.div
                className="mt-20 flex flex-col items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl text-white mb-20 mt-20">Fund a project, get rewards</h2>
                <p className="text-gray-300 mb-4 mt-4 ml-6 mr-4 text-center">
                    Please login to access the application.
                </p>
                <motion.button
                    className="bg-primary-40 p-3 text-black rounded"
                    onClick={toggleConnectModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Login
                </motion.button>
            </motion.div>
        );
    }

    const isDisabled = balance === null || balance <= 0;

    return (
        <motion.div
            className="mt-20 px-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl text-white mb-6 mt-6">HM25 Actions</h2>
            <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                    className="bg-primary-40 p-3 text-black rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => navigate('/echo')}
                    disabled={isDisabled}
                    title={isDisabled ? 'Insufficient balance to echo coins.' : ''}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Echo Coin
                </motion.button>
                <motion.button
                    className="bg-primary-40 p-3 text-black rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                    onClick={() => navigate('/burn')}
                    disabled={isDisabled}
                    title={isDisabled ? 'Insufficient balance to burn coins.' : ''}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Burn Coin
                </motion.button>
            </div>
            <motion.div
                className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700 text-white w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <p>
                    <strong>Number of Echos:</strong> {state.stats.numberOfEchoCalls.toString()}
                </p>
                <p>
                    <strong>Number of Burns:</strong> {state.stats.numberOfBurnCalls.toString()}
                </p>
            </motion.div>
        </motion.div>
    );
}

export default StartPage;