import React from 'react'
import MaterialTable, {MTableToolbar} from 'material-table'
import Chip from '@material-ui/core/Chip'
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
			columns: [
            {
              title: 'Avatar',
              field: 'imageUrl',
              render: rowData => <img src={rowData.imageUrl} style={{width: 40, borderRadius: '50%'}}/>
            },
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
          ],
          // remote data
          data: query =>
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
  }
  render() {
    return (
      <MuiThemeProvider theme={this.theme}>
        <MaterialTable
          title='Component Overriding, Custom Column Rendering, Detail Panel'
          onRowClick={((evt, selectedRow) => this.setState({ selectedRow }))}
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
            pageSize: 5,
            pageSizeOptions: [2,5,10],
            sorting: true,
            filtering: true,
            selection: true,
            grouping: true,
            rowStyle: rowData => ({
                backgroundColor: (this.state.selectedRow && this.state.selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
          }}
					columns={this.state.columns}
					data={this.state.data}
          components={{
            Toolbar: props => (
              <div>
                <MTableToolbar {...props} />
                <div style={{padding: '0px 10px'}}>
                  <Chip label="Chip 1" color="secondary" style={{marginRight: 5}}/>
                  <Chip label="Chip 2" color="secondary" style={{marginRight: 5}}/>
                  <Chip label="Chip 3" color="secondary" style={{marginRight: 5}}/>
                  <Chip label="Chip 4" color="secondary" style={{marginRight: 5}}/>
                  <Chip label="Chip 5" color="secondary" style={{marginRight: 5}}/>
                </div>
              </div>
            ),
          }}
          detailPanel={rowData => {
            return (
              <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/C0DPdy98e4c"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )
          }}
      /*
					editable={{
						onRowAdd: newData =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									{
										const data = this.state.data;
									  console.log('newData ', newData)
										fetch('data', {
                      method: 'POST', // or 'PUT'
                      headers: {
                          'Content-Type': 'application/json',
                        },
                      body: JSON.stringify(newData),
                    })
                    .then((response) => response.json())
                    .then((newData) => {
                      console.log('Success:', newData);
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    })
//                    data.push(newData);
										this.setState({ data }, () => resolve());
									}
									resolve()
								}, 1000)
							}),
						onRowUpdate: (newData, oldData) =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									{
										const data = this.state.data;
										const index = data.indexOf(oldData);
										data[index] = newData;
										this.setState({ data }, () => resolve());
									}
									resolve()
								}, 1000)
							}),
						onRowDelete: oldData =>
							new Promise((resolve, reject) => {
								setTimeout(() => {
									{
										let data = this.state.data;
										const index = data.indexOf(oldData);
										data.splice(index, 1);
										this.setState({ data }, () => resolve());
									}
									resolve()
								}, 1000)
							}),
					}}
          */
        />
      </MuiThemeProvider>
    )
  }
}

export default Table
