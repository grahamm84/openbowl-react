import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import * as api from "global/apiClient";
import { Container } from "@mui/system";
import { Button, Card, CardContent, Grid, TextField } from "@mui/material";
import PageHeader from "global/layouts/LoggedInLayout/Header/PageHeader";
import { Link as RouterLink } from "react-router-dom";

const UserListContainer = () => {
  const [userList, setUserList] = useState({ userCount: 0, users: [] });
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.apiGet("users", true, "Loading users");
        setUserList(result.data);
      } catch (err) {
        // error handling code
      }
    };
    // call the async fetchData function
    fetchData();
    initFilters();
  }, []);

  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  const clearFilter = () => {
    initFilters();
  };

  const initFilters = () => {
    setFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      email: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      status: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderTableHeader = () => {
    return (
      <Grid container alignItems="flex-start" spacing={3}>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={clearFilter} size="small">
            Clear Filter
          </Button>
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth
            label="Search"
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
          ></TextField>
        </Grid>
      </Grid>
    );
  };
  const actionBodyTemplate = (e) => {
    return (
      <Button
        variant="contained"
        color="primary"
        component={RouterLink}
        to={`users/${e.userId}`}
      >
        View
      </Button>
    );
  };
  const tableHeader = renderTableHeader();

  return (
    <>
      <PageHeader title="Users" />
      <Container maxWidth="xl">
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to={"create-user"}
          >
            Add New User
          </Button>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <DataTable
                  value={userList.users}
                  stripedRows
                  paginator
                  responsiveLayout="scroll"
                  paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                  currentPageReportTemplate="{first}-{last} of {totalRecords}"
                  rows={20}
                  rowsPerPageOptions={[20, 50, 75]}
                  paginatorLeft={paginatorLeft}
                  paginatorRight={paginatorRight}
                  sortMode="single"
                  emptyMessage="No users found."
                  filters={filters}
                  filterDisplay="menu"
                  header={tableHeader}
                  globalFilterFields={["name", "email", "status"]}
                >
                  <Column field="email" header="Email" filter sortable></Column>
                  <Column field="name" header="Name" filter sortable></Column>
                  <Column
                    field="status"
                    header="Status"
                    filter
                    sortable
                  ></Column>
                  <Column
                    headerStyle={{ width: "4rem", textAlign: "center" }}
                    bodyStyle={{ textAlign: "center", overflow: "visible" }}
                    body={actionBodyTemplate}
                  />
                </DataTable>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserListContainer;
