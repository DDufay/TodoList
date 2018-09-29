import React, {Component} from 'react';
import './App.css';
import TodoList from "./components/TodoList.jsx";
import _ from 'lodash';
import {Button, Panel} from 'react-bootstrap';
import 'bootstrap3/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: JSON.parse(localStorage.getItem('lists') || '[]'),
            defaultMovies: JSON.parse(localStorage.getItem('defaultMovies') || '[]'),
            isDefaultList: false,
            currentList: null,
            name: ''
        };
        this.addItem = this.addItem.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    async componentDidMount() {
        if (null === localStorage.getItem('defaultMovies')) {
            const response = await fetch('http://api.jsonbin.io/b/5bae9a6e8713b17b52b0f728')
                .then(response => response.json());
            localStorage.setItem('defaultMovies', JSON.stringify(response));
            this.setState({defaultMovies: response});
        }
        const name = this.props.match.params.name;
        const currentList = name ?
            _.find(this.state.lists, {name}) :
            {name: 'Liste de films', items: this.state.defaultMovies}
        ;

        const isDefaultList = !name;
        this.setState({currentList, isDefaultList});
    }

    updateCurrentList(currentList) {
        this.setState({currentList});
    }

    addListName(event) {
        this.setState({name: event.target.value});
    }

    addList() {
        const {lists, name} = this.state;
        const list = {name, items: []};
        lists.push(list);
        this.setState({lists, currentList: list, name: ''});
        localStorage.setItem('lists', JSON.stringify(lists));
        this.props.history.push(`/list/${list.name}`);
    }

    addItem(newItem) {
        const {lists, currentList} = this.state;
        const item = {title: newItem, completed: false};
        currentList.items.push(item);
        this.setState({currentList});
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    changeStatus(item) {
        const {lists, currentList} = this.state;
        const currentItem = currentList.items.find(el => el === item);
        currentItem.completed = !currentItem.completed;
        this.setState({currentList});
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    removeItem(currentItem) {
        const {lists, currentList} = this.state;
        _.remove(currentList.items, item => item === currentItem);
        this.setState({currentList});
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    removeList() {
        const {lists, currentList} = this.state;
        _.remove(this.state.lists, list => list === currentList);
        this.setState({currentList: null});
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    render() {
        const {lists, currentList, isDefaultList} = this.state;

        return (
            <div className="App">
                <div className="container">
                    <Panel className="panel-list">
                        <h2 className="panel-title">List</h2>
                        <div className="col">
                            {lists.map((list, key) => {
                                return (
                                    <div className="col-sm-2" key={key}>
                                        <Link to={`/list/${list.name}`}>
                                            <Button bsStyle="primary" type="submit"
                                                    onClick={() => this.updateCurrentList(list)}>
                                                {list.name}
                                            </Button>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="header">
                            <form>
                                <input
                                    type="text"
                                    onChange={(event) => this.addListName(event)}
                                    value={this.state.name}
                                    placeholder="List name"
                                />
                                <Button bsStyle="success" type="submit" onClick={() => this.addList()}>+</Button>
                            </form>
                        </div>
                    </Panel>
                    <div>
                        {
                            currentList &&
                            <div className="list">
                                {
                                    !isDefaultList &&
                                    <Link to="/">
                                        <Button bsStyle="danger" type="submit" onClick={() => this.removeList()}>
                                            Remove List
                                        </Button>
                                    </Link>
                                }
                                <TodoList
                                    key={this.state.currentList.title}
                                    list={this.state.currentList}
                                    addItem={this.addItem}
                                    changeStatus={this.changeStatus}
                                    removeItem={this.removeItem}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
