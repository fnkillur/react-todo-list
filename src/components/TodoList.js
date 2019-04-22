import React, {Component} from 'react';
import './TodoList.css';
import Todo from './Todo';

class TodoList extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.todoList !== this.props.todoList ||
            nextProps.editing !== this.props.editing);
    }

    render() {
        let {todoList, onRemove, onEdit, editing, onSave, onCancel, onToggle} = this.props;

        let showTodoList = todoList.map(todo => {
            return (<Todo
                key={todo.id}
                todo={todo}
                onRemove={onRemove}
                onEdit={onEdit}
                editing={editing === todo.id}
                onSave={onSave}
                onCancel={onCancel}
                onToggle={onToggle}
            />);
        });

        return (
            <ul className='todo-list'>
                {showTodoList}
            </ul>
        );
    }
}

export default TodoList;