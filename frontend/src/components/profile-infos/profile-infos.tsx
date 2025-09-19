import type { User } from "../../entities/user.entity";

interface ProfileInfosProps {
  user: User;
}

const ProfileInfos = ({ user }: ProfileInfosProps) => {
  return (
    <>
      <div>{user.firstName}</div>
      <div>{user.lastName}</div>
      <div>{user.id}</div>
    </>
  );
};

export default ProfileInfos;
