import { NextPage } from 'next';
import { ReactElement } from 'react';
import ProfileCard from 'src/components/profile/ProfileCard';
import { AuthenticatedLayout } from 'src/layouts';

const ProfilePage: NextPage = (): ReactElement => {
  // This should be replaced with real user data
  const userData = { username: 'JohnDoe', email: 'john.doe@example.com' };

  return (
    <ProfileCard username={userData.username} email={userData.email} />
  );
};

export default AuthenticatedLayout(ProfilePage);
