# CoupleSync

CoupleSync is a command-line application designed to help couples track their time until they meet and check the weather in different cities. With customizable date settings and live weather updates, this program offers a practical way to stay connected and informed.

## Features

- **Countdown Timer**: Displays the time remaining until a specified target date and end date, updating every second.
- **Weather Checker**: Retrieves and displays the current weather for two cities, with color-coded temperature indications.
- **Custom Date Settings**: Allows users to set and save custom target and end dates.
- **Credits**: Displays credits to the creators of the application.

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/yourusername/couplesync.git
    cd couplesync
    ```

2. **Install Dependencies**:

    - **Using the Batch File (Windows Only)**:
      
      If you're using Windows, you can quickly install dependencies and start the application by running the provided batch file. Simply double-click `start.bat` in the root directory of the project. This batch file will:
      
      - Check if `node_modules` exists to determine if dependencies are installed.
      - Install dependencies if they are not already present.
      - Start the application using PowerShell.
      
      **Note**: Ensure you have [Node.js](https://nodejs.org/) installed on your system.

    - **Manual Installation**:

      If you prefer or are using a different operating system, you can manually install dependencies by running:

      ```bash
      npm install
      ```

3. **Set Up Environment Variables**:

    Create a `.env` file in the root directory of the project and add your Weather API key:

    ```
    WEATHER_API_KEY=your_api_key_here
    ```

## Usage

1. **Start the Application**:

    - **Using the Batch File (Windows Only)**:
      
      Double-click `CoupleSync.bat` to start the application. The batch file will handle dependency installation if needed and start the application.

    - **Manual Start**:

      If you did not use the batch file or are on a different OS, you can start the application by running:

      ```bash
      npm start
      ```

2. **Select an Option from the Menu**:

    - `1`: Show time till we meet each other (updates every second).
    - `2`: Check the weather for two cities.
    - `3`: Set custom target and end dates.
    - `4`: View credits.
    - `5`: Exit the application.

### Setting Custom Dates

To set custom dates:
1. Choose option `3` from the menu.
2. Enter the target date and end date in the format `DD/MM/YYYY-HH:MM`.
3. The dates will be saved to a file and used for the countdown timer.

### Checking the Weather

To check the weather:
1. Choose option `2` from the menu.
2. Enter the names of two cities when prompted.
3. The weather information will be displayed with color-coded temperature indicators.

## Code Structure

- `app.ts`: Main application logic, including date management, menu handling, and countdown timer.
- `countdown.ts`: Calculates and formats the remaining time between the current time and the target and end dates.
- `weather.ts`: Fetches and displays weather information for two cities using the Weather API.
- `parseDate.ts`: Utility function to parse date strings into `Date` objects.

## Contributing

If you have any suggestions or improvements, feel free to fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Made with ❤️ by Hana & Mia for each other :3

