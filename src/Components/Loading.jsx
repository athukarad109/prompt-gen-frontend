import { TypeAnimation } from 'react-type-animation';

const Loading = () => {
    return (
        <div>
            <TypeAnimation
                sequence={[
                    'Loading', // Types 'One'
                    1000, // Waits 1s
                    'Loading...', // Deletes 'One' and types 'Two'
                    () => {
                        console.log('Sequence completed'); // Place optional callbacks anywhere in the array
                    }
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ fontSize: '2em', display: 'inline-block' }}
            />
        </div>
    )
}

export default Loading