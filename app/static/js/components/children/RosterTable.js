//RosterTable.js
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import ReactDataGrid from 'react-data-grid';
import update from 'immutability-helper';

function seeAvailabilityUrl (username) {
    //TODO
    //let url = "/availability/" + username;
    //return <a href= {url} >See Availability</a>
    return <a href="/managerdashboard">See Availability</a>
}

export default class RosterTable extends Component {
    constructor(props, context) {
      super(props, context);
      this._columns = [
        {
          key: 'id',
          name: 'ID',
          editable: false,
          sortable: true
        },
        {
          key: 'name',
          name: 'Name',
          editable: true,
          sortable: true
        },
        {
          key: 'username',
          name: 'Username',
          editable: true,
          sortable: true
        },
        {
          key: 'hours',
          name: 'Hours',
          editable: true,
          sortable: true
        },
        {
          key: 'seeAvailability',
          name: '',
          editable: false
        },
        {
          key: 'removeStudent',
          name: '',
          editable: false
        }
      ];

      this.rowGetter = this.rowGetter.bind(this);
      this.createRows = this.createRows.bind(this);
      this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
      this.handleGridSort = this.handleGridSort.bind(this);
      this.removeStudent = this.removeStudent.bind(this);
      this.state = { rows: [], originalRows: [] };
      //TODO figure out how to update rows length
      console.log(this);

      this.createRows();
    }

    addRow(student){
        var rows = this.state.rows;
        rows.push({name: student.name, userName: student.username, hours: student.hours});
        this.setState({rows: rows, originalRows: rows});
        console.log(rows);
    }

    createRows(){
        axios.get('/api/getStudents')
        .then(res => {
          let newRows = [];
          let students = res.data.student;
          for (let i = 0; i < students.length; i++) {
          //for (let i = 1; i < 7; i++) {
            newRows.push({
              id: students[i].id,
              name: students[i].name,
              username: students[i].username,
              hours: students[i].hours,
              // name: ['Taylor', 'Ian', 'Linh', 'Alfred'][Math.floor((Math.random() * 3) + 1)],
              // userName: ['user1', 'user2', 'user3', 'user4'][Math.floor((Math.random() * 3) + 1)],
              // hours: i,
              seeAvailability: seeAvailabilityUrl("username"),
              removeStudent: <Button color="success" size="sm" onClick = {this.removeStudent(students[i])}>Remove Student</Button>
            });
          }
          console.log("newRows student",newRows);
          this.setState({ rows: newRows, originalRows: newRows });
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    rowGetter(i){
      return this.state.rows[i];
    };

    handleGridRowsUpdated({ fromRow, toRow, updated }) {
      let rows = this.state.rows.slice();

      for (let i = fromRow; i <= toRow; i++) {
        let rowToUpdate = rows[i];
        let updatedRow = update(rowToUpdate, {$merge: updated});
        rows[i] = updatedRow;
      }
      this.props.tableChanged();
      this.setState({ rows });
    };

    handleGridSort(sortColumn, sortDirection){
        const comparer = (a, b) => {
          if (sortDirection === 'ASC') {
            console.log("asc");
            return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
          } else if (sortDirection === 'DESC') {
            console.log("desc");
            return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
          }
        };

        const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : this.state.rows.sort(comparer);

        this.setState({ rows });
      };

    removeStudent(student){
      console.log('click remove student');
      console.log(student);
      // const newRows = this.state.rows.slice(0, index).concat(this.state.rows.slice(index + 1));
      // this.setState({
      //   rows: newRows,
      // });
      // console.log(newRows);
      var config = { headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'}
      }
      axios.post('/api/removeStudent', {
        sid:student.id
      }, config)
      .then( (response) => {
          console.log("response was ", response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    render() {
      return  (
        <ReactDataGrid
          onGridSort={this.handleGridSort}
          enableCellSelect={true}
          columns={this._columns}
          rowGetter={this.rowGetter}
          rowsCount={this.state.rows.length}
          minHeight={500}
          onGridRowsUpdated={this.handleGridRowsUpdated} ref="table"/>);
    };
}
