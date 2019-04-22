import React, {Component} from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

class App extends Component {

    state = {
        id: -1,
        todoList: [],
        editing: null
    };

    handleAdd = contents => {
        let nextId = this.state.id + 1;

        this.setState({
            id: nextId,
            todoList: [
                ...this.state.todoList,
                {
                    id: nextId,
                    contents: contents,
                    complete: false
                }
            ]
        });
    };

    handleEdit = id => {
        this.setState({
            editing: id
        });
    };

    handleRemove = id => {
        this.setState({
            todoList: [
                ...this.state.todoList.filter(todo => todo.id !== id)
            ]
        });
    };

    handleSave = editTodo => {
        this.setState({
            todoList: [
                ...this.state.todoList.map(todo =>
                    ((todo.id === editTodo.id && editTodo) || todo)
                )
            ],
            editing: null
        });
    };

    handleCancel = () => {
        this.setState({
            editing: null
        });
    };

    handleToggle = id => {
        this.setState({
            todoList: [
                ...this.state.todoList.map(todo => {
                    if (todo.id === id) todo.complete = !todo.complete;
                    return {...todo};
                })
            ]
        });
    };

    render() {
        return (
            <div className='todo-app'>
                <header className='header'>
                    <h1>todos</h1>
                </header>
                <main className='main'>
                    <section className='form'>
                        <TodoForm
                            onAdd={this.handleAdd}
                        />
                    </section>
                    <section className='list'>
                        <TodoList
                            todoList={this.state.todoList}
                            onRemove={this.handleRemove}
                            onEdit={this.handleEdit}
                            editing={this.state.editing}
                            onSave={this.handleSave}
                            onCancel={this.handleCancel}
                            onToggle={this.handleToggle}
                        />
                    </section>
                </main>
                <footer className='footer'>

                </footer>
            </div>
        );
    }
}

export default App;
