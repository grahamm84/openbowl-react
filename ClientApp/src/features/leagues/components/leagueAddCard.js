import { React } from "react";

import {
  Card,
  Grid,
  CardContent,
  Avatar,
  Tooltip,
  CardActionArea,
  styled,
} from "@mui/material";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

const CardAddAction = styled(Card)(
  ({ theme }) => `
        border: ${theme.colors.primary.main} dashed 1px;
        height: 100%;
        color: ${theme.colors.primary.main};
        transition: ${theme.transitions.create(["all"])};
        
        .MuiCardActionArea-root {
          height: 100%;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        
        .MuiTouchRipple-root {
          opacity: .2;
        }
        
        &:hover {
          border-color: ${theme.colors.alpha.black[70]};
        }
`
);

const AvatarAddWrapper = styled(Avatar)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[10]};
        color: ${theme.colors.primary.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
`
);
export default function LeagueAddCard(props) {
  return (
    <Grid xs={12} md={12} item>
      <Tooltip arrow title="Click to add a new League">
        <CardAddAction onClick={props.onClick}>
          <CardActionArea
            sx={{
              px: 1,
            }}
          >
            <CardContent>
              <AvatarAddWrapper>
                <AddTwoToneIcon fontSize="large" />
              </AvatarAddWrapper>
            </CardContent>
          </CardActionArea>
        </CardAddAction>
      </Tooltip>
    </Grid>
  );
}

LeagueAddCard.propTypes = {};
