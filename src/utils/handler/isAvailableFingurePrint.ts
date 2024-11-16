import getDataFromFingurePrint from './getDataFromFingurePrint';

export const isAvailableFingurePrint = async () => {
  try {
    const available = await getDataFromFingurePrint.isFingerprintAvailable();
    return available;
  } catch (error) {
    return false;
  }
};
