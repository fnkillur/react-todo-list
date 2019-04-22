import React, {Component} from 'react';
import './TodoForm.css';

class TodoForm extends Component {

    state = {
        addTodo: ''
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleKeyPress = e => {
        if (e.key !== 'Enter') return;

        e.preventDefault();

        let contents = this.state.addTodo;
        if (contents) this.props.onAdd(contents);
        this.setState({
            addTodo: ''
        });
    };

    render() {
        return (
            <input type='text'
                   className='todo-form'
                   name='addTodo'
                   value={this.state.addTodo}
                   onChange={this.handleChange}
                   onKeyPress={this.handleKeyPress}
                   placeholder='+ add a new task'
            />
        );
    }
}

export default TodoForm;