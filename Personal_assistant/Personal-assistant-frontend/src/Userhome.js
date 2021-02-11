import React from 'react';
import './Styles/Userhome.css';
import axios from 'axios';

class Userhome extends React.Component {
    constructor()
    {
        super();
	    this.state={
            userid: null,
		    taskslist: [],
        }
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:5000/userhome`)
          .then(res => {
            console.log(res);
            console.log(res.data);
            const data = res.data;
            if(data.success===true)
                this.setState({
                    userid: data.uid,
                    taskslist: data.events
                });
          }).catch(error => {
              console.log(error);
          })
    }

    deleteTask = (id) => {
        var opts={
            "id":id,
           };
        axios.post('http://127.0.0.1:5000/delete-task',opts)
    	.then(res => {
      	console.log(res);
      	console.log(res.data);
            if(res.data.success===true) {
                this.removeTask(id)
            }
    	}).catch(error => {
      	console.log(error);
    	})
    }

    removeTask = (id) => {
        const templist = this.state.taskslist;
        templist.map((task) => {
            if(task.t_id === id) {
                task.t_id = -1;
            }
        })
        this.setState({
            taskslist: templist
        })
    }

    addTask = () => {
        window.location.replace('http://127.0.0.1:3000/Addtask');
    }
    render()
    {
        return (
            <div class="Component">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Type</th>
                            <th>Venue</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.state.taskslist.map((task) => {
                            if (task.t_id !== -1)  return (
                             <tr>
                                 <td>{task.t_id}</td>
                                 <td>{task.t_type}</td>
                                 <td>{task.t_time}</td>
                                 <td>{task.t_date}</td>
                                 <td>{task.t_venue}</td>
                                 <td><button class="Button" onClick = {() => this.deleteEvent(task.t_id)}>Cancel Task</button></td>
                             </tr>
                            )
                        })}
                     </tbody>
                </table>
                <button class="Button" onClick = {this.addTask}>Add new Task</button>
            </div>
        );
    }
}

export default Userhome;
