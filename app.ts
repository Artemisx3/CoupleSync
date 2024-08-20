import * as readline from 'readline';
import * as colors from 'colors/safe';
import calculateTimeLeft from './countdown';
import * as fs from 'fs'
import * as path from 'path'
import { weather } from "./weather"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let TARGET_DATE_STR
let END_DATE_STR; 

const saveDatesToFile = (targetDate: string, endDate: string) => {
const data = JSON.stringify({targetDate, endDate});
console.log('saving data to ', data)
try {
    fs.writeFileSync(path.join(__dirname, 'dates.json'),data )
}
catch (err) {
    console.log('error saving data', err)
}
}

const loadDatesFromFile = (): { targetDate : string, endDate: string } | null => {
    try {
        const data = fs.readFileSync(path.join(__dirname, 'dates.json'), 'utf8');
        return JSON.parse(data);
    }
    catch(err) {
        return null;
    }
}

const savedDates = loadDatesFromFile()
if(savedDates) {
    TARGET_DATE_STR = savedDates.targetDate;
    END_DATE_STR = savedDates.endDate;
}

const showMenu = () => {
    console.log('\nMenu:');
    console.log(colors.magenta('1. Show time till we meet each other (updates every second)'));
    console.log(colors.magenta('2. Check the weather'))
    console.log(colors.magenta('3. Set custom dates'))
    console.log(colors.magenta('4. Credits'));
    console.log(colors.red('5. Exit'));
};

const startCredits = () => {
    console.clear();
    console.log("Made with ❤️ " + " by Hana for Mia :3");
    console.log('');

    rl.question('1. Go back: ', (answer) => {
        if (answer === '1') {
            console.clear();
            main();
            rl.question('Select an option: ', handleMenuChoice);
        } else {
            console.log("Invalid number");
            startCredits(); 
        }
    });
};
const startCreditsWithPromise = () => {
    return new Promise<void>((resolve) => {
        startCredits(); // Execute startCredits function
        rl.once('line', () => resolve()); // Wait for user input in startCredits
    });
};
const AddDate = () => {
    rl.question('Enter the target date (DD/MM/YYYY-HH:MM): ', (targetDate) => {
        rl.question('Enter the end date (DD/MM/YYYY-HH:MM): ', (endDate) => {
        if (validateDate(targetDate) && validateDate(endDate)) {
            TARGET_DATE_STR = targetDate;
            END_DATE_STR = endDate;
            saveDatesToFile(targetDate, endDate); 
            console.log(colors.green(`Dates set succesfully: ${targetDate} , ${endDate}`));
            main();
            rl.question('Select an option: ', handleMenuChoice);
        } else {
            console.log(colors.red('Invalid date and time format. Please try again.'));
            AddDate();
        }
    
    });
});
}

const ShowingTheWeather = () => {
    console.clear();
    weather();
    const stopWeather = () => {
        console.clear
        showMenu();
        rl.question('Select an option: ', handleMenuChoice);
    };

    // Listen for input to stop countdown
    rl.once('line', stopWeather)
}

const validateDate = (dateStr: string): boolean => {
const dateRegex = /^\d{2}\/\d{2}\/\d{4}-\d{2}:\d{2}$/;
return dateRegex.test(dateStr);
}


const handleMenuChoice = async (choice: string) => {
    switch (choice.trim()) {
        case '1':
            console.log('\nShowing time till we meet each other (updates every second)...');
            await startCountdown();
            break;

        case '2':
            console.log('\nChecking the live weather');
            ShowingTheWeather();
            break;

        case '3':
            console.log('\nInputting custom date');
            console.clear();
            AddDate();
            break;

        case '4':
            console.log("\nShowing Credits...");
            console.clear();
            await startCreditsWithPromise(); // Use the updated function
            break;

        case '5':
            console.log(colors.red('Exiting...'));
            rl.close();
            return; // Exit the function to avoid calling showMenu after closing
        default:
            console.log(colors.yellow('Invalid choice. Please select a valid option.'));
            break;
        
    
    }
};

const startCountdown = () => {
    const intervalId = setInterval(async () => {
        try {
            const timeLeft = calculateTimeLeft(TARGET_DATE_STR, END_DATE_STR);
            console.clear(); // Clear the console to update the display
            console.log(colors.magenta(`Time till we meet each other: ${timeLeft}`));
        } catch (error) {
            console.error(colors.red('An error occurred while calculating the countdown.'));
            clearInterval(intervalId);
        }
    }, 1000);

    // Prompt user to stop countdown or exit
    const stopCountdown = () => {
        clearInterval(intervalId);
        showMenu();
        rl.question('Select an option: ', handleMenuChoice);
    };

    // Listen for input to stop countdown
    rl.once('line', stopCountdown);
};

const main = () => {
        showMenu();
        rl.question('Select an option: ', handleMenuChoice);
    };
;

main();
