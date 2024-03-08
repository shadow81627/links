export const useUser = () => {
  const user = useState<{
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null>("user", () => null);
  return user;
};
