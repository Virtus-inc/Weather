interface UserData {
  _id: string;
  name: string;
  surname: string;
  email: string;
}

export const useUserData = () => {
  const data = useState<UserData | null>('userData', () => null);

  const setUserData = (newData: UserData) => {
    data.value = newData;
  };

  return {
    data,
    setUserData,
  };
};