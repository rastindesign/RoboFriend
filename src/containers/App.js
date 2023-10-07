import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox.js";
import Scroll from "../components/Scroll";
import './App.css'
import ErrorBoundry from "../components/ErrorBoundry";


class App extends React.Component{
    constructor(){
        super();
        this.state={
            robots : [],
            Searchfield:''
            }
        }

        componentDidMount(){
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .then(users => this.setState({robots:users}))
        }

        onSearchChange = (event) =>{
            this.setState({Searchfield:event.target.value});
        }

        render(){
            const filteredRobot = this.state.robots.filter(robots =>{
                return robots.name.toLowerCase().includes(this.state.Searchfield.toLowerCase());
            })
            if(this.state.robots.length===0){
                return <h1>Loading</h1>
            } else{
            return(
            <div className="tc">
                <h1  className="f1">Robo Friends</h1>
                <SearchBox searchChange={this.onSearchChange} />
                <Scroll> 
                    <ErrorBoundry>
                        <CardList robots= {filteredRobot}/>
                    </ErrorBoundry>               
                </Scroll>
            </div>
                 );
                }
        }
}

export default App;