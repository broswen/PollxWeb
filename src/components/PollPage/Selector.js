import React, { useEffect, useState } from 'react';
import './Selector.css';


const Selector = (props) => {

    const [choices, setChoices] = useState([]);

    useEffect(() => {
        props.onChange(choices);
    }, [choices]);

    const onSelectChoice = (choice) => {
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
                    <div className={"choice" + (choices.includes(choice) ? " active" : "")}
                        key={choice}
                        onClick={() => onSelectChoice(choice)}
                    >
                        {choice}
                    </div>
                ))
            }
        </div>
    );
}

export default Selector;