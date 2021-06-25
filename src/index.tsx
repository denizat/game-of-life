import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import { Life, Land } from "./Life"

function sleep(ms: any) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends React.Component<{}, { land: Land }> {
    life: Life
    constructor({ }) {
        super({})
        this.life = new Life(10)
        this.state = {
            land: this.life.copy()
        }
    }
    async componentDidMount() {
        await this.life.randomize()


        this.setState({
            land: this.life.land
        })
        await sleep(10)
        this.forceUpdate()

    }
    render() {
        return (
            this.state.land.map((v) => { return (<div className="flex flex-row">{v.map(e => { return (<div className={`w-5 h-5 ${e ? "bg-black" : null}`}></div>) })} </div>) })
        )
    }
}


ReactDOM.render(<App />, document.getElementById("app"));