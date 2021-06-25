import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import { Life, Planet } from "./Life"

class App extends React.Component<{}, { land: Planet }> {
    life: Life
    constructor() {
        super({})
        this.life = new Life(10)
        this.state = {
            land: this.life.world.land
        }
    }
    componentDidMount() {
        this.life.iterate()
        this.setState({
            land: this.life.world.land
        })

    }
    render() {
        this.life.randomize()
        this.setState({
            land: this.life.world.land
        })
        return (
            this.state.land.map((v) => { return (<div>{v}</div>) })
        )
    }
}


ReactDOM.render(<App />, document.getElementById("app"));