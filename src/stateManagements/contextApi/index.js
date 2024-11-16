import React, {createContext, useState, useContext, useCallback} from 'react';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
  const [getLoginInfo, setGetLoginInfo] = useState(null);
  const [getVersionInfo, setGetVersionInfo] = useState(null);
  const [getAccessableInfo, setGetAccessableInfo] = useState(null);
  const [getEmployee, setGetEmployee] = useState({
    history: [],
    selectedHistory: [],
  });
  const [isLeaveApply, setGetIsLeaveApply] = useState(false);

  const setLoginInfo = useCallback(value => {
    setGetLoginInfo(value);
  }, []);

  const setAccessableInfo = useCallback(value => {
    setGetAccessableInfo(value);
  }, []);

  const setEmployee = useCallback(
    updates => {
      setGetEmployee(prevState => ({
        ...prevState,
        ...updates,
      }));
    },
    [getEmployee],
  );

  const setVersionInfo = useCallback(
    value => {
      setGetVersionInfo(value);
    },
    [getVersionInfo],
  );

  const setIsLeaveApply = useCallback(
    value => {
      setGetIsLeaveApply(value);
    },
    [isLeaveApply],
  );

  return (
    <AppContext.Provider
      value={{
        getLoginInfo,
        setLoginInfo,
        getAccessableInfo,
        setAccessableInfo,
        getVersionInfo,
        setVersionInfo,
        getEmployee,
        setEmployee,
        isLeaveApply,
        setIsLeaveApply,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
