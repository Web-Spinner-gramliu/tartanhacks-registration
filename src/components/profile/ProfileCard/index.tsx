import { Card, CardContent, Typography } from '@mui/material';
import { ReactElement } from 'react';
import styles from './index.module.scss';

interface ProfileCardProps {
  username: string;
  email: string;
}

const ProfileCard = ({ username, email }: ProfileCardProps): ReactElement => (
  <Card className={styles.card}>
    <CardContent>
      <Typography variant='h5' component='div'>
        {username}
      </Typography>
      <Typography variant='body2'>
        {email}
      </Typography>
    </CardContent>
  </Card>
);

export default ProfileCard;
