import React from 'react';
import MaterialTable from 'material-table'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

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
      selectedRow: null
    }
  }

  render() {
    return (
        <MuiThemeProvider theme={this.theme}>
          <MaterialTable
            title="Basic Selection, Grouping, Styling Preview"
            columns={[
              {
                title: 'Name',
                field: 'name',
                cellStyle: {
                  backgroundColor: '#039be5',
                  color: '#FFF'
                },
                headerStyle: {
                  backgroundColor: '#039be5',
                },
                customFilterAndSearch: (term, rowData) => term == rowData.name.length
              },
              { title: 'Surname', field: 'surname', },
              { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
              {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
              },
            ]}
            data={[
              { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
              { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
            ]}
            onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
            options={{
              sorting: true,
              filtering: true,
              grouping: true,
              selection: true,
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
