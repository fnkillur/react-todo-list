import React, {Component} from 'react';
import './Todo.css';

class Todo extends Component {

    state = {
        editTodo: ''
    };

    handleDoubleClick = () => {
        this.props.onEdit(this.props.todo.id);
        this.setState({
            editTodo: this.props.todo.contents
        });
    };

    handleCheck = () => {
        this.props.onToggle(this.props.todo.id);
    };

    handleClick = () => {
        this.props.onRemove(this.props.todo.id);
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleKeyDown = e => {
        if (e.keyCode === 13) {
            this.handleSubmit();
        } else if (e.keyCode === 27) {
            this.setState({
                editTodo: this.props.todo.contents
            });
            this.props.onCancel();
        }
    };

    handleSubmit = () => {
        let contents = this.state.editTodo.trim();

        if (contents) {
            this.props.onSave({
                id: this.props.todo.id,
                contents,
                complete: false
            });
            this.setState({editTodo: contents});
        } else {
            this.handleClick();
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.todo !== this.props.todo ||
            nextProps.editing !== this.props.editing ||
            nextState.editTodo !== this.state.editTodo);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editing && this.props.editing) this.editInput.focus();
    }

    render() {
        return (
            <li className={(this.props.editing && 'editing') || ''}>
                <section className='view'>
                    <input
                        className={`item ${(this.props.todo.complete && 'checked') || ''}`}
                        type='text'
                        value={this.props.todo.contents}
                        onDoubleClick={this.handleDoubleClick}
                        readOnly={true}
                        onClick={this.handleCheck}
                    />
                    <button
                        className='btn-remove'
                        onClick={this.handleClick}>
                        X
                    </button>
                </section>
                <section className='edit'>
                    <input
                        ref={input => this.editInput = input}
                        className='item'
                        name='editTodo'
                        value={this.state.editTodo}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleSubmit}
                    />
                </section>
            </li>
        );
    }
}

export default Todo;