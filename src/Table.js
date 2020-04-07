import React, { useState, useEffect } from 'react'
import MaterialTable, {MTableToolbar} from 'material-table'
import Chip from '@material-ui/core/Chip'
import axios from 'axios'

export default function Table() {
  const [selectedRow, setSelectedRow] = useState(null)
  const [entries, setEntries] = useState({
    data: [
      {
        id: "",
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
        imageUrl: "",
      }
    ]
  })

  const [state] = useState({
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
      },
      { title: 'First Name', field: 'first_name', },
      { title: 'Last Name', field: 'last_name', },
      { title: 'Email', field: 'email', }
    ],
  })

  useEffect(() => {
    axios
    .get('data')
    .then(response => {
      let data = []
      response.data.data.forEach(el => {
        data.push({
          id: el.id,
          email: el.email,
          first_name: el.first_name,
          last_name: el.last_name,
          avatar: el.avatar,
          imageUrl: el.imageUrl,
        })
      })
      setEntries({ data: data })
    })
    .catch(function(error) {
      console.log(error)
    })
  }, [])

  return (
    <MaterialTable
      title='Tree Data, Export, Localization, Editable'
      onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow))}
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
        exportButton: true,
        rowStyle: rowData => ({
            backgroundColor: (selectedRow && selectedRow.tableData.id === rowData.tableData.id) ? '#EEE' : '#FFF'
        })
      }}
      columns={state.columns}
      data={entries.data}
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
            allow="accelerometer autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )
      }}
      parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
      localization={{
        body: {
          emptyDataSourceMessage: 'Guherandinên ku tiştek tune'
        },
        toolbar: {
          searchTooltip: 'Lêgerîn'
        },
        pagination: {
          labelRowsSelect: 'Xet',
          labelDisplayedRows: ' {from}-{to} xete {count}',
          firstTooltip: 'Rûpele Berîn',
          previousTooltip: 'Rûpele Berê',
          nextTooltip: 'Rûpele Piştî',
          lastTooltip: 'Rûpele Talî'
        }
      }}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                const data = [...entries.data] 
                fetch('data', {
                  method: 'POST', // or 'PUT'
                  headers: {
                      'Content-Type': 'application/json',
                    },
                  body: JSON.stringify(newData),
                })
                .then((response) => response.json())
                .then((newData) => {
                  console.log('Success:', newData)
                })
                .catch((error) => {
                  console.error('Error:', error)
                })
                data.push(newData)
                setEntries({ ...entries, data })
              }
              resolve()
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                const data = [...entries.data]
                console.log('promise data', data)
                const index = data.indexOf(oldData)
                data[index] = newData
                axios
                  .put('data', newData, {
                    params: {
                      id: entries.data[0].id
                    }
                  })
                  .then(res => console.log(res.data))
                setEntries({ ...entries, data }, () => resolve())
              }
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              {
                const data = [...entries.data]
                const index = data.indexOf(oldData)
                data.splice(index, 1)
                axios
                  .delete('data', {
                    params: {
                      id: oldData.id
                    }
                  })
                  .then(res => console.log(res.data))
                setEntries({ ...entries, data }, () => resolve())
              }
              resolve()
            }, 1000)
          }),
      }}
    />
  )
}

