import type { User } from "../models/user-model";

interface ProfileInfosProps {
  user: User;
}

const ProfileInfos = ({ user }: ProfileInfosProps) => {
  return (
    <>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
    </>
  );
};

export default ProfileInfos;
