import React, {Component} from 'react';
import propTypes from 'prop-types';
import './TodoItem.css';
import {Button} from 'react-bootstrap';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.changeStatus = this.changeStatus.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    removeItem(item) {
        this.props.removeItem(item);
    }

    changeStatus(item) {
        this.props.changeStatus(item);
    }

    render() {
        const {item} = this.props;
        return (
            <li className="item">
                <input type="checkbox" key={item.title} defaultChecked={item.completed} onClick={() => this.changeStatus(item)}/>
                <span className={item.completed === true ? 'done' : ''}> {item.title}</span>
                <Button bsStyle="danger" type="submit" onClick={() => this.removeItem(item)}>-</Button>
            </li>
        )
    }
}

TodoItem.propTypes = {
    item: propTypes.object.isRequired,
    changeStatus: propTypes.func,
    removeItem: propTypes.func
};

export default TodoItem;
