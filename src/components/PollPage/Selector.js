import React, { useEffect, useState } from 'react';
import './Selector.css';


const Selector = (props) => {

    const [choices, setChoices] = useState([]);

    useEffect(() => {
        if (props.enabled) {
            props.onChange(choices);
        }
    }, [choices]);

    const onSelectChoice = (choice) => {
        if (!props.enabled) return;
        if (props.type === 'MULTIPLE') {
            if (!choices.includes(choice)) {
                setChoices(choices.concat(choice));
            } else {
                setChoices(choices.filter(c => c != choice));
            }
        } else {
            setChoices([choice]);
        }
    }

    return (
        <div className="Selector">
            {
                props.choices && props.choices.map(choice => (
                    <div className={"choice" + (choices.includes(choice.choice) ? " active" : "")}
                        key={choice.choice}
                        onClick={() => onSelectChoice(choice.choice)}
                    >
                        <div className="wrapper">
                            <p>{choice.choice}</p>
                            <p style={{ fontWeight: 'bold' }}>{choice.value}</p>
                        </div>

                    </div>
                ))
            }
        </div>
    );
}

export default Selector;