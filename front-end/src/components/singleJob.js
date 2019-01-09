import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const url = "http://localhost:7777";

class SingleJob extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: null
        };
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.fetchJob(id);
    }

    fetchJob = id => {
        axios
            .get(`${url}/test/jobs/${id}`)
            .then(res => {
                this.setState(() => ({
                    job: res.data
                }))
            })
            .catch(err => {
                console.log(err);
            });
    }


    render() {
        if (!this.state.job) {
            return <div>Loading Job...</div>
        }
        return (
            <div>
                <Link to='/'>Back to Jobs</Link>
                <div>
                    <button>apply</button>
                    <p>tell a friend</p>
                    <p>Report</p>
                </div>
                <h1>One Jobs</h1>
                <h3>{this.state.job.titleSalary}</h3>
                <h3>{this.state.job.topSkilss}</h3>
                <h3>{this.state.job.addSkills}</h3>
                <h3>{this.state.job.familar}</h3>
                <h3>{this.state.job.description}</h3>
                <h3>{this.state.job.requirements}</h3>
                {
                    this.state.job.collegeDegree === 0
                        ? <h4>No College required</h4>
                        : <h4>College degree required</h4>
                }
            </div>
        )
    }
}

export default SingleJob;
