import Typography from '@mui/material/Typography';
import Link from 'next/link';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://udennanebeolisa.com/" underline="none">
        EATS
      </Link>
      {' '}{new Date().getFullYear()}{'.'}
    </Typography>
  );
}