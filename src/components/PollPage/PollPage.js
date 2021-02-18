import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../Button/Button';
import './PollPage.css';
import Selector from './Selector';


const PollPage = (props) => {

    const { id } = useParams();

    const [poll, setPoll] = useState({});

    const [choices, setChoices] = useState([]);

    const handlerChoicesChange = (choices) => {
        setChoices(choices);
    }

    const handleSubmit = () => {
        console.log('submit', choices);
        axios.post('https://d3vz0d3tn2.execute-api.us-east-1.amazonaws.com' + '/poll/' + id, { choices })
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        axios.get('https://d3vz0d3tn2.execute-api.us-east-1.amazonaws.com' + '/poll/' + id)
            .then(data => {
                setPoll(data.data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [id]);

    return (
        <div className="PollPage">
            <h2>{poll.question + (poll.enabled ? '' : ' [DISABLED]')}</h2>
            <h4>mode: {poll.type}</h4>
            <Selector choices={poll.choices} type={poll.type} onChange={handlerChoicesChange} />
            <Button click={handleSubmit}> Submit </Button>
        </div>
    );
}

export default PollPage;