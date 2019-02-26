import React, { Component } from 'react';
import List from './List';
import axios from 'axios';

class Newtodo extends Component {
    constructor() {
        super();
        this.state= {
            newText : [
                { 
                    "modText": "First",
                    "timeStamp": "12/12/2000",
                    "id" : 1
                }
            ],
            modifiedText: '',
            inputError: ''
        }

        this.addTodo = this.addTodo.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    componentDidMount() {
        axios
        .get(`http://5c74a0e7e24a2e001477f357.mockapi.io/TodoList`)
        .then((res) => {
            //console.log('API result', res.data);
            this.setState({
                newText : res.data
            })
        })
        .catch((e) => {
            console.log(e);
        })
    }

    onChange (e) {
        //console.log('Value:', e.target.value);
        this.setState ({
            modifiedText: e.target.value
        })
    }

    validate = () =>{
        let inputError = '';

        if(!this.state.modifiedText) {
            inputError = "This field is required."
        }

        if(inputError) {
            this.setState({inputError})
            return false;
        }
        return true;
    }

    addTodo(e) {
        const isValid = this.validate();
        if (isValid) {
        const list = this.state.newText;
        const newList = {
            modText: this.state.modifiedText,
            timeStamp: new Date(),
            id: this.state.newText.length + 1
        } 
        //console.log('newList:', newList);
        
        axios
        .post(`http://5c74a0e7e24a2e001477f357.mockapi.io/TodoList`, newList)
        .then((res) =>{
            list.push(newList);
            this.setState({ 
                newText: list
            });
        })}
        //console.log('New State:', this.state.newText);
        e.preventDefault();
        this.setState({
            modifiedText: ''
        })
    }

    deleteTodo(id) {
        const list = this.state.newText;
        const deleteID = list[id];
        axios
        .delete(`http://5c74a0e7e24a2e001477f357.mockapi.io/TodoList/${deleteID.id}`)
        .then((res) =>{
            delete list[id];
            this.setState({ 
                newText: list
            });
        })

        //console.log('list:', list, 'newText:', this.state.newText);
    }

    render () {
        return (
            <div className="container">
                <form noValidate>
                    <input
                    type="text"
                    name="modifiedText"
                    value={this.state.modifiedText}
                    onChange={this.onChange.bind(this)}
                    className="col-lg form-control" />

                    <div className="text-left" style={{ fontSize: '12', color:'red'}}>{this.state.inputError}</div>
                    <br/>
                    <button className="btn btn-block btn-primary btn-md" type="submit" onClick={this.addTodo}>Add Note</button>
                </form>
                
                <div>
                    {this.state.newText.map((todo, index) => {
                        return <List
                            key={todo.id}
                            details= {todo} 
                            heading="To do list"
                            deleteTodo = {() => {this.deleteTodo(index)}}
                            />
                    })}
                </div>
            </div>
        )
    }
}

export default Newtodo;