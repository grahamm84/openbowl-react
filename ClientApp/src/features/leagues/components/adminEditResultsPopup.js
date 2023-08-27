import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as api from "global/apiClient";
import * as storage from "global/helpers/storageService";
import {
  FormControl,
  Grid,
  Skeleton,
  Tooltip,
  Autocomplete,
  Box,
  MenuItem,
  Select,
  Table,
  TableRow,
  DataGrid,
  Typography,
  IconButton,
  Stack,
  Divider,
  TableHead,
  Tab,
  TableCell,
  TableBody,
  TableFooter,
  ListItem,
  ListItemText,
  Badge,
  Chip,
  Input,
} from "@mui/material";
import { EditTwoTone, SwitchAccountTwoTone } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import Label from "global/components/Label";
import { COLUMNS_DIMENSION_PROPERTIES } from "@mui/x-data-grid/hooks/features/columns/gridColumnsUtils";

export default function AdminEditResultsPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usedTeams, setUsedTeams] = useState([]); // [team1, team2
  const [fixtures, setFixtures] = useState([]);
  const [selectedTeam1, setSelectedTeam1] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [team1Scores, setTeam1Scores] = useState([]);
  const [team2Scores, setTeam2Scores] = useState([]);
  const [team1Handicaps, setTeam1Handicaps] = useState([]);
  const [team2Handicaps, setTeam2Handicaps] = useState([]);
  const [updates, setUpdates] = useState(0);

  useEffect(() => {
  setFixtures(props.result.playerGames);
  }, [updates]);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveAndClose = () => {
    setLoading(true);
    //updateActiveAdminLeague(selectedAdminLeague);
    handleClose();
    //window.location.assign("league-admin");
  };

  const updateData = (e, gameNumber, player, teamId) => {
    console.log('what is fixtures', fixtures);
    console.log(e.target.value, gameNumber, player.id, teamId);
    let playerData = fixtures.find(x=> x.player.id === player.id);
    console.log('playerData', playerData);
    if(playerData?.games[gameNumber-1].scratchScore !== e.target.value){
      console.log('value changed')
    }
    
  }

  const renderPlayerRow = (teamId) => {
    
    let playersInTeam = fixtures.filter(x=> x.player.teamId === teamId);
    const ids = playersInTeam.map(p => {
        return p.player.id
    })
    const playerList = playersInTeam.map(p=> {
      return p.player
    });
    const playerIds = [...new Set(ids)]
    const players = [...new Set(playerList)]

    let components = [];
    let currentComponents = [];
    let teamTotalHandicap = 0;
    let teamTotalScratch = 0;
    let teamTotal = 0;

    console.log('players in team:', playersInTeam, playerIds, players);


    fixtures.filter(x=> x.player.teamId === teamId)
    .map(p => {
      currentComponents.push(<TableCell>{p.player.displayName}</TableCell>
      );
      let games = p.games.sort(x=> x.gameNumber)
      const playerHandicap = games[0]?.handicap;
      teamTotalHandicap = teamTotalHandicap + playerHandicap;
      currentComponents.push(<TableCell>{playerHandicap}</TableCell>);

      let scratchTotal = 0;
      let totalScore = 0;

      games.map(g=> {  
        scratchTotal = scratchTotal + g.scratchScore;
        totalScore = totalScore + g.score;
        
        teamTotalScratch = teamTotalScratch + g.scratchScore;
        teamTotal = teamTotal + g.score;


      /*currentComponents.push(
        <TableCell>
          <ListItem>
            <ListItemText primary={g.scratchScore} secondary={g.score} />
          </ListItem>
        </TableCell>); */  
        currentComponents.push(
      <TableCell><TextField defaultValue={g.scratchScore} onMouseLeave={(e) => updateData(e, g.gameNumber, p.player, teamId)}/></TableCell>
      );
      }) 

      currentComponents.push(
      <TableCell>{scratchTotal}</TableCell>);
      currentComponents.push(
      <TableCell>{totalScore}</TableCell>);
      components.push(<TableRow>{currentComponents}</TableRow>)
      currentComponents = [];
    })

   
    // please loop through the games property in the prop.results object and group by player, ordered by gamenumber, the output should be an array of objects of each player containing an array of games then loop through the array of objects and render the table row for each player
    //console.log('players in team:', playersInTeam, playerIds, players)
    return <>{components}</>
  
  }


  //console.log("result", props.result);
  let gameNumbers = props.result?.playerGames[0]?.games?.map(game => { return game.gameNumber });
  let gameCount = Math.max.apply(null,gameNumbers);

  const rowHeaders = [];
  for (let i = 0; i < gameCount; i++) {
    rowHeaders.push(<TableCell key={i} align="left">Game {i+1}</TableCell>)
  }

  return (
    <>
      <Typography noWrap>
        <Tooltip title={"Manage"} arrow>
          <IconButton color="primary" onClick={handleClickOpen}>
            <EditTwoTone fontSize="small" />
          </IconButton>
        </Tooltip>
      </Typography>

      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="md">
        <DialogTitle>Edit Results</DialogTitle>
        <DialogContent>
          <DialogContentText>Fixture Details here:</DialogContentText>
          <Box p={2}>
            <Typography variant="h2">{props.result.fixtureDetails.homeTeamName}</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={2}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Player</TableCell>
                    <TableCell align="left">Handicap</TableCell>
                    {rowHeaders} 
                    <TableCell align="left">Scratch</TableCell>
                    <TableCell align="left">Total Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {renderPlayerRow(props.result.fixtureDetails.homeTeamId)}
                {/* {renderPlayerRow(props.result.fixtureDetails.awayTeamId)} */}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total Handicap</TableCell>
                    <TableCell></TableCell>
                    <TableCell>99</TableCell>
                    <TableCell>99</TableCell>
                    <TableCell>99</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant="head">Total Scores</TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">289</Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Typography variant="h5">1289</Typography>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Stack>
          </Stack>

          <Divider />
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>
            Cancel
          </LoadingButton>
          <LoadingButton onClick={handleSaveAndClose} loading={loading}>
            Set League
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
