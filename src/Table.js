import React from 'react'
import MaterialTable from 'material-table'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: '#4caf50',
        },
        secondary: {
          main: '#ff9100',
        },
      },

    })
    this.state = {
      selectedRow: null,
    }
  }
  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <MaterialTable
          title='Remote Data, Fixed Columns, Actions'
          columns={[
            {
              title: 'Id',
              field: 'id',
              cellStyle: {
                backgroundColor: '#039be5',
                color: '#FFF'
              },
              headerStyle: {
                backgroundColor: '#039be5',
              },
              customFilterAndSearch: (term, rowData) => term == rowData.name.length,
              width: 150,
            },
            { title: 'First Name', field: 'first_name', width: 150, },
            { title: 'Last Name', field: 'last_name', width: 150},

            { title: 'First Name', field: 'first_name', width: 150, },
            { title: 'Last Name', field: 'last_name', width: 150},

            { title: 'First Name', field: 'first_name', width: 150, },
            { title: 'Last Name', field: 'last_name', width: 150},

            { title: 'First Name', field: 'first_name', width: 150},
            { title: 'Last Name', field: 'last_name', width: 150},

            { title: 'First Name', field: 'first_name', width: 150},
            { title: 'Last Name', field: 'last_name', width: 150},
          ]}
          onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
          // remote data
          data={query =>
            new Promise((resolve, reject) => {
              fetch('data')
              .then(response => response.json())
              .then(result => {
                resolve({
                  data: result.data,
                  page: result.page - 1,
                  totalCount: result.total,
                })
              })
            })
          }
          actions={[
            {
              icon: 'save',
              tooltip: 'Save User',
              onClick: (event, rowData) => alert('You saved ' + rowData[0].first_name)
            },
            {
              icon: 'delete',
              tooltip: 'Delete User',
              onClick: (event, rowData) => window.confirm("You want to delete " + rowData[0].first_name)
            }
          ]}
          options={{
            sorting: true,
            filtering: true,
            selection: true,
            grouping: true,
            fixedColumns: {
              left: 2,
              right: 0
            },
            rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
          }}
        />
      </MuiThemeProvider>
    )
  }
}

export default Table
