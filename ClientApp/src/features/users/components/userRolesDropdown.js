import {
  Autocomplete,
  FormControl,
  TextField,
  Checkbox,
  Skeleton,
} from "@mui/material";
import { useState, useEffect } from "react";
import * as api from "global/apiClient";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PropTypes from "prop-types";

function UserRolesDropdown(props) {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await api.apiGet("account/roles/list");
        setRoles(result.data);
        setLoading(false);
      } catch (err) {
        // error handling code
        setLoading(false);
      }
    };
    // call the async fetchData function
    fetchData();
  }, []);

  if (loading) {
    return <Skeleton></Skeleton>;
  } else {
    let roleNames = roles.map((r) => r.name);
    return (
      <FormControl fullWidth>
        <Autocomplete
          fullWidth
          multiple
          limitTags={3}
          id="checkboxes-tags-demo"
          options={roleNames}
          name="name"
          loading={loading}
          value={props.value}
          //isOptionEqualToValue={(option, value) => option.name === value}
          onChange={props.onChange}
          disableCloseOnSelect
          //getOptionLabel={(role) => role.name}
          renderOption={(props, option, { selected }) => (
            <li {...props} key={`listitem-${option}`}>
              <Checkbox
                icon={icon}
                key={`checkbox-${option}`}
                value={option}
                name={option}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </li>
          )}
          //style={{ width: 500 }}
          renderInput={(params) => (
            <TextField {...params} label="Available Roles" />
          )}
        />
      </FormControl>
    );
  }
}

export default UserRolesDropdown;

UserRolesDropdown.propTypes = {
  value: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};
