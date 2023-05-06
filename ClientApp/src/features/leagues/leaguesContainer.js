import {
  Card,
  Grid,
  CardHeader,
  Divider,
  List,
  useTheme,
  Pagination,
  CardActions} from '@mui/material';
import NoUpcomingFixtures from 'features/fixtures/components/noUpcomingFixtures';
import ContentContainer from 'global/layouts/LoggedInLayout/ContentContainer';
import LeagueListCard from './components/leagueListCard';

export default function LeaguesContainer() {
    const theme = useTheme();

  return (
    <ContentContainer title='Leagues' subtitle='Manage your bowling leagues'>
      <Grid item xs={12}>
      <Card>
      <CardHeader title={'Your Leagues'} />
      <Divider />
      

          <List disablePadding>
            <LeagueListCard name=''/>
            <Divider component="li" />
            
            <Divider component="li" />
          </List>
          <CardActions
            disableSpacing
            sx={{
              p: 3,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <Pagination size="large" count={7} color="primary" />
          </CardActions>

      
    </Card>

    <NoUpcomingFixtures/>

    
      </Grid>
    </ContentContainer>
    
  );
}