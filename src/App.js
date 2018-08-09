import React, {Component} from 'react';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            search: "",
            filter: []
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/courses')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    items: json,
                })
            })
    }

    updateSearch = (event) => {
        this.setState({search: event.target.value});
        let filter = this.state.items.filter(item => item.courseName.includes(this.state.search));
        this.setState({filter : filter})
    };

    render() {

        let {isLoaded, filter} = this.state;

        if (!isLoaded) {
            return (
                <div>
                    Loading...
                </div>
            )
        }
        else {
            return (
                <div className="App">
                    <input type="text"
                           value={this.state.search}
                           onChange={this.updateSearch}
                    />
                    <ul>
                        {filter.map(item => (
                            <li key={item.courseNum} onClick={console.log('clicked!')}>
                                {item.courseName}, {item.courseCredit}
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }
}

export default App;
