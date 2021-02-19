import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CreatePollPage.css';


const CreatePollPage = (props) => {

    const [question, setQuestion] = useState('');
    const [type, setType] = useState(false);
    const [choices, setChoices] = useState(['']);
    const [valid, setValid] = useState(false);
    const [id, setId] = useState();
    // {
    //     question: 'test',
    //     type: 'SINGLE',
    //     choices: ['one', 'two', 'three']
    // }

    useEffect(() => {
        if (question !== '' && choices.filter(choice => choice !== '').length > 0) {
            setValid(true);
        } else {
            setValid(false);
        }
    }, [question, choices]);

    const handleSubmit = () => {

        const poll = {
            question,
            type: type ? 'MULTIPLE' : 'SINGLE',
            choices: choices.filter(choice => choice !== '')
        }

        axios.post('https://4vxo8knoa0.execute-api.us-east-1.amazonaws.com' + '/poll', poll)
            .then(data => {
                console.log(data);
                setQuestion('');
                setChoices(['']);
                setType(false);
                setId(data.data.id);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleChange = (value, idx) => {
        // handle second char slow
        setChoices(choices.map((choice, i) => i === idx ? value : choice));
        if (choices[choices.length - 1] !== '') {
            setChoices([...choices, '']);
        }

    }

    return (
        <div className="CreatePollPage">
            <h2>Create A New Poll</h2>
            <form>
                <input type="text" required minLength="1" maxLength="200" placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)} />

                <input type="checkbox" onChange={(e) => setType(e.target.checked)} /> <span>Multi select?</span>
                <hr></hr>
                {
                    choices.map((choice, idx) => (
                        <input key={idx} type="text" required minLength="1" maxLength="200" placeholder="choice..."
                            value={choice}
                            onChange={(e) => handleChange(e.target.value, idx)} />
                    ))
                }

                <input type="button" disabled={!valid} value="Create" onClick={handleSubmit} />
                {
                    id ?
                        <div style={{ backgroundColor: 'var(--primary)', padding: '1rem', margin: '1rem', borderRadius: '0.3rem' }}>
                            <Link
                                to={{ pathname: '/poll/' + id }}
                                style={{
                                    color: 'var(--text)',
                                }}>Click here to go to your poll!</Link>
                        </div>
                        : null
                }
            </form>

        </div>
    );
}

export default CreatePollPage;