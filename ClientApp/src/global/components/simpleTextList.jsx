import {
  Divider,
  List,
  ListItem,
  ListItemText,
  useTheme,
  styled,
} from "@mui/material";

const ListWrapper = styled(List)(
  () => `
      .MuiListItem-root {
        border-radius: 0;
        margin: 0;
      }
`
);

function SimpleTextList(props) {
  const theme = useTheme();

  return (
    <ListWrapper disablePadding>
      {props.items?.map((item) => {
        return (
          <>
            <ListItem
              key={item}
              sx={{
                color: `${theme.colors.primary.main}`,
                "&:hover": { color: `${theme.colors.primary.dark}` },
              }}
              button
            >
              <ListItemText key={item} primary={item} />
            </ListItem>
            <Divider />
          </>
        );
      })}
    </ListWrapper>
  );
}

export default SimpleTextList;
