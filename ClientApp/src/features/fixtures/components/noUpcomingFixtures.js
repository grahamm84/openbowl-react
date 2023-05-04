import {
  Button,
  Typography,
  Box, styled, Avatar} from '@mui/material';

import InsertInvitationTwoToneIcon from '@mui/icons-material/InsertInvitationTwoTone';
import MarkEmailReadTwoToneIcon from '@mui/icons-material/MarkEmailReadTwoTone';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
export default function NoUpcomingFixtures() {

    const AvatarEvents = styled(Avatar)(
        ({ theme }) => `
            background-color: ${theme.colors.info.lighter};
            color: ${theme.colors.info.main};
            width: ${theme.spacing(10)};
            height: ${theme.spacing(10)};
            margin: 0 auto ${theme.spacing(2)};
      
            .MuiSvgIcon-root {
              font-size: ${theme.typography.pxToRem(42)};
            }
      `
      );
    return(
<Box
sx={{
  py: { xs: 2, md: 6, lg: 8 },
  textAlign: 'center'
}}
>
<AvatarEvents>
  <InsertInvitationTwoToneIcon />
</AvatarEvents>
<Typography variant="h2">{'Upcoming fixtures'}</Typography>
<Typography
  variant="h4"
  sx={{
    pt: 1,
    pb: 3
  }}
  fontWeight="normal"
  color="text.secondary"
>
  {'You have no upcoming fixtures at this time'}!
</Typography>
<Button
  color="info"
  variant="outlined"
  startIcon={<EmojiEventsIcon />}
  sx={{
    borderWidth: '2px',
    '&:hover': {
      borderWidth: '2px'
    }
  }}
>
  {'Find a league'}
</Button>
</Box>
    )
}