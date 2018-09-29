import React, {Component} from 'react';
import TodoItem from "./TodoItem";
import propTypes from 'prop-types';
import './TodoList.css';
import {Button, Panel} from 'react-bootstrap';

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };

        this.addItem = this.addItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    addItem(event) {
        event.preventDefault();
        this.props.addItem(this.state.name);
        this.setState({name: ''});
    }

    changeStatus(item) {
        this.props.changeStatus(item);
    }

    removeItem(item) {
        this.props.removeItem(item);
    }

    changeName(e) {
        this.setState({name: e.target.value});
    }

    render() {
        const {list} = this.props;
        return (
            <Panel>
                <p className="list-title">{list.name}</p>
                <ul>
                    {list.items.map((item, key) => {
                        return <div key={key}>
                            <TodoItem item={item} changeStatus={this.changeStatus} removeItem={this.removeItem}/>
                        </div>
                    })}
                    <form>
                        <input
                            type="text"
                            onChange={(e) => this.changeName(e)}
                            value={this.state.name}
                            placeholder="Item name" />
                        <Button bsStyle="success" type="submit" onClick={(event) => this.addItem(event)}>+</Button>
                    </form>
                </ul>
            </Panel>
        )
    }
}

TodoList.propTypes = {
    list: propTypes.object.isRequired,
    addItem: propTypes.func,
    changeStatus: propTypes.func,
    deleteItem: propTypes.func
};

export default TodoList;
