import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Selector from '../PollPage/Selector';

const PollResultsPage = (props) => {

    const { id } = useParams();

    const [poll, setPoll] = useState();

    useEffect(() => {
        axios.get('https://4vxo8knoa0.execute-api.us-east-1.amazonaws.com' + '/results/' + id)
            .then(data => {
                setPoll(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    return (
        <div className="PollResultsPage">
            <h1>{poll ? 'Results' : 'Loading...'}</h1>
            { poll ?
                <div>
                    <h2>{poll.question}</h2>
                    <h4>mode: {poll.type}</h4>
                    <Selector choices={poll.choices} type={poll.type} onChange={(c) => console.log(c)} />
                </div>
                : null

            }
        </div >
    );
}

export default PollResultsPage;