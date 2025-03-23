import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const SupportMilestoneModal = ({ isOpen, onClose, tier, projectId, onDonationComplete }) => {
  const [amount, setAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Extract numeric value from funding goal (e.g., "75,000 QUs" -> 75000)
  const extractNumericValue = (fundingGoal) => {
    const match = fundingGoal.match(/(\d+(?:,\d+)*)/);
    return match ? parseInt(match[0].replace(/,/g, '')) : 0;
  };

  const maxAmount = extractNumericValue(tier.fundingGoal);
  const remainingNeeded = Math.round(maxAmount * (100 - tier.percentage) / 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate amount
    const donationAmount = parseInt(amount);
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }

    if (donationAmount > remainingNeeded) {
      setError(`The maximum amount needed for this milestone is ${remainingNeeded} QUs.`);
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real app, this would send a transaction to a blockchain
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Call the parent's donation handler
      onDonationComplete(tier, donationAmount);
      
      toast.success(`Successfully supported milestone with ${donationAmount} QUs!`);
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Error processing donation:', error);
      setError('Failed to process donation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Quick amount options
  const quickAmounts = [10, 50, 100, 500];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white">Support This Milestone</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-300 mb-4">{tier.description}</p>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-gray-400">{tier.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-4">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${tier.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Funding Goal:</span>
                  <span className="text-white font-medium">{tier.fundingGoal}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-300">Remaining Needed:</span>
                  <span className="text-white font-medium">{remainingNeeded} QUs</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Amount to Contribute (QUs)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter amount"
                    min="1"
                    max={remainingNeeded}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {quickAmounts.map((quickAmount) => (
                    <button
                      key={quickAmount}
                      type="button"
                      onClick={() => setAmount(quickAmount.toString())}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-md text-white text-sm"
                    >
                      {quickAmount} QUs
                    </button>
                  ))}
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-md text-red-300 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                      isSubmitting
                        ? 'bg-green-800 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Support Milestone'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SupportMilestoneModal;
