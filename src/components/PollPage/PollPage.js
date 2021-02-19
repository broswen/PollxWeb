import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../Button/Button';
import Selector from '../PollPage/Selector';
import './PollPage.css';


const PollPage = (props) => {

    const { id } = useParams();

    const [poll, setPoll] = useState();

    const history = useHistory();

    const [choices, setChoices] = useState([]);

    const handlerChoicesChange = (choices) => {
        setChoices(choices);
    }

    const handleSubmit = () => {
        if (choices.length === 0) return;
        console.log('submit', choices);
        axios.post('https://4vxo8knoa0.execute-api.us-east-1.amazonaws.com' + '/poll/' + id, { choices })
            .then(data => {
                history.push('/results/' + id);
            })
            .catch(error => {
                console.log(error);
                alert('You have already voted');
                history.push('/results/' + id);
            })
    }

    useEffect(() => {
        axios.get('https://4vxo8knoa0.execute-api.us-east-1.amazonaws.com' + '/poll/' + id)
            .then(data => {
                setPoll(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    return (
        <div className="PollPage">

            { poll ?
                <div>
                    <h2>{poll.question}</h2>
                    <h4>mode: {poll.type}</h4>
                    <Selector enabled choices={poll.choices.map(choice => ({ choice: choice }))} type={poll.type} onChange={handlerChoicesChange} />
                    <Button click={handleSubmit}> Submit </Button>
                </div>
                : null
            }
        </div>
    );
}

export default PollPage;