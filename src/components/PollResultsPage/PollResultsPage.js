import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PollResultsPage = (props) => {

    const { id } = useParams();

    const [poll, setPoll] = useState({});

    useEffect(() => {
        axios.get('https://d3vz0d3tn2.execute-api.us-east-1.amazonaws.com' + '/results/' + id)
            .then(data => {
                setPoll(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    return (
        <div className="PollResultsPage">
            <h1>Results</h1>
            <h2>{poll.question}</h2>
            <div>
                {
                    poll.choices && poll.choices.map(choice => (
                        <div key={choice.choice}>{choice.choice}: {choice.value}</div>
                    ))
                }
            </div>
        </div>
    );
}

export default PollResultsPage;