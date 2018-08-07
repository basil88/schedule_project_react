import React, {Component} from 'react';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            search: ""
        }
    }

    updateSearch(event){
        this.setState({search: event.target.value})
        console.log(event.target.value);
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

    render() {

        let {isLoaded, items} = this.state;

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
                    <ul>
                        {items.map(item => (
                            <li key={item.courseNum}>
                                {item.courseName}, {item.courseCredit}
                            </li>
                        ))}
                    </ul>
                    <input type="text"
                           value={this.state.search}
                           onChange={this.updateSearch.bind(this)}
                    />

                </div>
            )
        }
        ;
    }
}

export default App;
